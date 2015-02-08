'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.game'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/game'});
}])

.controller('MainCtrl', function($scope, $http, $location) {
	$scope.viewModel = 'game';
    $scope.server = "http://"+location.host;

    $scope.$watch('viewModel', function(value) {
    	console.log("Go to " + value);
    });

});
