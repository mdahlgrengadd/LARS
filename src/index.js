/* eslint-env browser */
// 'use strict';
import * as wavesAudio from 'waves-audio';
import * as wavesLoaders from 'waves-loaders';
import 'regenerator-runtime/runtime'
import WaveSurfer from 'wavesurfer.js';
import GranularBackend from './backend_granular_player';
import SegmentBackend from './backend_segment_player';


const globalTransporter = new wavesAudio.Transport();
const globalPlayControl = new wavesAudio.PlayControl(globalTransporter);
const Modulo = (num, mod) => ((num % mod) + mod) % mod;
function* progression() {
    const progressions = [5, 1, 2, 1, 3, 0, 4, 1, 6, 5, 6];
    //const progressions = [0, 3, 4, 0, 0, 4, 0, 0, 3, 0, 4];
    //const progressions = [0, 0, 0, 0, 0, 0, 0];
    var index = 0;
    while (true)
        yield progressions[Modulo(index++, progressions.length)];
}

let chord = progression();
let c = 0;

function onReady() {
    console.log('ready');
    console.log(this);

    this.backend.on('lastsegment', () => {
        //var rand = Math.floor(Math.random() * 6)
        this.backend.switchEngine(c)
    });

}

// Init & load audio file
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('[data-action="play1"]');
    const button2 = document.querySelector('[data-action="stop1"]');

    const loader = new wavesLoaders.SuperLoader(); // instantiate loader

    const assets = [
        './assets/footstomps_v2.json',
        './assets/piano_v2.json',
        './assets/3_4_guitar-loop_v2.json'
    ];




    // create position display (as transported TimeEngine)
    // This will act as the "Sequencer" and at specified time interval
    // change chord (andvancePosition).
    var positionDisplay = new wavesAudio.TimeEngine();
    positionDisplay.period = 12;

    positionDisplay.syncPosition = function(time, position, speed) {

      console.log("SYNC");
      var nextPosition = Math.floor(position / this.period) * this.period;
        
        if (speed > 0 && nextPosition < position)
            nextPosition += this.period;
        else if (speed < 0 && nextPosition > position)
            nextPosition -= this.period;

        return nextPosition;
    };

    positionDisplay.advancePosition = function(time, position, speed) {
        c = chord.next().value;
        console.log("CHORD: " + c);


        if (speed < 0)
            return position - this.period;

        return position + this.period;
    };


    globalTransporter.add(positionDisplay, 6);


    // load audio and marker files
    loader.load(assets).then((jsonfiles) => {
                    console.log(jsonfiles);

        let index = 0;
        for (const jsonitem of jsonfiles) {
            const waveform = document.createElement('div');
            const demo = document.getElementById('waveform');
            demo.appendChild(waveform);

            const wavesurfer = WaveSurfer.create({
                container: waveform,
                plugins: [

                    //GranularBackend.create()
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
            wavesurfer.on('ready', onReady.bind(wavesurfer));

            wavesurfer.load(fname);



        }

        const slider = document.querySelector('#slider');

        slider.oninput = () => {
            const playBackRate = Number(slider.value) / 100.0;
            globalPlayControl.speed = playBackRate * 2;
            //globalPlayControl.seek(slider.value/10);
        };

        globalPlayControl.speed = 1.3 * 2;
        slider.value = globalPlayControl.speed * 100 / 2;

        button1.addEventListener('click', () => {
            chord = progression();
            c = 0; 
            globalPlayControl.seek(0);
            globalPlayControl.start();

        });

        button2.addEventListener('click', () => {
            globalPlayControl.stop();
        });


    });


});