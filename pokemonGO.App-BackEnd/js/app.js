"use strict";

var app = angular.module("lection", ["ngRoute", "ngResource"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/page/:id", {
        templateUrl : function(page){
        	return "assets/page-"+page.id+".html"
        },
        controller: "pagesController"
    })
    .otherwise("/page/0");
})
.controller("pagesController",function($scope,$log,$rootScope,$routeParams,$interval, $http){
	$scope.page=parseInt($routeParams.id) || 0;
 	$scope.users=null;
    $scope.names=null;

 	$http.get("?controller=user")
    .success(function(response) {
    	$scope.users = response;
    });

    $http.get("?controller=menu")
    .success(function(response) {
    	$scope.names = response;
    });


	$scope.ballPos={'X':0,'Y':0};
	var tictac, tic=0;

	$scope.start=function(){
		
		tictac=$interval(function(){
			tic++;
			$scope.ballPos.X=50*Math.sin(tic/50);
			$scope.ballPos.Y=20*Math.cos(tic/20);
		},10);	
	};
	$scope.stop=function(){
		$interval.cancel(tictac);
		alert("GAME OVER!");
	};
	
})

.directive("menu", function(){

        return {
            templateUrl:'assets/directives/menu.html',
            restrict: 'E',
            replace: true,
            scope: {
                current: '='
            },
        	controller: function($scope){
			$scope.getStyle=function($item){
				if ($item == $scope.current)				
				 	return "bordActiveLink";
				 else return "bord";             
			};		
		}
	}
})