/* eslint-env browser */
// 'use strict';
import * as wavesAudio from 'waves-audio';
import WaveSurfer from 'wavesurfer.js';
import GranularBackend from './backend_granular_player';
import SegmentBackend from './backend_segment_player';
import * as wavesLoaders from 'waves-loaders';

// Create an instance
let wavesurfer1 = {};
let wavesurfer2 = {};
const globalTransporter = new wavesAudio.Transport();
const globalPlayControl = new wavesAudio.PlayControl(globalTransporter);
// Init & load audio file
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('[data-action="play1"]');
    const button2 = document.querySelector('[data-action="stop1"]');

    let loader = new wavesLoaders.SuperLoader(); // instantiate loader

    let assets = [
        "../assets/footstomps.json",
        "../assets/3_4_guitar-loop.json"
    ];

    // load audio and marker files
    loader.load(assets).then(function(jsonfile) {


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
        wavesurfer1.load('../assets/3_4_Guitar30bpm96khz32bit.wav');


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

        wavesurfer2.load('../assets/footstomps.wav');

        var slider = document.querySelector('#slider');

        slider.oninput = function() {
            var zoomLevel = Number(slider.value) / 100.0;
            globalPlayControl.speed = zoomLevel * 2;
        };

        globalPlayControl.speed = 1.3 * 2;

        button1.addEventListener('click', function() {
            globalPlayControl.start();

        });

        button2.addEventListener('click', function() {
            globalPlayControl.stop();
        });


    });


});