'use strict';
//create a new angular module bepending on ngRoute, leaflet-directive, nvd3 and mycharts
angular.module('myApp.game', ['ngRoute','leaflet-directive', 'ui.bootstrap'])

//configue the $routeProvider, that if the /view1 url is called that View1Ctrl is the current controller
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
	templateUrl: 'game/game.html',
	controller: 'gameCtrl'
  });
}])

/*
	create a new controller View1Ctrl, which needs "$http", $scope", "$compile" and "leafletData" instances
*/
.controller('gameCtrl', [ "$scope", "leafletData", "$http", function($scope, leafletData, $http) {

    $scope.rounds = 3;
    $scope.curRound = 1;
    $scope.players = ["Alex", "Jamina"];
    $scope.level = "Europe"; //germany or World
    $scope.playerPoints = [0, 0];
    $scope.requestURL = "http://maps.googleapis.com/maps/api/geocode/json?address=";
    $scope.markers = new Array();
    $scope.playing = true;
    $scope.currentCity = "";
    $scope.currentIndex = 0;
    $scope.usedCities = [];
    $scope.winnermsg =""


    $scope.layers =  {
        baselayers: {            
            tilelayerIMG : {
                name : 'Esri tile layer',
                type: 'xyz',
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'                
            }
        }
    };


    $scope.checkDist = function(){
        if($scope.players.length != $scope.markers.length) {
            alert("Please let all players make a guess");
        }
        var curCity = $scope.citiesEurope[$scope.currentIndex];

        
        var distances = [];

        $scope.markers.forEach(function(marker){
            distances.push(distance(curCity.lat, curCity.lng, marker.lat, marker.lng, "K"))
        });

        var minIndex = distances.indexOf(Math.min.apply(Math, distances));

        $scope.playerPoints[minIndex]++;

        $scope.winnermsg = "The winner is " + $scope.players[minIndex] + " with a distance of " + Math.floor(distances[minIndex]) + " kilometers!";

        $scope.playing = false;

        $scope.markers.push({
            lat: curCity.lat,
            lng: curCity.lng,
            message:  curCity.city,
            draggable: false
        });


    };

    $scope.nextRound = function() {
        if($scope.curRound == $scope.rounds) {
            var winIndex = $scope.playerPoints.indexOf(Math.min.apply(Math, $scope.playerPoints));
            alert("The winner is " + $scope.players[winIndex]);
        }

        $scope.markers = [];

        getRandomCity();

        $scope.curRound++;

        $scope.winnermsg = "";

        $scope.playing = true;
    }



    function getRandomCity() {
        var limit = 0;
        if($scope.level == "Europe") {
            limit = $scope.citiesEurope.length -1;
        }
        //add for world and germany

        var index = 0;
        
        do {
            index = Math.floor(Math.random() * limit);
        } while ($scope.usedCities.indexOf(index) != -1);

        $scope.usedCities.push(index);
        $scope.currentIndex = index;
        var curCity = $scope.citiesEurope[index].city;
        $scope.currentCity = curCity.substring(0, curCity.lastIndexOf(" "));

        
    }


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}                                                                           

    

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false,
            maxZoom: 20,
            minZoom: 1
        },
        berlin: {
            lat: 52.520645,
            lng: 13.409779,
            zoom: 5
        },
        events: {}
    });

    $scope.$on("leafletDirectiveMap.click", function(event, args){
        if($scope.markers.length >= $scope.players.length) {
            return;
        }
        var leafEvent = args.leafletEvent;
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            message:  $scope.players[$scope.markers.length] + "s guess for " + $scope.currentCity,
            draggable: true
        });
    });
	
 
 

    $scope.citiesEurope = [ {
                                city : "Istanbul Turkey",
                                lat : 41.00527,
                                lng : 28.97696 
                            },
                            {
                                city : "London United Kingdom",
                                lat: 51.5073509,
                                lng : -0.1277583
                            },
                            {
                                city : "Saint Petersburg Russia",
                                lat: 59.9342802,
                                lng : 30.3350986
                            },
                            {
                                city : "Berlin Germany",
                                lat: 52.52000659999999,
                                lng : 13.404954
                            },
                            {
                                city : "Madrid Spain",
                                lat: 40.4167754,
                                lng : -3.7037902
                            },
                            {
                                city : "Rome Italy",
                                lat: 41.9027835,
                                lng : 12.4963655
                            },
                            {
                                city : "Kiev Ukraine",
                                lat: 50.4501,
                                lng : 30.5234
                            },
                            {
                                city : "Paris France",
                                lat: 48.856614,
                                lng : 2.3522219
                            },
                            {
                                city : "Minsk Belarus",
                                lat: 53.90453979999999,
                                lng : 27.5615244
                            },
                            {
                                city : "Bucharest Romania",
                                lat: 44.4267674,
                                lng : 26.1025384
                            },
                            {
                                city : "Vienna Austria",
                                lat: 48.2081743,
                                lng : 16.3738189
                            },
                            {
                                city : "Budapest Hungary",
                                lat: 47.497912,
                                lng : 19.040235
                            },
                            {
                                city : "Hamburg Germany",
                                lat: 53.5510846,
                                lng : 9.993681799999999
                            },
                            {
                                city : "Warsaw Poland",
                                lat: 52.2296756,
                                lng : 21.0122287
                            },
                            {
                                city : "Barcelona Spain",
                                lat: 41.3850639,
                                lng : 2.1734035
                            },
                            {
                                city : "Kharkiv Ukraine",
                                lat: 49.9935,
                                lng : 36.230383
                            },
                            {
                                city : "Munich Germany",
                                lat: 48.1351253,
                                lng : 11.5819806
                            },
                            {
                                city : "Milan Italy",
                                lat: 45.4654219,
                                lng : 9.1859243
                            },
                            {
                                city : "Prague Czech Republic",
                                lat: 50.0755381,
                                lng : 14.4378005
                            },
                            {
                                city : "Sofia Bulgaria",
                                lat: 42.6977082,
                                lng : 23.3218675
                            },
                            {
                                city : "Brussels Belgium",
                                lat: 50.8503396,
                                lng : 4.3517103
                            },
                            {
                                city : "Belgrade Serbia",
                                lat: 44.786568,
                                lng : 20.4489216
                            },
                            {
                                city : "Samara Russia",
                                lat: 53.202778,
                                lng : 50.140833
                            },
                            {
                                city : "Kazan Russia",
                                lat: 55.790278,
                                lng : 49.134722
                            },
                            {
                                city : "Birmingham United Kingdom",
                                lat: 52.48624299999999,
                                lng : -1.890401
                            },
                            {
                                city : "Rostov on Don Russia",
                                lat: 47.23333299999999,
                                lng : 39.7
                            },
                            {
                                city : "Ufa Russia",
                                lat: 54.7387621,
                                lng : 55.9720554
                            },
                            {
                                city : "Cologne Germany",
                                lat: 50.937531,
                                lng : 6.9602786
                            },
                            {
                                city : "Volgograd Russia",
                                lat: 48.7,
                                lng : 44.516667
                            },
                            {
                                city : "Dnipropetrovsk Ukraine",
                                lat: 48.464717,
                                lng : 35.046183
                            },
                            {
                                city : "Odessa Ukraine",
                                lat: 46.482526,
                                lng : 30.7233095
                            }
                        ];

    $scope.citiesGermany = [ ];

    $scope.citiesWorld = [];

    getRandomCity();
}]);

