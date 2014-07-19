angular.module('shortly.link.controller', [])

.controller('LinkController', function AppCtrl ($scope, $http, Links, $stateParams, $timeout, $location) {

  $scope.config = {
    title: 'Visits',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      position: 'right'
    }
  };

  $scope.setGraph = function(){
    $scope.data = {
      series: [' Visits Per Day'],
      data : [
        {
          x: "Sunday",
          y: [0]
        },{
          x: "Monday",
          y: [0]
        },{
          x: "Tuesday",
          y: [0]
        },{
          x: "Wednesday",
          y: [0]
        },{
          x: "Thursday",
          y: [0]
        },{
          x: "Friday",
          y: [0]
        },{
          x: "Saturday",
          y: [0]
        }
      ]
    };
    Links.get()
      .then(function(response){
        var link = _.where(response.data, {code: $stateParams.code});
        $scope.link = link[0];
        var visits = JSON.parse($scope.link.visits);
        console.log(visits)
        _.each(visits, function (item){
          var date = new Date(item)
          $scope.data.data[date.getDay()].y[0]++;
        });

      })
  };

  // On added visit reload graph after pausing for visit count to update.
  $scope.$on('addVisit', function(event, data) {
    $timeout(function() {
      $location.path('/links/' + data.code);
      $scope.setGraph(); // reset graph if staying on same page.
    }, 400)
  });

  $scope.setGraph();
})

