app.controller('MainCtrl', ['$scope', 'hotels', function($scope, hotels) {

    $scope.hotels = [];
    $scope.hotelsCache = [];

    hotels.getHotels()
        .then(function(res) {
            console.log(res);
            $scope.hotels = res.data;
            $scope.hotelsCache = res.data;
        });
        
}]);