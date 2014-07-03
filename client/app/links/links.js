

var app = angular.module('shortly.links', []);

app.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};
  $scope.getLinks = function(){
    Links.get()
      .then(function(response) {
        $scope.data.links = response.data;
      });
  };
  $scope.addVisit = function(link){
    link.visits++;
  };


  $scope.getLinks();
});
