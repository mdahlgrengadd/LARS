/* eslint-env browser */
// 'use strict';
//import * as wavesAudio from 'waves-audio';
import * as wavesLoaders from 'waves-loaders';

import WaveSurfer from 'wavesurfer.js';
import GranularBackend from './backend_granular_player';
import SegmentBackend from './backend_segment_player';

//let wavesAudio = require('../waves-audio.umd.js');
import * as wavesAudio from '../../waves-audio/src/index';

const globalTransporter = new wavesAudio.Transport();
const globalPlayControl = new wavesAudio.PlayControl(globalTransporter);
const globalScheduler = wavesAudio.getScheduler();

const Modulo = (num, mod) => ((num % mod) + mod) % mod;


let globalTransportedEngines = [];
let myGranular = {};
let granularTransportedObject = {};
let positionDisplay = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('[data-action="play1"]');
    const button2 = document.querySelector('[data-action="stop1"]');

    const loader = new wavesLoaders.SuperLoader(); // instantiate loader

    const assets = [
        './assets/piano_v2.json',
        //'./assets/footstomps_v2.json',
        //'./assets/3_4_guitar-loop_v2.json'
    ];

    /* Resampling Slider */
    let r = document.createElement("INPUT");
    r.setAttribute("type", "range");
    r.min = -40;
    r.max = 40;
    r.step = 10;
    r.value = 0;
    document.getElementById('waveform').appendChild(r);

    /* Create a granular */
    loader.load('./assets/strings96.wav').then((audiofile) => {
    //loader.load('./assets/3_4_Guitar30bpm96khz32bit.wav').then((audiofile) => {
    //loader.load('./assets/footstomps.wav').then((audiofile) => {
        console.log(audiofile);
        myGranular = new wavesAudio.GranularEngine({
            buffer: audiofile,
            speed: 1.0,
            periodAbs: 0.005,
            periodRel: 0.0,
            periodVar: 1.0,
            position: 0.0,
            positionVar: 0.00,
            durationAbs: 0.16,
            durationRel: 0.0,
            attackAbs: 1,
            attackRel: 0.0,
            releaseAbs: 1,
            releaseRel: 0.0,
            releaseShape: 'lin',
            expRampOffset: 0.0001,
            resampling: 0.0,
            resamplingVar: 0,
            gain: 0.35,
            centered: true,
            cyclic: true
        });

        console.log(myGranular);
        myGranular.connect(wavesAudio.audioContext.destination);
        granularTransportedObject = globalScheduler.add(myGranular);

        positionDisplay = new wavesAudio.TimeEngine();
        positionDisplay.period = 0.05;

        positionDisplay.advanceTime = function(time) {
            console.log(time);
            myGranular.position += 0.05;//positionDisplay.period;
            // Slow down speed more and more
            positionDisplay.period += 0.0025;
            return time + this.period;
        };
        globalScheduler.add(positionDisplay);

    });

    // load audio and marker files
    loader.load(assets).then((jsonfiles) => {

        var sequenceData = {
            "time": [0, 6, 12, 18, 24, 30, 36, 42, 48, 54],
            "identifier": ["Am", "G", "C", "F", "Dm", "Am", "G", "C", "F", "Dm"],
            "duration": [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
            "offset": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        /* Setup Sequencer */
        let sequencer = new wavesAudio.SequencerEngine({
            // buffer not used, but requires more changes in source to be able to remove.
            // perhaps I will use it as a recording sink...
            buffer: wavesAudio.audioContext.createBuffer(2, 22050, 44100),
            positionArray: sequenceData.time,
            durationArray: sequenceData.duration,
            offsetArray: sequenceData.offset,
            cyclic: false,
            callback: function(seqIndex) {
                // Ok, so right now just outputting random chords,
                // but this will be controlled by the sequencer in the future...
                console.log("Sequencer says: " + sequenceData.identifier[seqIndex]); // print sequencer chords, (not what's playing, though)
                //console.log(globalTransporter.currentPosition);
                var rand = Math.floor(Math.random() * 6);

                positionDisplay.period = 0.05; // reset speed on trigger.
                let pos = globalTransporter.currentPosition;
                myGranular.position = rand * 6+0.5;

                //granularTransportedObject.setBoundaries(pos, 6, rand * -12, 1)

                /*let transportedObject = globalTransportedEngines[0];
                
                transportedObject.setBoundaries(pos, 6, rand * -12, 1);

                transportedObject = globalTransportedEngines[1];
                transportedObject.setBoundaries(pos, 6, 0, 1);


                transportedObject = globalTransportedEngines[2];
                transportedObject.setBoundaries(pos, 6, rand * -6, 1);*/

            }

        });

        globalTransporter.add(sequencer);


        /* Add wavesurfer object for each json-file */
        //let index = 0;
        for (const jsonitem of jsonfiles) {
            const waveform = document.createElement('div');
            const demo = document.getElementById('waveform');
            demo.appendChild(waveform);

            let wavesurfer = WaveSurfer.create({
                container: waveform,
                plugins: [

                    //GranularBackend.create({
                    SegmentBackend.create({
                        transport: globalTransporter,
                        playctrl: globalPlayControl,
                        json: jsonitem
                    })
                ]
            });
            console.log(jsonitem);
            const fname = jsonitem.file_metadata.identifiers.url;
            console.log('FileName: ' + fname);
            // 
            wavesurfer.on('ready', () => {
                console.log('ready');

                //let engine = wavesurfer.backend.getEngine();
                //let transportedObject = globalTransporter.add(engine, 99999);


                let engine = wavesurfer.backend.getTransported();
                let transportedObject = globalTransporter.add(engine, 99999);
                console.log("adding engine at transport pos 99999");

                transportedObject.advancePosition = function(time, position, speed) {
                    position = this.__offsetPosition + this.__engine.advancePosition(time, position - this.__offsetPosition, speed);

                    if (speed > 0 && position < this.__endPosition || speed < 0 && position >= this.__startPosition)
                        return position;

                    // Returning Infinite causes a halt, again trying a big number instead.
                    return 99999; //Infinity * speed;
                }.bind(transportedObject);

                globalTransportedEngines.push(transportedObject);

            });

            wavesurfer.load(fname);

            /* Gain Slider */
            let x = document.createElement("INPUT");
            x.setAttribute("type", "range");
            x.min = 0;
            x.max = 1;
            x.step = 0.01;
            x.value = 1;
            demo.insertBefore(x, waveform);
            x.oninput = () => {
                wavesurfer.setVolume(x.value);
                //wavesurfer.backend.transportedSegmentEngine.polyCutoff = x.value;
            };

            r.addEventListener("mouseup", function() {
                wavesurfer.backend.transportedEngine.resampling = r.value;
                console.log(r.value);
            }, false);


        }

        const slider = document.querySelector('#slider');

        slider.oninput = () => {
            const playBackRate = Number(slider.value) / 100.0;
            globalPlayControl.speed = playBackRate * 2;
            //globalPlayControl.seek(slider.value/10);
        };

        globalPlayControl.speed = 1.5 * 2;
        slider.value = globalPlayControl.speed * 100 / 2;

        button1.addEventListener('click', () => {

            globalPlayControl.seek(0);
            globalPlayControl.loop = true;
            globalPlayControl.setLoopBoundaries(0, 60);
            globalPlayControl.start();


        });

        button2.addEventListener('click', () => {
            globalPlayControl.stop();
        });


    });


});