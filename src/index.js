/* eslint-env browser */
// 'use strict';
import * as wavesAudio from 'waves-audio';
import * as wavesLoaders from 'waves-loaders';
import WaveSurfer from 'wavesurfer.js';
import GranularBackend from './backend_granular_player';
import SegmentBackend from './backend_segment_player';


// Create an instance
let wavesurfer1 = {};
let wavesurfer2 = {};
let wavesurfer3 = {};
const globalTransporter = new wavesAudio.Transport();
const globalPlayControl = new wavesAudio.PlayControl(globalTransporter);
// Init & load audio file
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('[data-action="play1"]');
    const button2 = document.querySelector('[data-action="stop1"]');

    const loader = new wavesLoaders.SuperLoader(); // instantiate loader

    const assets = [
        './assets/footstomps.json',
        './assets/piano.json',
        './assets/3_4_guitar-loop.json'
    ];

    // load audio and marker files
    loader.load(assets).then((jsonfile) => {


        wavesurfer1 = WaveSurfer.create({
            container: document.querySelector('#waveform1'),
            plugins: [
                //GranularBackend.create()
                SegmentBackend.create({
                    transport: globalTransporter,
                    playctrl: globalPlayControl,
                    json: jsonfile[1]
                })
            ]
        });
        wavesurfer1.load('./assets/Piano30bpm.wav');


        wavesurfer2 = WaveSurfer.create({
            container: document.querySelector('#waveform2'),
            plugins: [
                SegmentBackend.create({
                    transport: globalTransporter,
                    playctrl: globalPlayControl,
                    json: jsonfile[0]
                })
            ]
        });

        wavesurfer2.load('./assets/footstomps.wav');
        /*
        wavesurfer3 = WaveSurfer.create({
            container: document.querySelector('#waveform2'),
            plugins: [
                SegmentBackend.create({
                    transport: globalTransporter,
                    playctrl: globalPlayControl,
                    json: jsonfile[2]
                })
            ]
        });

        wavesurfer3.load('./assets/3_4_Guitar30bpm96khz32bit.wav');*/

        const slider = document.querySelector('#slider');

        slider.oninput = () => {
            const playBackRate = Number(slider.value) / 100.0;
            globalPlayControl.speed = playBackRate * 2;
        };

        globalPlayControl.speed = 1.3 * 2;
        slider.value = globalPlayControl.speed * 100 / 2;

        button1.addEventListener('click', () => {
            globalPlayControl.start();

        });

        button2.addEventListener('click', () => {
            globalPlayControl.stop();
        });


    });


});
