(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        var currentSong = null;
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        }
        
/**
* @method SongPlayer.play
* @desc Plays song when play button is clicked
* @param {Object} song
*/ 
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);                
                
            }   else if (currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);
                }
            }            
        }
/**
* @method SongPlayer.pause
* @desc Pauses song when pause button is clicked
* @param {Object} song
*/         
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
//            if (currentBuzzObject.isPaused()) {
//                song.playing = true;
//            }
        }
        
         
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
    
})();