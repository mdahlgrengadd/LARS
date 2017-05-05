import WebAudio from './webaudio_subclassed';

export default class BackendPlugin {

    static create(params) {
        return {
            name: 'backend',
            deferInit: params && params.deferInit ? params.deferInit : false,
            params: params,
            instance: BackendPlugin
        };
    }

    constructor(params, ws) {
        this.wavesurfer = ws;
        this.wavesurfer.Backend = WebAudio;
        this.wavesurfer.createBackend();
    }

    init() {
        console.log('init backend');
    }

    destroy() {
        console.log('destroy backend');
    }
}
