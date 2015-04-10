/**
 * Created by Victor on 2015/4/10.
 */
(function(){
  angular
    .module('starter')
    .controller('ListCtrl', ListCtrl)
    .controller('DetailCtrl', DetailCtrl);

  ListCtrl.$inject = ['$state', 'checklistRepo'];

  /* @ngInject */
  function ListCtrl($state, checklistRepo) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = 'ListCtrl title!';
    vm.isEditing = false;

    vm.activate = activate;
    vm.toggleEdit = toggleEdit;
    vm.add = add;
    vm.moveItem = moveItem;
    vm.remove = remove;

    //vm.checklists = [{
    //  id: 0,
    //  name: '出差',
    //  items: [
    //    '身份证',
    //    '衣服'
    //  ]
    //}, {
    //  id: 1,
    //  name: '游泳',
    //  items: [
    //    '球拍',
    //    '毛巾'
    //  ]
    //}];

    activate();

    ////////////////

    function activate() {
      //checklistRepo.init();
      vm.checklists = checklistRepo.load();
    }

    function toggleEdit() {
      vm.isEditing = !vm.isEditing;
    }

    function add() {
      $state.go('detail');
    }

    function moveItem (item, fromIndex, toIndex) {
      //Move the item in the array
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    }

    function remove(item) {
      var index = vm.checklists.indexOf(item);
      vm.checklists.splice(index, 1);
    }
  }

  DetailCtrl.$inject = [];

  /* @ngInject */
  function DetailCtrl(id) {
    console.log('DetailCtrl()')
  }
}());

