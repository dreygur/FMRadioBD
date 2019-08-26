var songs = {
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [
    {
      "name": "Radio Foorti (88.0FM)",
      "artist": "88.0FM",
      "album": "Radio",
      "url": "http://119.148.23.88:1021/;stream/1"
    },
    {
      "name": "ABC Radio (89.2FM)",
      "artist": "89.2FM",
      "album": "Radio",
      "url": "http://ample-zeno-20.radiojar.com/aqs8z2kn944tv"
    },
    {
      "name": "Radio Today (89.6FM)",
      "artist": "89.6FM",
      "album": "Radio",
      "url": "http://stream.zenolive.com/8wv4d8g4344tv"
    },
    {
      "name": "Dhaka FM (90.4FM)",
      "artist": "90.4FM",
      "album": "Radio",
      "url": "http://118.179.219.244:8000/;"
    },
    {
      "name": "Radio Dhoni (91.2FM)",
      "artist": "91.2FM",
      "album": "Radio",
      "url": "http://182.160.110.180:1020/;stream.mp3"
    },
    {
      "name": "Peoples  Radio (91.6FM)",
      "artist": "91.6FM",
      "album": "Radio",
      "url": "http://s3.myradiostream.com/14498/listen.mp3"
    },
    {
      "name": "Radio Shadhin (92.4FM)",
      "artist": "92.4FM",
      "album": "Radio",
      "url": "http://ample-zeno-10.radiojar.com/umq9q5uuva5tv"
    },
    {
      "name": "Radio Bhumi (92.8FM)",
      "artist": "92.8FM",
      "album": "Radio",
      "url": "http://149.56.195.94:8545/;stream.mp3"
    },
    {
      "name": "Radio Next (93.2FM)",
      "artist": "93.2FM",
      "album": "Radio",
      "url": "http://live.radionext.fm:9000/;"
    },
    {
      "name": "Radio Din-Raat (93.6FM)",
      "artist": "93.6FM",
      "album": "Radio",
      "url": "http://27.147.128.134:8000/"
    },
    {
      "name": "Radio Dhol (94.0FM)",
      "artist": "94.0FM",
      "album": "Radio",
      "url": "http://192.240.102.133:11331/live"
    },
    {
      "name": "Jago FM (94.4FM)",
      "artist": "94.4FM",
      "album": "Radio",
      "url": "http://192.240.102.133:12110/;stream/1"
    },
    {
      "name": "City FM (96.0FM)",
      "artist": "96.0FM",
      "album": "Radio",
      "url": "http://158.106.188.12:9300/;stream.ogg"
    },
    {
      "name": "Spice FM (96.4FM)",
      "artist": "96.4FM",
      "album": "Radio",
      "url": "http://162.254.149.187:9300/stream"
    },
    {
      "name": "Radio Ekattor (98.4FM)",
      "artist": "98.4FM",
      "album": "Radio",
      "url": "http://103.253.47.173:8000/;"
    },
    {
      "name": "Bangladesh Betar (100.0FM)",
      "artist": "100.0FM",
      "album": "Radio",
      "url": "http://ample-zeno-07.radiojar.com/8w0533k6vewtv"
    },
    {
      "name": "Colours (101.6FM)",
      "artist": "101.6FM",
      "album": "Radio",
      "url": "http://45.64.135.88:8000/stream1"
    }
  ]
};

jQuery(function ($) {
  'use strict';

  for (var index = 0; index < songs.songs.length; index++) {
      $("#list").append(
        `<div class="song amplitude-song-container amplitude-play-pause" data-amplitude-song-index="${index}">
            <span class="song-number-now-playing">
              <span class="number">${index + 1}</span>
              <img class="now-playing" src="https://521dimensions.com/img/open-source/amplitudejs/examples/flat-black/now-playing.svg"/>
            </span>

            <div class="song-meta-container">
              <span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="${index}"></span>
              <span class="song-artist-album"><span data-amplitude-song-info="artist" data-amplitude-song-index="${index}"></span> - <span data-amplitude-song-info="album" data-amplitude-song-index="${index}"></span></span>
            </div>

            <span class="song-duration">
              LIVE
            <span>
          </div>`
    );
  }
});

setTimeout(function () {
  window.onkeydown = function (e) {
      return !(e.keyCode == 32);
  };

  /*
    Handles a click on the down button to slide down the playlist.
  */
  document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
    var list = document.getElementById('list');

    list.style.height = ( parseInt( document.getElementById('flat-black-player-container').offsetHeight ) - 135 ) + 'px';

    document.getElementById('list-screen').classList.remove('slide-out-top');
    document.getElementById('list-screen').classList.add('slide-in-top');
    document.getElementById('list-screen').style.display = "block";
  });

  /*
    Handles a click on the up arrow to hide the list screen.
  */
  document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
    document.getElementById('list-screen').classList.remove('slide-in-top');
    document.getElementById('list-screen').classList.add('slide-out-top');
    document.getElementById('list-screen').style.display = "none";
  });

  /*
    Handles a click on the song played progress bar.
  */
  document.getElementById('song-played-progress').addEventListener('click', function( e ){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
  });

  document.querySelector('img[data-amplitude-song-info="cover_art_url"]').style.height = document.querySelector('img[data-amplitude-song-info="cover_art_url"]').offsetWidth + 'px';

  Amplitude.init(songs);

}, 100);