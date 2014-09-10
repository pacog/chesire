'use strict';

angular.module('chesireApp')
    .factory('SongStore', function($q, localStorageService) {

        var changeInAllSongsSubscribers = [];

        var getSongs = function() {
            var deferred = $q.defer();

            deferred.resolve(localStorageService.get('songs') || []);

            return deferred.promise;
        };

        var saveSong = function(song) {
            var deferred = $q.defer();
            if(!song || !song.name || !song.chords || !song.chords.length) {
                deferred.reject('Error saving song, bad config');
            } else {
                var allSongs = localStorageService.get('songs');
                if(allSongs) {
                    allSongs = angular.fromJson(allSongs);
                } else {
                    allSongs = [];
                }

                var existingSong = findSongInList(song, allSongs);
                if(existingSong) {
                    existingSong.chords = song.chords;
                } else {
                    allSongs.push(song);
                }
                localStorageService.set('songs', allSongs);
                deferred.promise.then(onChangeInAllSongs);
                deferred.resolve(allSongs);
            }
            
            return deferred.promise;
        };

        //TODO: many things shared in different stores, should create a helper service with common code
        var deleteSong = function(songToDelete) {
            var deferred = $q.defer();
            var allSongs = localStorageService.get('songs');
            var existingSong = findSongInList(songToDelete, allSongs);

            allSongs = _.without(allSongs, existingSong);
            localStorageService.set('songs', allSongs);
            deferred.promise.then(onChangeInAllSongs);
            deferred.resolve(allSongs);

            return deferred.promise;
        };

        var findSongInList = function(song, songList) {
            for(var i=0; i<songList.length; i++) {
                if(songList[i].name === song.name) {
                    return songList[i];
                }
            }
            return false;
        };

        var subscribeToChangeInAllSongs = function(callback) {
            changeInAllSongsSubscribers.push(callback);
        };

        var unsubscribeToChangeInAllSongs = function(callback) {
            changeInAllSongsSubscribers = _.without(changeInAllSongsSubscribers, callback);
        };

        var onChangeInAllSongs = function(newAllSongs) {
            angular.forEach(changeInAllSongsSubscribers, function(callback) {
                callback(newAllSongs);
            });
        };

        return {
            getSongs: getSongs,
            saveSong: saveSong,
            deleteSong: deleteSong,
            subscribeToChangeInAllSongs: subscribeToChangeInAllSongs,
            unsubscribeToChangeInAllSongs: unsubscribeToChangeInAllSongs
        };
    });