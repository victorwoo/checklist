/**
 * Created by Victor on 2015/4/10.
 */
(function () {
  angular
    .module('starter')
    .factory('checklistRepo', checklistRepo);

  function checklistRepo($translate, $http, localStorageService) {
    var checklists;

    return {
      loadAll: loadAll,
      saveAll: saveAll,
      getById: getById,
      save: save,
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

    // TODO 还未测试
    function save (item) {
      var matched;
      if (!checklists) {
        checklists = loadAll();
      }
      if (item.id !== null && item.id !== undefined) {
        // update
        checklists = checklists.map(function (checklist) {
          return checklist.id === item.id ? item : checklist;
        });
      } else {
        // insert
        item.id = nextChecklistId();
        checklists.unshift(item);
      }
      saveAll(checklists);
    }

    function add(item) {
      checklists.unshift(item);
      saveAll();
    }

    function remove(item) {

    }

    function insertSampleData(callback) {
      $translate(['SAMPLE_PATH'])
        .then(function (translations) {
          var samplePath = translations.SAMPLE_PATH;
          $http.get(samplePath).
            success(function(data, status, headers, config) {
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
