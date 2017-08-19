app.directive('hotelFilters', [function() {
    return {
        restrict: 'E',
        scope: {
            hotels: '=',
            hotelsCache: '='
        },
        templateUrl: '../views/hotel-filters.html',
        controller: ['$scope', '$filter', function hotelCardCtrl($scope, $filter) {
            var lastSearchTerm = '';

            $scope.searchHotelByName = function(searchTerm) {
                console.log(searchTerm.length);
                searchTerm = searchTerm || lastSearchTerm;
                $scope.hotels = $filter('filter')($scope.hotelsCache, { name: searchTerm });
                lastSearchTerm = searchTerm;
            }

            $scope.stars = {all: true, five: false, four: false, three: false, two: false, one: false};

            $scope.filterHotelsByStars = function(allStars) {
                manageStarCheckboxes(allStars);

                $scope.hotels = $filter('filter')($scope.hotelsCache, { stars: [3, 5] });
            }

            var manageStarCheckboxes = function(allStars) {
                if (allStars) {
                    $scope.stars.all = true;
                    $scope.stars.five = false;
                    $scope.stars.four = false;
                    $scope.stars.three = false;
                    $scope.stars.two = false;
                    $scope.stars.one = false;
                } else {
                    if (!$scope.stars.five & !$scope.stars.four & !$scope.stars.three & !$scope.stars.two & !$scope.stars.one) {
                        $scope.stars.all = true;
                    } else if ($scope.stars.five || $scope.stars.four || $scope.stars.three || $scope.stars.two || $scope.stars.one) {
                        $scope.stars.all = false;
                    }
                }
            }

        }]
      };
}]);