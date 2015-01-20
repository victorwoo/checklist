'use strict';
angular.module('CheckList.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('TemplatesCtrl', function($scope, Templates) {
  $scope.templates = Templates.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('TemplateDetailCtrl', function($scope, $stateParams, Templates) {
  $scope.template = Templates.get($stateParams.templateId);
})

.controller('AccountCtrl', function($scope) {
});
