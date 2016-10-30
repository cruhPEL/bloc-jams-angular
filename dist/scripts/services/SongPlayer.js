(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

/**
* @desc Album object from Fixtures.js
* @type {Object}
*/ 
        var currentAlbum = Fixtures.getAlbum();

/**
* @function getSongIndex
* @desc Returns the position of the song being played
* @param {Object} song
*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
/**
 * @desc Active song object from list of songs
 * @type {Object}
 */
        SongPlayer.currentSong = null;
        
/**
* @function playSong
* @desc Plays song and loads new audio file as currentBuzzObject
* @param {Object} song
*/ 
        var playSong = function(song) {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };

/**
* @function stopSong
* @desc Stops currently playing song
* @param {Object} song
*/         
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
/**
* @desc Buzz object audio file
* @type {Object}
*/
        
        var currentBuzzObject = null;
        
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/        
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };
        
/**
* @method SongPlayer.play
* @desc Plays song when play button is clicked
* @param {Object} song
*/ 
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);                
                
            }   else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);
                }
            }            
        };
/**
* @method SongPlayer.pause
* @desc Pauses song when pause button is clicked
* @param {Object} song
*/         
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
//            if (currentBuzzObject.isPaused()) {
//                song.playing = true;
//            }
        };

/**
* @method SongPlayer.previous
* @desc Skips to previous song when previous button is clicked in player bar
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

/**
* @method SongPlayer.next
* @desc Skips to next song when next button is clicked in player bar
*/        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > 4) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
         
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
    
})();