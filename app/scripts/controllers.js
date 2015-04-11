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

    vm.title = 'Checklist';
    vm.isEditing = false;

    vm.activate = activate;
    vm.toggleEdit = toggleEdit;
    vm.add = add;
    vm.moveItem = moveItem;
    vm.remove = remove;

    activate();

    ////////////////

    function activate() {
      //checklistRepo.init();
      vm.checklists = checklistRepo.loadAll();
    }

    function toggleEdit() {
      vm.isEditing = !vm.isEditing;
    }

    function add() {
      $state.go('detail');
    }

    function moveItem (item, fromIndex, toIndex) {
      //Move the item in the array
      vm.checklists.splice(fromIndex, 1);
      vm.checklists.splice(toIndex, 0, item);
      checklistRepo.saveAll(vm.checklists);
    }

    function remove(item) {
      var index = vm.checklists.indexOf(item);
      vm.checklists.splice(index, 1);
      checklistRepo.saveAll(vm.checklists);
    }
  }

  DetailCtrl.$inject = [];

  /* @ngInject */
  function DetailCtrl(id) {
    console.log('DetailCtrl()')
  }
}());

