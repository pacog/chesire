'use strict';

angular.module('chesireApp')
    .factory('SongStore', function($q, localStorageService) {

        var allSongsCache = null;
        var changeInAllSongsSubscribers = [];

        var getSongs = function() {
            var deferred = $q.defer();

            allSongsCache = localStorageService.get('songs') || [];
            deferred.resolve(allSongsCache);
            onChangeInAllSongs(allSongsCache);

            return deferred.promise;
        };

        var saveSong = function(song) {
            var deferred = $q.defer();
            if(!song || !song.name || !song.parts || !song.parts.length) {
                deferred.reject('Error saving song, bad config');
            } else {
                song.$isModified = false;

                var allSongs = localStorageService.get('songs');
                if(allSongs) {
                    allSongs = angular.fromJson(allSongs);
                } else {
                    allSongs = [];
                }

                var existingSongIndex = findSongIndexInList(song, allSongs);
                if(existingSongIndex > -1) {
                    allSongs[existingSongIndex] = song;
                } else {
                    allSongs.push(song);
                }

                localStorageService.set('songs', allSongs);
                allSongsCache = allSongs;
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
            allSongsCache = allSongs;
            localStorageService.set('songs', allSongs);
            deferred.promise.then(function(newAllSongs) {
                onChangeInAllSongs(newAllSongs, true);
            });
            deferred.resolve(allSongs);

            return deferred.promise;
        };

        var findSongInList = function(song, songList) {
            var index = findSongIndexInList(song, songList);
            if(index > -1) {
                return songList[index];
            }
            return false;
        };
        var findSongIndexInList = function(song, songList) {
            for(var i=0; i<songList.length; i++) {
                if(songList[i].name === song.name) {
                    return i;
                }
            }
            return -1;
        };

        var subscribeToChangeInAllSongs = function(callback) {
            changeInAllSongsSubscribers.push(callback);
            callback(allSongsCache);
        };

        var unsubscribeToChangeInAllSongs = function(callback) {
            changeInAllSongsSubscribers = _.without(changeInAllSongsSubscribers, callback);
        };

        var onChangeInAllSongs = function(newAllSongs, deletedSong) {
            angular.forEach(changeInAllSongsSubscribers, function(callback) {
                callback(newAllSongs, deletedSong);
            });
        };

        var getUniqueName = function(otherName) {
            var song = { name: otherName };
            var allSongs = localStorageService.get('songs') || [];
            while(findSongInList(song, allSongs)) {
                song.name += ' (1)';
            }
            return song.name;
        };

        return {
            getSongs: getSongs,
            saveSong: saveSong,
            deleteSong: deleteSong,
            subscribeToChangeInAllSongs: subscribeToChangeInAllSongs,
            unsubscribeToChangeInAllSongs: unsubscribeToChangeInAllSongs,
            getUniqueName: getUniqueName
        };
    });