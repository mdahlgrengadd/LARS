import MyWebAudio from './webaudio_subclassed';

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
        console.log('Custom backend constructor');
        this.wavesurfer = ws;
        this.wavesurfer.Backend = MyWebAudio;
        this.wavesurfer.createBackend();
    }

    init() {
        console.log('init backend');
    }

    destroy() {
        console.log('destroy backend');
    }
}
