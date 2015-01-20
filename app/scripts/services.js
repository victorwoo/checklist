'use strict';
angular.module('CheckList.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
});

angular.module('CheckList.services').factory('Templates', function() {
  var templates = [
    { id: 0, name: '出差', items: ['身份证', '盥洗包', '酒店会员卡', '移动电源'] },
    { id: 1, name: '骑行', items: ['头盔', '码表', '水壶', '手电', '移动电源'] }
  ];

  return {
    all: function() {
      return templates;
    },
    get: function(templateId) {
      return templates[templateId];
    },
    add: function(template) {
      templates.push(template);
    },
    remove: function(templateId) {
      delete templates.templateId;
    }
  };
});
