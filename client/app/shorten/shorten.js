angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {url: ""};
  $scope.addLink = function() {
    $scope.loading = true;
    Links.create($scope.link)
      .then(function(response){
        $scope.loading = false;
        $scope.newLink = response.data;
      });
  };
});
