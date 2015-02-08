'use strict';
//create a new angular module bepending on ngRoute, leaflet-directive, nvd3 and mycharts
angular.module('myApp.settings', ['ngRoute','leaflet-directive', 'ui.bootstrap'])

//configue the $routeProvider, that if the /view1 url is called that View1Ctrl is the current controller
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
	templateUrl: 'settings/settings.html',
	controller: 'settingsCtrl'
  });
}])

/*
	create a new controller View1Ctrl, which needs "$http", $scope", "$compile" and "leafletData" instances
*/
.controller('settingsCtrl', [ "$scope", "leafletData", "$http", function($scope, leafletData, $http) {


    $scope.playername = "";
    $scope.selectedPlayer = null;

    $scope.insertPlayer = function () {
        if($scope.playername == "") {
            alert("Please enter a name for the player");
            return;
        }
        $scope.$parent.players.push($scope.playername);
    }

    $scope.deletePlayer = function() {
        if($scope.selectedPlayer == null) {
            alert("Please selecte a player");
            return;
        }
        if($scope.$parent.players.length ==2) {
            alert("Two players minimum!");
            return;
        }
        var index = $scope.$parent.players.indexOf($scope.selectedPlayer);

        if (index > -1) {
            $scope.$parent.players.splice(index, 1);
        }
    }

}]);

