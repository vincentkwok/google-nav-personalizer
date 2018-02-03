'use strict';

(function($, chrome) {
  $(document).ready(function() {
    // const
    var SORTABLE_IMAGES_ITEM_ID = 'sortable-images';
    var SORTABLE_MAPS_ITEM_ID = 'sortable-maps';
    var SORTABLE_VIDEOS_ITEM_ID = 'sortable-videos';
    var SORTABLE_NEWS_ITEM_ID = 'sortable-news';

    var SORTABLE_IMAGES_ITEM = $('#' + SORTABLE_IMAGES_ITEM_ID);
    var SORTABLE_MAPS_ITEM = $('#' + SORTABLE_MAPS_ITEM_ID);
    var SORTABLE_VIDEOS_ITEM = $('#' + SORTABLE_VIDEOS_ITEM_ID);
    var SORTABLE_NEWS_ITEM = $('#' + SORTABLE_NEWS_ITEM_ID);

    var DEFAULT_NAV_BAR_ORDER = [SORTABLE_IMAGES_ITEM_ID, SORTABLE_MAPS_ITEM_ID, SORTABLE_VIDEOS_ITEM_ID, SORTABLE_NEWS_ITEM_ID];

    chrome.storage.sync.get({
        'google-nav-bar-order': DEFAULT_NAV_BAR_ORDER
    }, function(optionOrder) {
        initByOptionOrder(optionOrder['google-nav-bar-order']);

        $('#sortable').sortable({
            revert: true,
            cursor: 'move',
            update: function(event, ui) {
                var resultArray = $(this).sortable('toArray');
                chrome.storage.sync.set({ 'google-nav-bar-order': resultArray }, function() {
                    // TODO: message about saved
                    console.log('saved');
                });
            }
        });
    });

    function initByOptionOrder(optionOrder) {
        console.log('optionOrder', optionOrder);
        var orderItems = optionOrder.reduce(function(accumulator, currentValue) {
            var item = resolveOrderItem(currentValue);
            accumulator.push(item);
            return accumulator;
        }, []);

        $('#sortable').prepend(orderItems);
    }

    function resolveOrderItem(currentValue) {
        // TODO: handle default
        switch(currentValue) {
            case SORTABLE_IMAGES_ITEM_ID:
                return SORTABLE_IMAGES_ITEM;
            case SORTABLE_MAPS_ITEM_ID:
                return SORTABLE_MAPS_ITEM;
            case SORTABLE_VIDEOS_ITEM_ID:
                return SORTABLE_VIDEOS_ITEM;
            case SORTABLE_NEWS_ITEM_ID:
                return SORTABLE_NEWS_ITEM;
        }
    }

  });
})(jQuery, chrome);
