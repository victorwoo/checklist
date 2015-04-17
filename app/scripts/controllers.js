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


    vm.activate = activate;
    vm.toggleEdit = toggleEdit;
    vm.toggleDeleteAndReorder = toggleDeleteAndReorder;
    vm.reorderCheckpoint = reorderCheckpoint;
    vm.addCheckpoint = addCheckpoint;
    vm.reuse = reuse;

    vm.isDeletingAndReordering = false;
    vm.newCheckpointTitle = '';

    activate();

    ////////////////

    function activate() {
      vm.checklist = checklistRepo.getById(id);
      if (vm.checklist) {
        vm.isEditing = false;
      } else {
        vm.isEditing = true;
        vm.checklist = {
          title: '',
          checkpoints : []
        }
      }
    }

    function toggleEdit() {
      vm.isEditing = !vm.isEditing;
      vm.isDeletingAndReordering = false;
    }

    function toggleDeleteAndReorder() {
      vm.isDeletingAndReordering = !vm.isDeletingAndReordering;
    }

    function reorderCheckpoint(checkpoint, fromIndex, toIndex) {
      vm.checklist.checkpoints.splice(fromIndex, 1);
      vm.checklist.checkpoints.splice(toIndex, 0, checkpoint);
    }

    function addCheckpoint(title){
      vm.checklist.checkpoints.unshift({
        title: title,
        isDone: false
      });
      checklistRepo.saveAll();
      vm.newCheckpointTitle = '';
    }

    function reuse() {
      vm.checklist.checkpoints.forEach(function(checkpoint){
        checkpoint.isDone = false;
      });
    }
  }
}());
