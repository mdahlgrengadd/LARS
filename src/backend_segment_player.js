import MyWebAudio from './webaudio_segment_player';

export default class BackendPlugin {

    static create(params) {
        console.log('create:params');
        return {
            name: 'backend',
            deferInit: params && params.deferInit ? params.deferInit : false,
            params: params,
            instance: BackendPlugin
            /*staticProps: {
                Backend: MyWebAudio
            }*/
        };
    }

    constructor(params, ws) {
        console.log('construct:params');

        this.wavesurfer = ws;
        this.wavesurfer.Backend = MyWebAudio;
        this.wavesurfer.createBackend();

        this.setupPluginDOM(ws);

        this.wavesurfer.on('ready', () => {
            console.log(params);
            if (params.transport) {
                ws.backend.setMasterTransport(params.transport);

            }

            if (params.playctrl) {
                ws.backend.setMasterPlayControl(params.playctrl);
            }

            if (params.json) {
                ws.backend.loadFromJson(params.json);
            }

        });


    }

    init() {
        console.log('init webaudio_segment_player');
    }

    destroy() {
        console.log('destroy webaudio_segment_player');
    }

    setupPluginDOM(ws) {
        /*
        // 1. Create the button
        const button = document.createElement('button');
        button.innerHTML = 'Change Chord';

        // 2. Append somewhere
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(button);

        // 3. Add event handler
        button.addEventListener('click', () => {
            ws.backend.switchEngine();
        });

        */

        /*        let container = "sliders";
                // create a new div element
                // and give it some content

                var slider = document.createElement("input");
                slider.type = "range";
                slider.min = 50;
                slider.max = 200;
                slider.value = 100;

                slider.oninput = function() {
                    var zoomLevel = Number(slider.value) / 100;
                    //globalPlayControl.speed = zoomLevel * 2;
                    ws.backend.setPlaybackRate(zoomLevel * 2);
                };


                // add the newly created element and its content into the DOM
                var currentDiv = document.getElementById(container);
                currentDiv.appendChild(slider);*/

    }


}
