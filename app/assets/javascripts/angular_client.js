// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
angular.module('calculator_app', ['ng-rails-csrf'])
    .controller('calculator_controller', function($scope ,$http) {
        $scope.commands = [];
        $scope.result ='';

        $scope.calculate = function() {
            var url ='/api/calculator_update';
            var data = {"command" : $scope.command};
            var result = $scope.result;

            $http({method: 'PUT', url: url, data: data}).
                success(successHandler).
                error(errorHandler);
            $scope.commands.push($scope.command);
        };

        var errorHandler = function(data, status){

            if (status == 404) {
                $scope.result = 'calculator not available';
            }

            if (status == 401){
                $scope.result = 'user not logged in';
            }

        };

        var successHandler = function(data, status){


            $scope.result =data.state;

        };
    });