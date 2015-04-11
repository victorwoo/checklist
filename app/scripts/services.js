/**
 * Created by Victor on 2015/4/10.
 */
(function () {
  angular
    .module('starter')
    .factory('checklistRepo', checklistRepo);

  function checklistRepo(localStorageService) {
    var init = function () {
      localStorageService.set('checklists', [{
        id: 0,
        name: '出差',
        items: [
          '身份证',
          '衣服'
        ]
      }, {
        id: 1,
        name: '游泳',
        items: [
          '球拍',
          '毛巾'
        ]
      }]);
    };

    var loadAll = function () {
      return localStorageService.get('checklists');
    };

    var saveAll = function (checklists) {
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
        var maxId = 0;
        checklists.forEach(function(checklist){
          if (checklist.id > maxId) {
            maxId = checklist.id;
          }
        });
        maxId++;
        item.id = maxId;
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
      remove: remove
    };
  }
}());
