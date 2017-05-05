/* eslint-env browser */
// 'use strict';

import WaveSurfer from 'wavesurfer.js';
import BackendPlugin from './backend';
// Create an instance
let wavesurfer = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-action="play"]');

    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        plugins: [
            BackendPlugin.create()
        ]
    });


    // Load audio from URL
    wavesurfer.load('../media/demo.wav');

    button.addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
});
