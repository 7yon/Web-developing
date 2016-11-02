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

})
.controller('gameController',function($scope,$log,$rootScope,$interval, $timeout,$http){

    $scope.pokemons=null;   
    $scope.currentLevel=1;
    $scope.end=false;
    $scope.health=100;
    $scope.score=0;
    $scope.counter = 30;
    var mytimeout = null; 

    $http.get("?controller=pokemon")
    .success(function(response) {
        $scope.pokemons = response;
    });

    $scope.start = function(){
        console.log("start");
      $scope.$broadcast('startMove', $scope.pokemons[$scope.currentLevel-1]);
    };

    $scope.stop = function(){
      $scope.$broadcast('stopMove',{});
    };

    $scope.startGame=function(){
        console.log("startGame");
        if($scope.currentLevel <= $scope.pokemons.length){
            alert("Level "+ $scope.currentLevel);
            $scope.start();
            $scope.currentLevel++;
            $scope.end=false;
        } else {
            $scope.end=true;
            $scope.stopTimer();
        }
    };

    $scope.postUser=function(){
        var person = prompt("Game over! Enter your name here, please", "Your name");

        $http({
            method: 'POST',
            url: 'http://localhost/?controller=user',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},//application/json {"id": "3", "name": 'Julia', "score":"80"}
            data: {id: "3", name: 'Julia', score:"80"}
            })
            .success(function(data, status, headers, config, url){
                //alert("ok");
                // console.log(data);
                // console.log(url);
                // console.log(status);
                // console.log(headers);
                // console.log(config);
                //alert(url+"ok");
        });
    };

    //Скрываем кнопку START
    $scope.block = function($nameElement){
        document.getElementById($nameElement).style.visibility = "hidden";
    };

    $scope.unblock=function($nameElement){
        document.getElementById($nameElement).style.visibility = "visible";
    };


    $scope.onTimeout = function() {
        console.log("onTimeout");
        if($scope.counter ===  0) { //если на таймере 0
            if($scope.score==0){//если 0 очков
                $scope.unblock('startButton');
                $scope.stopTimer();
                return;
            }
            else {//если очков больше, чем 0
                if($scope.end){//если это конец и уровней больше нет
                    $scope.unblock('startButton');
                    $scope.postUser();
                    $scope.stop();
                    return;
                }
                else{//если остались не пройденные уровни
                    console.log("onTimeout level 2");
                    $scope.end=false;
                    $scope.$broadcast('timer-stopped', $scope.counter);
                    $scope.counter = 30;
                    $timeout.cancel(mytimeout);

                    $scope.startTimer();//запускаем счетчик заново
                    return;
                }
            }
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.startTimer = function() {
        if(!$scope.end){//если не все уровни пройдены или не нажата кнопка finish
            console.log("startTimer");
            $scope.block('startButton');
            $scope.health=100;
            mytimeout = $timeout($scope.onTimeout, 1000);
            $scope.startGame();
        }
        else {
            $scope.stopTimer();
        }
    };

    $scope.stopTimer = function() {  
        if($scope.score==0){//если 0 очков
            alert("You lose");
        }
        else {
            $scope.postUser();
        }
        $scope.unblock('startButton');
        $scope.stop();
        $scope.currentLevel=1;
        $scope.end=false;
        $scope.health=100;
        $scope.score=0;
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 30;
        $timeout.cancel(mytimeout);
    };

    $scope.changeScore=function($power){

        if($scope.health==0){
            $scope.stopTimer();
        }
        else {
            if($scope.counter>20){
                $scope.health--;
                $scope.score=$power*(3+30-$scope.counter)*0.1;
            }
            else
            {
                if($scope.counter>10){
                    $scope.health=$scope.health-3;
                    $scope.score=$power*(3+30-$scope.counter)*0.2;
                }
                else {
                    $scope.health=$scope.health-7;
                    $scope.score=$power*(3+30-$scope.counter)*0.3;
                }
            }
        }
    };

    $scope.$on('changeScore',function(event, data){
       $scope.changeScore(data);
       console.log(data);
     });

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
.directive("pokemon", ['$interval', '$timeout', function($interval, $timeout, $scope, $log,$http){

        return {
            templateUrl:'assets/directives/pokemon.html',
            restrict: 'E',
            replace: true,
            link:function($scope){
            $scope.ballPos={'X':0,'Y':0};
            var tictac, tic=0;
            var level=0;

            $scope.startMove=function(){
                console.log("startMove");

                tictac=$interval(function(){
                    tic++;
                    $scope.ballPos.X=50*Math.sin(tic/50);
                    $scope.ballPos.Y=20*Math.cos(tic/20);
                },15*level*$scope.speed/20);  
                //alert("START");
            };

            $scope.stopMove=function(){
                console.log("stopMove");
                $interval.cancel(tictac);
            };

            $scope.speed=0;
            $scope.power=0;
            $scope.size={'width':100,'height':100};
            $scope.name="";
            $scope.img="./img/pokeball.png";
      
            $scope.$on('startMove',function(event, data){
                $scope.ballPos={'X':0, 'Y':0};
                tictac=0;
                tic=0;
                console.log("startMoveOn"+data.speed);
                level++;
                console.log(level);
                $scope.speed=data.speed;
                $scope.power=data.power;
                $scope.size={'width':100,'height':100};
                $scope.name=data.name;
                $scope.img=data.image;

                $scope.startMove();
             });

            $scope.$on('stopMove',function(event, data){
                console.log("OnStopMove");
               $scope.stopMove();
             });
            },
            controller: function($scope,$http){

                $scope.clickPokemon=function(){
                    console.log("clickToPokemon");
                    $scope.$emit('changeScore', $scope.power);
                };             
            }
        }
}])