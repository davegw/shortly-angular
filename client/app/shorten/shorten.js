angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.newLink = {url: ""};
  $scope.addLink = function() {
    $scope.loading = true;
    $scope.ShowError = false;
    Links.create($scope.newLink)
      .then(function(response){
        $scope.loading = false;
        $scope.link = response.data;
      })
      .catch(function(error){
        $scope.ShowError = error.statusText;
        $scope.loading = false;
      });
  };
});
