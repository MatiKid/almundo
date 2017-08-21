app.filter('byPriceRange', function() {
    return function(hotels, minMax) {
        var filtered = [],
            min = minMax[0],
            max = minMax[1];

        hotels.forEach(function(hotel) {
            if (hotel.rate.price.per_night >= min && hotel.rate.price.per_night <= max) {
                filtered.push(hotel);
            }
        });

        return filtered;
    };
})