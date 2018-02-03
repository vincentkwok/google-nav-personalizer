'use strict';

(function($, chrome) {
  $(document).ready(function() {
    $('#sortable').sortable({
        revert: true,
        update: function(event, ui) {
            var resultArray = $(this).sortable('toArray');
            chrome.storage.sync.set({ 'google-nav-bar-order': resultArray }, function() {
                // TODO: message about saved
                console.log('saved');
            });
        }
    });
  });

})(jQuery, chrome);