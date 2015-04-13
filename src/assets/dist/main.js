(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _Papi = require('./packages/papi/lib/main');

var _Papi2 = _interopRequireWildcard(_Papi);

//import './packages/papi-properties/'
//import './properties/color';
//
console.log(_Papi2['default']);

},{"./packages/papi/lib/main":3}],2:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
//import $ from 'jquery';

var Core = (function () {
  function Core() {
    _classCallCheck(this, Core);
  }

  _createClass(Core, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      $('.papi-box-list > li > p').on('click', this.redirect);
      $('input[name="add-new-page-search"]').on('keyup', this.search);
      $('[data-papi-href]').on('click touchstart', this.redirect);
      this.setEqualBoxHeights();
      this.setSelectedMenuItem();
      this.addCurrentClassToMenuItem();
    }
  }, {
    key: 'addCurrentClassToMenuItem',

    /**
     * Add current class to menu item.
     */

    value: function addCurrentClassToMenuItem() {
      var $submenu = $('.wp-has-current-submenu .wp-submenu');
      var $menuitem = $submenu.find('a[href*="papi-add-new-page"]').parent();

      if (!$menuitem.hasClass('current') && !$submenu.find('li.current').length) {
        $menuitem.addClass('current');
      }
    }
  }, {
    key: 'redirect',

    /**
     * Redirect to location from `papi-href` data attribute
     * or closest tag with href attribute.
     *
     * @param {object} e
     */

    value: function redirect(e) {
      e.preventDefault();
      var $this = $(this);

      if ($this.data().papiHref !== undefined) {
        window.location = $this.data().papiHref;
      } else {
        window.location = $(this).closest('[href]').attr('href');
      }
    }
  }, {
    key: 'search',

    /**
     * Search in page types box list.
     *
     * @param {object} e
     */

    value: function search(e) {
      e.preventDefault();

      var $this = $(this);
      var $list = $('.papi-box-list');
      var val = $this.val();

      $list.find('.papi-box-item').each(function () {
        var $item = $(this);
        $item[$item.text().toLowerCase().indexOf(val) === -1 ? 'addClass' : 'removeClass']('.papi-hide');
      });
    }
  }, {
    key: 'setEqualBoxHeights',

    /**
     * Set equal height on page type boxes.
     */

    value: function setEqualBoxHeights() {
      var boxItems = $('.papi-post-type-info');
      var boxMaxHeight = 0;

      boxItems.each(function () {
        var height = $(this).height();
        boxMaxHeight = height > boxMaxHeight ? height : boxMaxHeight;
      });

      boxItems.height(boxMaxHeight);
    }
  }, {
    key: 'setSelectedMenuItem',

    /**
     * Set selected menu item if it isn't selected.
     */

    value: function setSelectedMenuItem() {
      var href = typeof window.location === 'string' ? window.location : window.location.href;
      var $adminmenu = $('#adminmenu');

      if (!$adminmenu.find('li.current > a.current').length) {
        href = href.substr(href.lastIndexOf('/') + 1);
        $('a[href="' + href + '"]', $adminmenu).addClass('current').parent().addClass('current');
      }
    }
  }], [{
    key: 'init',

    /**
     * Initialize Papi core class.
     */

    value: function init() {
      return new Core().binds();
    }
  }]);

  return Core;
})();

exports['default'] = Core;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Core = require('./core');

var _Core2 = _interopRequireWildcard(_Core);

exports.Core = _Core2['default'];

},{"./core":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdS9zaXRlcy9kZXYud29yZHByZXNzLm9yZy93cC1jb250ZW50L3BsdWdpbnMvcGFwaS1lcy9zcmMvYXNzZXRzL2pzL21haW4uanMiLCIvdS9zaXRlcy9kZXYud29yZHByZXNzLm9yZy93cC1jb250ZW50L3BsdWdpbnMvcGFwaS1lcy9zcmMvYXNzZXRzL2pzL3BhY2thZ2VzL3BhcGkvbGliL2NvcmUuanMiLCIvdS9zaXRlcy9kZXYud29yZHByZXNzLm9yZy93cC1jb250ZW50L3BsdWdpbnMvcGFwaS1lcy9zcmMvYXNzZXRzL2pzL3BhY2thZ2VzL3BhcGkvbGliL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O29CQ0FpQiwwQkFBMEI7Ozs7Ozs7QUFJM0MsT0FBTyxDQUFDLEdBQUcsbUJBQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUNGWixJQUFJO1dBQUosSUFBSTswQkFBSixJQUFJOzs7ZUFBSixJQUFJOzs7Ozs7O1dBY0gsaUJBQUc7QUFDTixPQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4RCxPQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRSxPQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVELFVBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLFVBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0tBQ2xDOzs7Ozs7OztXQU13QixxQ0FBRztBQUMxQixVQUFJLFFBQVEsR0FB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UUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzFGO0tBQ0Y7Ozs7Ozs7O1dBL0ZVLGdCQUFHO0FBQ1osYUFBTyxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzNCOzs7U0FSRyxJQUFJOzs7cUJBeUdLLElBQUk7Ozs7Ozs7Ozs7OztvQkMzR0YsUUFBUTs7OztRQUVoQixJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBQYXBpIGZyb20gJy4vcGFja2FnZXMvcGFwaS9saWIvbWFpbic7XG4vL2ltcG9ydCAnLi9wYWNrYWdlcy9wYXBpLXByb3BlcnRpZXMvJ1xuLy9pbXBvcnQgJy4vcHJvcGVydGllcy9jb2xvcic7XG4vL1xuY29uc29sZS5sb2coUGFwaSk7XG4iLCIvL2ltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNsYXNzIENvcmUge1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIFBhcGkgY29yZSBjbGFzcy5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBDb3JlKCkuYmluZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGVsZW1lbnRzIHdpdGggZnVuY3Rpb25zLlxuICAgKi9cblxuICBiaW5kcygpIHtcbiAgICAkKCcucGFwaS1ib3gtbGlzdCA+IGxpID4gcCcpLm9uKCdjbGljaycsIHRoaXMucmVkaXJlY3QpO1xuICAgICQoJ2lucHV0W25hbWU9XCJhZGQtbmV3LXBhZ2Utc2VhcmNoXCJdJykub24oJ2tleXVwJywgdGhpcy5zZWFyY2gpO1xuICAgICQoJ1tkYXRhLXBhcGktaHJlZl0nKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIHRoaXMucmVkaXJlY3QpO1xuICAgIHRoaXMuc2V0RXF1YWxCb3hIZWlnaHRzKCk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZE1lbnVJdGVtKCk7XG4gICAgdGhpcy5hZGRDdXJyZW50Q2xhc3NUb01lbnVJdGVtKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGN1cnJlbnQgY2xhc3MgdG8gbWVudSBpdGVtLlxuICAgKi9cblxuICBhZGRDdXJyZW50Q2xhc3NUb01lbnVJdGVtKCkge1xuICAgIGxldCAkc3VibWVudSA9ICQoJy53cC1oYXMtY3VycmVudC1zdWJtZW51IC53cC1zdWJtZW51Jyk7XG4gICAgbGV0ICRtZW51aXRlbSA9ICRzdWJtZW51LmZpbmQoJ2FbaHJlZio9XCJwYXBpLWFkZC1uZXctcGFnZVwiXScpLnBhcmVudCgpO1xuXG4gICAgaWYgKCEkbWVudWl0ZW0uaGFzQ2xhc3MoJ2N1cnJlbnQnKSAmJiAhJHN1Ym1lbnUuZmluZCgnbGkuY3VycmVudCcpLmxlbmd0aCkge1xuICAgICAgJG1lbnVpdGVtLmFkZENsYXNzKCdjdXJyZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZGlyZWN0IHRvIGxvY2F0aW9uIGZyb20gYHBhcGktaHJlZmAgZGF0YSBhdHRyaWJ1dGVcbiAgICogb3IgY2xvc2VzdCB0YWcgd2l0aCBocmVmIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgcmVkaXJlY3QoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgaWYgKCR0aGlzLmRhdGEoKS5wYXBpSHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkdGhpcy5kYXRhKCkucGFwaUhyZWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnW2hyZWZdJykuYXR0cignaHJlZicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggaW4gcGFnZSB0eXBlcyBib3ggbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgc2VhcmNoKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgIGxldCAkbGlzdCA9ICQoJy5wYXBpLWJveC1saXN0Jyk7XG4gICAgbGV0IHZhbCAgID0gJHRoaXMudmFsKCk7XG5cbiAgICAkbGlzdC5maW5kKCcucGFwaS1ib3gtaXRlbScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKTtcbiAgICAgICRpdGVtWyRpdGVtLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsKSA9PT0gLTEgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJy5wYXBpLWhpZGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZXF1YWwgaGVpZ2h0IG9uIHBhZ2UgdHlwZSBib3hlcy5cbiAgICovXG5cbiAgc2V0RXF1YWxCb3hIZWlnaHRzKCkge1xuICAgIGxldCBib3hJdGVtcyA9ICQoJy5wYXBpLXBvc3QtdHlwZS1pbmZvJyk7XG4gICAgbGV0IGJveE1heEhlaWdodCA9IDA7XG5cbiAgICBib3hJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBoZWlnaHQgPSAkKHRoaXMpLmhlaWdodCgpO1xuICAgICAgYm94TWF4SGVpZ2h0ID0gaGVpZ2h0ID4gYm94TWF4SGVpZ2h0ID8gaGVpZ2h0IDogYm94TWF4SGVpZ2h0O1xuICAgIH0pO1xuXG4gICAgYm94SXRlbXMuaGVpZ2h0KGJveE1heEhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHNlbGVjdGVkIG1lbnUgaXRlbSBpZiBpdCBpc24ndCBzZWxlY3RlZC5cbiAgICovXG5cbiAgc2V0U2VsZWN0ZWRNZW51SXRlbSgpIHtcbiAgICBsZXQgaHJlZiA9IHR5cGVvZiB3aW5kb3cubG9jYXRpb24gPT09ICdzdHJpbmcnID8gd2luZG93LmxvY2F0aW9uIDogd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgbGV0ICRhZG1pbm1lbnUgPSAkKCcjYWRtaW5tZW51Jyk7XG5cbiAgICBpZiAoISRhZG1pbm1lbnUuZmluZCgnbGkuY3VycmVudCA+IGEuY3VycmVudCcpLmxlbmd0aCkge1xuICAgICAgaHJlZiA9IGhyZWYuc3Vic3RyKGhyZWYubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgJCgnYVtocmVmPVwiJyArIGhyZWYgKyAnXCJdJywgJGFkbWlubWVudSkuYWRkQ2xhc3MoJ2N1cnJlbnQnKS5wYXJlbnQoKS5hZGRDbGFzcygnY3VycmVudCcpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvcmU7XG4iLCJpbXBvcnQgQ29yZSBmcm9tICcuL2NvcmUnO1xuXG5leHBvcnQgeyBDb3JlIH07XG4iXX0=
