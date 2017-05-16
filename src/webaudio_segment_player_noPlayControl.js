//import * as wavesAudio from 'waves-audio';
import * as wavesLoaders from 'waves-loaders';
import WebAudio from '../node_modules/wavesurfer.js/src/webaudio';

let wavesAudio = require('../waves-audio.umd.js');

const PLAYING = 'playing';
const PAUSED = 'paused';
const FINISHED = 'finished';

const Modulo = (num, mod) => ((num % mod) + mod) % mod;
// Allows individual looping and speed control for 
// instance if several segment engines have been added to 
// the same global transport.
const _WRAP_SEGMENTENGINE_IN_PLAYCONTROL = false;

export default class MyWebAudio extends WebAudio {
    constructor(params) {
        super(params);
        //console.log("MyWebAudio params: ");
        //console.log(params);
        if (params.transport)
            this.transport = params.transport;
        if (params.playctrl)
            this.playControl = params.playctrl;

    }

    setupSegmentPlayer(segmentDescriptions) {
        if (!this.buffer) {
            console.log("No buffer, is wavesurfer ready?")
            return;
        }
        /* Parse and concatenate segments */
        console.log("segments from file: " + JSON.stringify(segmentDescriptions))
        let newSegments = {
            "time": [],
            "duration": [],
            "offset": [],
            "loudness": []
        };

        for (let seg of segmentDescriptions.segments) {
            console.log(seg.identifier);
            newSegments.time = newSegments.time.concat(seg.time);
            newSegments.duration = newSegments.duration.concat(seg.duration);
            newSegments.offset = newSegments.offset.concat(seg.offset);
        }
        // Add dummy element at end. This is needed otherwise segment engine halts at the
        // next to last segment.
        /*let lastTime = newSegments.time[newSegments.time.length-1];
        let lastDur = newSegments.duration[newSegments.duration.length-1];
        newSegments.time.push(lastTime+lastDur);
        newSegments.duration.push(lastDur);*/

        console.log("NEW SEGMENT:")
        console.log(newSegments);

        this.transportedSegmentEngine = new wavesAudio.SegmentEngine({
            buffer: this.source.buffer,
            positionArray: newSegments.time,
            durationArray: newSegments.duration,
            offsetArray: newSegments.offset,
            durationRel: 0.95,
            releaseAbs: 0.005,
            releaseRel: 0.005,
            cyclic: false,

        });
        this.transportedSegmentEngine.connect(this.analyser);

        this.transportedObj = this.transport.add(this.transportedSegmentEngine,99999);
        console.log("adding engine at transport pos 99999");
        //this.transportedObj.setBoundaries(0, 24, 0, 1);
        //console.log(this.transportedObj);

    }

    loadFromJson(json) {
        this.segmentDescriptions = json;
        this.setupSegmentPlayer(json);
        return 'Dummy';
    }

    setMasterTransport(master) {

        this.transport = master;
        console.log("new master transport:");
        console.log(master);

    }

    setMasterPlayControl(control) {

        this.playControl = control;
        console.log("new master play control:");
        console.log(control);
    }

    getTransported() {
        return this.transportedObj;
    }

    switchEngine(part) {
        const _headroom = 1;
        //console.log("PART:" + part);
        
        if (part > this.segmentDescriptions.segments.length-1) {
            console.log("Trying to set part that dont exist!");
            part = 0;
        }
        //console.log(this.segmentDescriptions.segments[part]);    

        const _duration = this.segmentDescriptions.segments[part].duration.reduce((prev, curr) => prev + curr);
        //console.log(_duration);

        var pos = (this.transport.currentPosition / _duration).toFixed(0) * _duration;
        console.log("POS:" + pos);
        if (this.transportedObj) {
            this.transportedObj.setBoundaries(pos, _duration + _headroom, -(_duration * part), 1);
            //console.log(this.transportedObj);
        }
        this.currentPart = part;
    }


    getAudioContext() {
        if (!window.WaveSurferAudioContext) {

            window.WaveSurferAudioContext = wavesAudio.audioContext;
        }

        return window.WaveSurferAudioContext;
    }

    addOnAudioProcess() {
        const my = this;

        this.scriptNode.onaudioprocess = function(e) {
            const time = my.getCurrentTime();

            if (time >= my.getDuration() || time < 0) {
                //my.setState(FINISHED);
                my.fireEvent('pause');
            } else if (time >= my.scheduledPause && my.playControl && !my.playControl.loop) {
                //my.setState(PAUSED);
                my.fireEvent('pause');
            } else if (my.state === my.states[PLAYING]) {
                my.fireEvent('audioprocess', time);
            }

        };
    }

    destroy() {
        console.log('FIXME: Do cleanup of wavesjs etc...');
        super.destroy();
    }

    createSource() {
        this.disconnectSource();
        this.source = this.ac.createBufferSource();

        //adjust for old browsers.
        this.source.start = this.source.start || this.source.noteGrainOn;
        this.source.stop = this.source.stop || this.source.noteOff;

        this.source.playbackRate.value = this.playbackRate;
        this.source.buffer = this.buffer;

        //const scheduler = wavesAudio.getScheduler();
        // Create Progression display

        /*this.positionDisplay = new wavesAudio.TimeEngine();
        this.positionDisplay.period = 0.05;

        let _last = -1;
        this.positionDisplay.advanceTime = (time) => {
            // console.log(this.currentEngine.segmentIndex);
            this.fireEvent('audioprocess', time);
            if (this.transportedSegmentEngine) {
                const idx = this.currentPart || 0;
                const MAX_SEGMENT = this.segmentDescriptions.segments[idx].time.length; // FIXME: This assumes all segments are equal to first.
                
                const seg = Modulo(this.transportedSegmentEngine.segmentIndex - 1, MAX_SEGMENT) + 1;
                //console.log("seg: " + seg + " / " + MAX_SEGMENT);
                switch (seg) {
                    case MAX_SEGMENT: //last segment in serie
                        if (_last != seg) { // use a flag so we only do this once per cycle

                            // Fire an event and tell master app that we're ready to accept chord change.
                            // The master app will look up to correct "next" chord and call this players switchEngine
                            console.log("last segment, time to change chord");
                            this.fireEvent('lastsegment'); 
                            _last = MAX_SEGMENT;

                        }
                        break;
                    default:
                        if (_last != seg) {
                            const _duration = this.segmentDescriptions.segments[idx].duration.reduce((prev, curr) => prev + curr);
                            this.startOffset = this.currentPart * _duration;
                            _last = seg;
                        }
                        break;
                }

            }


            return time + this.positionDisplay.period;
        };

        scheduler.add(this.positionDisplay);*/
        this.setState(PLAYING);

        this.fireEvent('play');

    }

    seekTo(start, end) {

    }

    getPlayedTime() {

        return this.transportedSegmentEngine.currentPosition;

    }
    play(start, end) {
        if (!this.buffer) {
            return;
        }
    }

    pause() {}

    setPlaybackRate(value) {

    }

}