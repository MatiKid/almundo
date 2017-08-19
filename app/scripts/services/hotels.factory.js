app.factory('hotels', ['$http' ,function($http) {

    this.getHotels = function() {
        return $http.get('scripts/hotels.json');
    }

    return {
        getHotels: this.getHotels
    };
}]);