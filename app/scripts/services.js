/**
 * Created by Victor on 2015/4/10.
 */
(function () {
  'use strict';

  angular
    .module('starter')
    .factory('checklistRepo', checklistRepo);

  /* @ngInject */
  function checklistRepo($translate, $http, localStorageService) {
    var checklists;

    return {
      loadAll: loadAll,
      saveAll: saveAll,
      getById: getById,
      add: add,
      remove: remove,
      nextChecklistId: nextChecklistId,
      insertSampleData: insertSampleData
    };

    ////////////////////////////////////

    function loadAll () {
      checklists = localStorageService.get('checklists');
      return checklists;
    }

    function saveAll (newChecklists) {
      if (newChecklists) {
        checklists = newChecklists;
      }
      localStorageService.set('checklists', checklists);
    }

    function getById (id) {
      var matched;
      if (!checklists) {
        checklists = loadAll();
      }
      matched = checklists.filter(function (item) {
        return item.id === id;
      });
      return matched.length ? matched[0] : null;
    }

    function nextChecklistId () {
      var maxId = 0;
      if (!checklists) {
        checklists = loadAll();
      }
      checklists.forEach(function (checklist) {
        if (checklist.id > maxId) {
          maxId = checklist.id;
        }
      });
      return maxId;
    }

    function add(item) {
      checklists.unshift(item);
      saveAll();
    }

    function remove(item) {
      var index = checklists.indexOf(item);
      if (index >= 0){
        checklists.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }

    function insertSampleData(callback) {
      $translate(['SAMPLE_PATH'])
        .then(function (translations) {
          var samplePath = translations.SAMPLE_PATH;
          $http.get(samplePath).
            success(function(data, status, headers, config) { // jshint ignore:line
              // this callback will be called asynchronously
              // when the response is available
              saveAll(data);
              callback(null, data);
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.error(data, status, headers, config);
              callback({
                data: data,
                status: status,
                headers: headers,
                config: config
              });
            });
        });
    }
  }
}());
