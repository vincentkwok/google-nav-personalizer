'use strict';

(function($, URI) {
  $(document).ready(function() {
    // const
    var TBM_VIDEO = 'vid';
    var TBM_IMAGE = 'isch';
    var TBM_NEWS = 'nws';

    var imageTab, videoTab, newsTab, mapTab;

    var menu = $('#hdtb-msb-vis');
    classifyTabs(menu);

    // TODO: add UI to modify
    var orderAfterAllTab = [imageTab, mapTab, videoTab, newsTab];
    reorder(menu, orderAfterAllTab);

    /* 
     * As private functions 
     */
    function classifyTabs(menu) {
      var aTabs = menu.find('a.q.qs');

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

    function reorder(menu, order) {
      var allTab = menu.children().first();
      var finalOrder = [allTab].concat(order);

      menu.children().remove();
      menu.prepend(finalOrder);
    }
  });
})(jQuery, URI);