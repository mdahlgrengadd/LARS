# LARS 2 (WIP)
> Loop, annotate, record and slow down audio

### So what is LARS for?
I started this project to be able to slow down a piece of music while trying to learn it. Ok? I hear you say, but isn't there already too many apps doing this? 

Well, yes and no. Actually I wanted to be able to mix several musical sources together, say a melody, a second voice or a harmony and/or a rythm. I also wanted to have the notes of the score display with a super simple way to select one or several measures too loop. And of course I want to be able to annotate parts of the score.

The app 'AbcWeb' actually does most of the things I want, but syncing audio with visual display of notes is pretty difficult. 

### How will LARS work?
The audio/visual syncing is handled by wavesurfer.js for waveform rendering and abc2svg for displaying notes. The playback and handling of tempo/timestretch is done by Wavesjs.
Annotation is handled with ELAN (because theres already a plugin for wavesurfer), but will probably be replace by JAMS later. 

### Other ideas
Well, one thing I think would be possible is if User A records a melody and describes it using JAMS (chords/tempo/onsets). Then User B who plays the guitar might have created a accompainment and described it using JAMS ([https://github.com/marl/jams](https://github.com/marl/jams)). User C who plays drums did the same. Then these performances could be mixed together and play in sync.

### Development Setup

```bash
# install dependencies
$ npm install

# dev mode
$ npm run dev

# test
$ npm run test

# build
$ npm run build
```

### Insipiration
[MySong: Automatic Accompaniment for Vocal Melodies](https://www.youtube.com/watch?v=Lud6_I04OkQ)

[XMURE](https://www.youtube.com/watch?v=xp-81IKm-Tg)
