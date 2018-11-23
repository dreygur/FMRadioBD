// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/3.3.21/plyr.min.js
// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            tracks = [{
                "track": 1,
                "name": "Radio Foorti (88.0FM)",
                "duration": "LIVE",
                "file": "http://119.148.23.88:1021/;stream/1"
            }, {
                "track": 2,
                "name": "ABC Radio (89.2FM)",
                "duration": "LIVE",
                "file": "http://ample-zeno-18.radiojar.com/6a28tbx6vewtv?rj-ttl=5&rj-token=AAABZxFkmHh-SWPGo9VzWL_UEKH9xkKNeh3LxJjFWftGoM7nY5jAJA"
            }, {
                "track": 3,
                "name": "Jago FM (94.4FM)",
                "duration": "LIVE",
                "file": "http://192.240.102.133:12110/;stream/1"
            }, {
                "track": 4,
                "name": "Bangladesh Betar (100.0FM)",
                "duration": "LIVE",
                "file": "http://ample-zeno-07.radiojar.com/8w0533k6vewtv?rj-ttl=5&rj-token=AAABX87UTciGemPgMYZ0vYCKX0u3FHfYhNNe7FGx44CJCpgkjSc2Pw"
            }, {
                "track": 5,
                "name": "Radio Dhol (94.0FM)",
                "duration": "LIVE",
                "file": "http://192.240.102.133:11331/live"
            }, {
                "track": 6,
                "name": "Radio Dhoni (91.2FM)",
                "duration": "LIVE",
                "file": "http://182.160.110.180:1020/;stream.mp3"
            }, {
                "track": 7,
                "name": "Colours (101.6FM)",
                "duration": "LIVE",
                "file": "http://45.64.135.88:8000/stream1"
            }, {
                "track": 8,
                "name": "Dhaka FM (90.4FM)",
                "duration": "LIVE",
                "file": "http://118.179.219.244:8000/;"
            }, {
                "track": 9,
                "name": "Radio Bhumi (92.8FM)",
                "duration": "LIVE",
                "file": "http://149.56.195.94:8545/;stream.mp3"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = tracks[id].file;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        loadTrack(index);
    } else {
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});