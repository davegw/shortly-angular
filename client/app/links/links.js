angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here

  $scope.data = {};
  $scope.getLinks = function(){
    Links.get()
      .then(function(response) {
        $scope.data.links = response.data;
        console.log($scope.data);
      });
  };

  $scope.getLinks();
});

