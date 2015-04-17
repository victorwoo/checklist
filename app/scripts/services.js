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
          {title: '身份证', isDone: false},
          {title: '衣服', isDone: true},
          {title: '会员卡', isDone: false},
          {title: '充电器', isDone: true}
        ]
      }, {
        id: 1,
        title: '羽毛球',
        checkpoints: [
          {title: '球拍', isDone: true},
          {title: '毛巾', isDone: false}
        ]
      }]);
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
      var checklists, matched;
      checklists = loadAll();
      matched = checklists.filter(function (item) {
        return item.id === id;
      });
      return matched.length ? matched[0] : null;
    }

    function nextChecklistId () {
      var maxId = 0,
        checklists;
      checklists = loadAll();
      checklists.forEach(function (checklist) {
        if (checklist.id > maxId) {
          maxId = checklist.id;
        }
      });
      return maxId;
    }

    // TODO 还未测试
    function save (item) {
      var checklists, matched;
      checklists = loadAll();
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

    function remove(item) {

    }
  }
}());
