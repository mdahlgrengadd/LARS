import WebAudio from '../node_modules/wavesurfer.js/src/webaudio';
import * as wavesAudio from 'waves-audio';

const PLAYING = 'playing';
const PAUSED = 'paused';
const FINISHED = 'finished';

export default class MyWebAudio extends WebAudio {
    constructor(params) {
        super(params);
    }

    getAudioContext() {
        if (!window.WaveSurferAudioContext) {
            
            window.WaveSurferAudioContext = wavesAudio.audioContext;
        }

        return window.WaveSurferAudioContext;
    }

    addOnAudioProcess() {
        var my = this;

        this.scriptNode.onaudioprocess = function(e) {
            var time = my.getCurrentTime();

            if (time >= my.getDuration() || time < 0) {
                my.setState(FINISHED);
                my.fireEvent('pause');
            } else if (time >= my.scheduledPause && my.playControl && !my.playControl.loop) {
                my.setState(PAUSED);
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
        var self = this;
        /*
                function setupSegmentPlayer() {

                    var audioContext = wavesAudio.audioContext;
                    var loader = new self.wavesLoaders.SuperLoader(); // instantiate loader

                    var assets = [
                        "./assets/3_4_Guitar30bpm96khz32bit.wav",
                        "./assets/3_4_guitar-loop.json"
                    ];

                    // load audio and marker files
                    loader.load(assets).then(function(loaded) {
                        var audioBuffer = loaded[0];
                        var markerBuffer = loaded[1];

                        self.scheduledSegmentEngine.connect(WaveSurfer.WebAudio.audioContext.destination);

                        // create transport with play control and transported segment engine
                        var _chord = markerBuffer.VI;
                        var loopstart = _chord[0];
                        var loopend = _chord[_chord.length - 1];

                        self.transportedSegmentEngine = new wavesAudio.SegmentEngine({
                            buffer: audioBuffer,
                            positionArray: _chord,
                            durationArray: markerBuffer.duration,
                            offsetArray: markerBuffer.offset,
                            durationRel: 0.95,
                            releaseAbs: 0.005,
                            releaseRel: 0.005,
                            cyclic: true,

                        });

                        self.transportedSegmentEngine.connect(WaveSurfer.WebAudio.audioContext.destination);
                        //self.transport.add(self.transportedSegmentEngine);


                        var playControl = new wavesAudio.PlayControl(self.transportedSegmentEngine);

                        console.log(loopend);
                        playControl.setLoopBoundaries(loopstart, loopend);
                        playControl.loop = true;


                        playControl.speed = 1.0 * 2.0;
                        playControl.seek(loopstart);
                        
                        playControl.start();
                    });


                }
        */
        /*
                function setupMetronome() {
                    self.metronome = new wavesAudio.Metronome();
                    self.metronome.period = 60 / 86.49997514133682;
                    self.metronome.clickFreq = 666;
                    self.metronome.phase = 0;
                    self.metronome.gain = 0;
                    self.metronome.connect(WaveSurfer.WebAudio.audioContext.destination);
                }
        */
        function setupGranular() {

            // get scheduler and create scheduled granular engine
            self.scheduler = wavesAudio.getScheduler();
            self.scheduledGranularEngine = new wavesAudio.GranularEngine({
                buffer: self.source.buffer
            });
            self.scheduledGranularEngine.connect(self.analyser);

            // create transport with play control and transported granular engine
            //console.log(self.transportedGranularEngine);
            self.transportedGranularEngine = new wavesAudio.GranularEngine({
                buffer: self.source.buffer,
                cyclic: true
            });



            //self.transportedGranularEngine.connect(self.analyser);
            //self.transport.add(self.transportedGranularEngine);

            self.scheduler.add(self.scheduledGranularEngine);



        }

        this.disconnectSource();
        this.source = this.ac.createBufferSource();

        //adjust for old browsers.
        this.source.start = this.source.start || this.source.noteGrainOn;
        this.source.stop = this.source.stop || this.source.noteOff;

        this.source.playbackRate.value = this.playbackRate;
        this.source.buffer = this.buffer;
        // _MD_ // this.source.connect(this.analyser);


        // create transport and add engines
        this.transport = new wavesAudio.Transport();

        setupGranular();
        //setupMetronome();
        //setupSegmentPlayer();



        //this.transport.add(this.metronome);

        var scheduler = wavesAudio.getScheduler();
        //scheduler.add(this.metronome);


        // create play control
        this.playControl = new wavesAudio.PlayControl(this.transport);

    }

    seekTo(start, end) {
        var doLoop = true;

        if (start == null) {
            start = this.getCurrentTime();
            if (start >= this.getDuration()) {
                start = 0;
            }
        }
        if (end == null) {
            end = this.getDuration();
            doLoop = false;
        }
        //this.startPosition = start; 
        this.startPosition = 0;
        this.lastPlay = this.ac.currentTime;

        if (this.state === this.states[FINISHED]) {
            this.setState(PAUSED);
        }
        // When loop is true, an undesired behavior makes seeking 
        // beyond loopEnd change the position so that it fits inside 
        // loop region. This ugly fix turns off looping when seeking
        // outside loop region. (Also when playing in reverse (speed < 0), 
        // the same happens at loopStart).
        if (!doLoop) {
            this.playControl.setLoopBoundaries(0, this.getDuration());
        } else {
            this.playControl.setLoopBoundaries(start, end);
        }


        this.playControl.seek(start);
        this.playControl.loop = doLoop;

        this.scheduledPause = end;

        //console.log("start: " + start + " end: " + end);   

        return {
            start: start,
            end: end
        };
    }

    getPlayedTime() {
        this.scheduledGranularEngine.position = this.playControl.currentPosition;
        return (this.playControl.currentPosition); //.mod(this.getDuration());
        //return (this.ac.currentTime - this.lastPlay) * this.playbackRate * this.playControl.speed;
    }
    play(start, end) {
        if (!this.buffer) {
            return;
        }

        // need to re-create source on each playback
        //this.createSource();

        var adjustedTime = this.seekTo(start, end);

        start = adjustedTime.start;
        end = adjustedTime.end;

        this.scheduledPause = end;

        //this.source.start(0, start, end - start);
        //play();

        //scheduler.add(this.transportedGranularEngine);

        this.playControl.start();
        this.playControl.seek(start);

        if (this.ac.state == 'suspended') {
            this.ac.resume && this.ac.resume();
        }

        this.setState(PLAYING);

        this.fireEvent('play');
    }

    pause() {
        this.scheduledPause = null;

        this.startPosition += this.getPlayedTime();
        //this.source && this.source.stop(0);

        this.playControl.pause();
        //scheduler.remove(this.transportedGranularEngine);


        this.setState(PAUSED);

        this.fireEvent('pause');
    }

    setPlaybackRate(value) {
        value = value || 1;

        if (this.playControl) {
            this.playControl.speed = value;
        }

        if (this.isPaused()) {
            this.playbackRate = value;
        } else {
            //this.pause();
            this.playbackRate = value;
            //this.play();
        }
    }

}