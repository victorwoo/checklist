/**
 * Created by Victor on 2015/4/10.
 */
(function(){
  angular
    .module('starter')
    .controller('ListCtrl', ListCtrl)
    .controller('DetailCtrl', DetailCtrl)
    .controller('EditCtrl', EditCtrl);

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
    vm.activate = activate;
    vm.edit = edit;

    activate();

    ////////////////

    function activate() {
      //checklistRepo.init();
      vm.checklist = checklistRepo.getById(id);
    }

    function edit() {
      $state.go('edit', {id: id});
    }
  }

  EditCtrl.$inject = ['$scope', '$state','$stateParams', '$ionicModal', 'checklistRepo'];

  /* @ngInject */
  function EditCtrl($scope, $state, $stateParams, $ionicModal, checklistRepo) {
    var id = parseInt($stateParams.id);

    /* jshint validthis: true */
    var vm = this;
    vm.submitTitle = submitTitle;

    vm.activate = activate;
    vm.toggleReorder = toggleReorder;
    vm.enterEdit = enterEdit;

    activate();

    ////////////////

    function activate() {
      var checklist = checklistRepo.getById(id);
      if (!checklist) {
        checklist = {
          id: checklistRepo.nextChecklistId(),
          title: '新建清单',
          checkpoints: []
        }
      }
      vm.checklist = checklist;
      initModal();

      // 初始化模态框设置。
      function initModal() {
        $ionicModal.fromTemplateUrl('templates/edit-checkpoint-title.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          vm.modal = modal;
        });
        vm.openModal = function () {
          vm.modal.show();
        };
        vm.closeModal = function () {
          vm.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
          vm.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
          // Execute action
        });
      }
    }

    vm.updateCheckpoint = function(checkpoint) {
      console.log(checkpoint);
      vm.modal.hide();
    };

    // 整个要改
    function submitTitle() {
      // TODO 合法性判断，禁止提交相同名字的标题。
      vm.isEditingTitle = false;
      checklistRepo.saveAll();
    }

    function toggleReorder(){
      vm.isReordering = !vm.isReordering;
    }

    function enterEdit(checkpoint) {
      console.log(checkpoint);
      vm.editingCheckpoint = checkpoint;
      vm.openModal();
    }
  }
}());

