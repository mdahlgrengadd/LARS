import WebAudio from '../node_modules/wavesurfer.js/src/webaudio';

export default class MyWebAudio extends WebAudio {
    constructor(params) {
        super(params);
        console.log('Init subclassed backend');
    }
    getPlayedPercents() {
        //Do my own stuff here
        return super.getPlayedPercents();
    }
}
