'use strict';
module.exports = function(app) {
  var hotelList = require('../controllers/hotelsListController');

  app.route('/hotels')
    .get(hotelList.list_all_hotels)
    .post(hotelList.create_a_hotel);

  app.route('/hotels/:hotelId')
    .get(hotelList.read_a_hotel)
    .put(hotelList.update_a_hotel)
    .delete(hotelList.delete_a_hotel);
};