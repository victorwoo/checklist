/**
 * Created by Victor on 2015/4/10.
 */
(function() {
  angular
    .module('starter')
    .factory('checklistRepo', checklistRepo);

  function checklistRepo(localStorageService) {
    var init = function() {
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

    var load = function() {
      return localStorageService.get('checklists');
    };

    var save = function(checklists) {
      localStorageService.set('checklists', checklists);
    };

    return {
      init: init,
      load: load,
      save: save
    };
  }
}());
