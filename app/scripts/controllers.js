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
    vm.moveChecklist = moveChecklist;
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

    function moveChecklist (item, fromIndex, toIndex) {
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

  DetailCtrl.$inject = ['$state','$stateParams', 'checklistRepo'];

  /* @ngInject */
  function DetailCtrl($state, $stateParams, checklistRepo) {
    var id = parseInt($stateParams.id);

    /* jshint validthis: true */
    var vm = this;

    vm.isEditingTitle = false; // TODO 设置焦点
    vm.submitTitle = submitTitle;
    vm.activate = activate;

    activate();

    ////////////////

    function activate() {
      //checklistRepo.init();
      var checklist = checklistRepo.getById(id);
      if (!checklist) {
        checklist = {
          id: checklistRepo.nextChecklistId(),
          title: '新建清单',
          checkpoints: []
        }
      }
      vm.checklist = checklist;
    }

    function submitTitle() {
      // TODO 合法性判断，禁止提交相同名字的标题。
      vm.isEditingTitle = false;
      checklistRepo.saveAll();
    }
  }
}());

