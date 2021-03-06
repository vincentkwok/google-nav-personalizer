'use strict';

(function($, URI, chrome) {
  $(document).ready(function() {
    // const
    var TBM_VIDEO = 'vid';
    var TBM_IMAGE = 'isch';
    var TBM_NEWS = 'nws';

    var DEFAULT_NAV_BAR_ORDER = ['sortable-images', 'sortable-maps', 'sortable-videos', 'sortable-news'];

    var imageTab, videoTab, newsTab, mapTab;

    var menu = $('#hdtb-msb-vis');
    var selectedTab;

    chrome.storage.sync.get({
      'google-nav-bar-order': DEFAULT_NAV_BAR_ORDER
    }, function(optionOrder) {
      classifyTabs(menu);
      reorder(menu, resolveOrder(optionOrder['google-nav-bar-order']));
    });

    /* 
     * As private functions 
     */
    function classifyTabs(menu) {
      var aTabs = menu.find('a.q.qs');
      selectedTab = menu.find('div.hdtb-msel').first();

      aTabs.each(function() {
        var aTab = $(this);
        var divTab = aTab.parent();
        
        var url = new URI(aTab.attr('href'));
        if (url.subdomain() === 'maps') {
          mapTab = divTab;
        } else {
          var qs = url.search(true);
          switch (qs.tbm) {
            case TBM_VIDEO:
              videoTab = divTab;
              break;
            case TBM_IMAGE:
              imageTab = divTab;
              break;
            case TBM_NEWS:
              newsTab = divTab;
              break;
          }
        }
      });
    }

    function resolveOrder(optionOrder) {
      return optionOrder.reduce(function(accumulator, currentValue) {
        var item = resolveOrderItem(currentValue);
        accumulator.push(item);
        return accumulator;
      }, []);
    }

    function resolveOrderItem(currentValue) {
      // TODO: handle default
      switch(currentValue) {
          case 'sortable-images':
            return imageTab || selectedTab;
          case 'sortable-maps':
            return mapTab || selectedTab;
          case 'sortable-videos':
            return videoTab || selectedTab;
          case 'sortable-news':
            return newsTab || selectedTab;
        };
    }

    function reorder(menu, order) {
      var allTab = menu.children().first();
      var finalOrder = [allTab].concat(order);

      menu.children().remove();
      menu.prepend(finalOrder);
    }
  });
})(jQuery, URI, chrome);