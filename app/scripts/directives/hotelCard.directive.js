app.directive('hotelCard', [function() {
    return {
        restrict: 'E',
        scope: {
            hotel: '='
        },
        templateUrl: '../views/hotel-card.html',
        controller: ['$scope', function hotelCardCtrl($scope) {
            $scope.stars = new Array(parseInt($scope.hotel.stars));
            
            $scope.amenitiesIconMap = {
                parking: "fa-car",
                internet: "fa-wifi",
                "fitness-center": "fa-futbol-o",
                "check-in": "fa-check-circle",
                "coffee-shop": "fa-coffee",
                bar: "fa-glass"
            };

        }]
      };
}]);