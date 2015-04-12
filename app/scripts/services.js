/**
 * Created by Victor on 2015/4/10.
 */
(function () {
  angular
    .module('starter')
    .factory('checklistRepo', checklistRepo);

  function checklistRepo(localStorageService) {
    var checklists;
    var init = function () {
      localStorageService.set('checklists', [{
        id: 0,
        title: '出差',
        checkpoints: [
          '身份证',
          '衣服'
        ]
      }, {
        id: 1,
        title: '羽毛球',
        checkpoints: [
          '球拍',
          '毛巾'
        ]
      }]);
    };

    var loadAll = function () {
      checklists = localStorageService.get('checklists');
      return checklists;
    };

    var saveAll = function (newChecklists) {
      if (newChecklists) {
        checklists = newChecklists;
      }
      localStorageService.set('checklists', checklists);
    };

    var getById = function (id) {
      var checklists, matched;
      checklists = loadAll();
      matched = checklists.filter(function (item) {
        return item.id === id;
      });
      return matched.length ? matched[0] : null;
    };

    var nextChecklistId = function() {
      var maxId = 0,
        checklists;
      checklists = loadAll();
      checklists.forEach(function(checklist){
        if (checklist.id > maxId) {
          maxId = checklist.id;
        }
      });
      return maxId;
    };

    // TODO 还未测试
    var save = function (item) {
      var checklists, matched;
      checklists = loadAll();
      if (item.id !== null && item.id !== undefined) {
        // update
        checklists = checklists.map(function(checklist) {
          return checklist.id === item.id ? item : checklist;
        });
      } else {
        // insert
        item.id = nextChecklistId();
        checklists.unshift(item);
      }
      saveAll(checklists);
    };

    var remove = function (item) {

    };

    return {
      init: init,
      loadAll: loadAll,
      saveAll: saveAll,
      getById: getById,
      save: save,
      remove: remove,
      nextChecklistId: nextChecklistId
    };
  }
}());
