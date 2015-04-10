/**
 * Created by Victor on 2015/4/10.
 */
//angular.module('starter').controller('ListCtrl', function() {
//
//});
angular
  .module('starter')
  .controller('ListCtrl', ListCtrl);

ListCtrl.$inject = [];

/* @ngInject */
function ListCtrl() {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'ListCtrl title!';
  vm.checklists = ["aa", "bb"];

  activate();

  ////////////////

  function activate() {
  }


}
