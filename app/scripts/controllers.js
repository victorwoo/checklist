/**
 * Created by Victor on 2015/4/10.
 */
(function () {
  angular
    .module('starter')
    .controller('ListCtrl', ListCtrl)
    .controller('DetailCtrl', DetailCtrl);

  ListCtrl.$inject = ['$rootScope', '$state', 'checklistRepo', '$translate'];

  /* @ngInject */
  function ListCtrl($rootScope, $state, checklistRepo, $translate) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.toggleEdit = toggleEdit;
    vm.add = add;
    vm.moveChecklist = moveChecklist;
    vm.remove = remove;
    vm.getUnfinished = getUnfinished;
    vm.isInProgress = isInProgress;

    activate();

    ////////////////

    function activate() {
      vm.isEditing = false;
      vm.checklists = checklistRepo.loadAll();
    }

    function toggleEdit() {
      vm.isEditing = !vm.isEditing;
    }

    function add() {
      $state.go('detail');
    }

    function moveChecklist(item, fromIndex, toIndex) {
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

    function getUnfinished(checklist) {
      var unfinished = checklist.checkpoints.filter(function(checkpoint) {
        return !checkpoint.isDone;
      });
      return unfinished.length;
    }

    function isInProgress(checklist) {
      var anyUnfinished = checklist.checkpoints.some(function(checkpoint){
        return !checkpoint.isDone;
      });
      var allDone = checklist.checkpoints.every(function(checkpoint){
        return checkpoint.isDone;
      });

      return anyUnfinished && !allDone;
    }
  }

  DetailCtrl.$inject = ['$scope', '$rootScope', '$stateParams', '$ionicActionSheet', '$translate', 'checklistRepo'];

  /* @ngInject */
  function DetailCtrl($scope, $rootScope, $stateParams, $ionicActionSheet, $translate, checklistRepo) {
    var id = parseInt($stateParams.id);

    /* jshint validthis: true */
    var vm = this,
      currentTranslations;


    vm.activate = activate;
    vm.edit = edit;
    vm.toggleDeleteAndReorder = toggleDeleteAndReorder;
    vm.reorderCheckpoint = reorderCheckpoint;
    vm.addCheckpoint = addCheckpoint;
    vm.reuse = reuse;
    vm.toggleCheck = toggleCheck;

    activate();

    ////////////////

    function updateTranslations(callback) {
      $translate(['REUSE', 'CANCEL', 'REUSE_DETAILED']).then(function (translations) {
        currentTranslations = translations;
        if (callback) {
          callback();
        }
      });
    }

    function activate() {
      vm.isDeletingAndReordering = false;
      vm.newCheckpointTitle = '';

      vm.checklist = checklistRepo.getById(id);
      if (vm.checklist) {
        // 编辑原有待办清单
        vm.isEditing = false;
        vm.isAdding = false;
      } else {
        // 新增待办清单
        vm.isEditing = true;
        vm.isAdding = true;
        vm.checklist = {
          title: '',
          checkpoints: []
        }
      }

      $scope.$on('$ionicView.beforeLeave', function () {
        if (vm.isAdding) {
          checklistRepo.add(vm.checklist);
        }
        checklistRepo.saveAll();
      });

      $rootScope.$on('$translateChangeSuccess', function () {
        updateTranslations();
      });

      updateTranslations(function () {
        //console.log('updateTranslations');
      });
    }

    function edit() {
      vm.isEditing = !vm.isEditing;
      vm.isDeletingAndReordering = false;
    }

    function toggleDeleteAndReorder() {
      if (vm.isDeletingAndReordering) {
        checklistRepo.saveAll();
      }
      vm.isDeletingAndReordering = !vm.isDeletingAndReordering;
    }

    function reorderCheckpoint(checkpoint, fromIndex, toIndex) {
      vm.checklist.checkpoints.splice(fromIndex, 1);
      vm.checklist.checkpoints.splice(toIndex, 0, checkpoint);

      checklistRepo.saveAll();
    }

    function addCheckpoint(title) {
      vm.checklist.checkpoints.unshift({
        title: title,
        isDone: false
      });
      checklistRepo.saveAll();
      vm.newCheckpointTitle = '';
    }

    function reuse() {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: currentTranslations.REUSE}
        ],
        titleText: currentTranslations.REUSE_DETAILED,
        cancelText: currentTranslations.CANCEL,
        buttonClicked: function (index) {
          console.log(index);
          switch (index) {
            case 0:
              vm.checklist.checkpoints.forEach(function (checkpoint) {
                checkpoint.isDone = false;
              });
              break;
          }
          return true;
        }
      });
    } // of reuse();

    function toggleCheck(checkpoint){
      checklistRepo.saveAll();
    }
  } // of DetailCtrl();
}());
