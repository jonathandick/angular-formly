'use strict';

/**
 * @ngdoc function
 * @name angularFormlyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularFormlyApp
 */
angular.module('angularFormlyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
