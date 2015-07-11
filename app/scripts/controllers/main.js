'use strict';

/**
 * @ngdoc function
 * @name angularFormlyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFormlyApp
 */
angular.module('angularFormlyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
