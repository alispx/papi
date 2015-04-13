(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var _import = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/main');

var Papi = _interopRequireWildcard(_import);

var _import2 = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/main');

var Properties = _interopRequireWildcard(_import2);

// Extend Papi object.
_$2['default'].extend(window.papi || {}, {
  properties: {},
  views: {}
});

// Initialize all packages.
Papi.init();
Properties.Init();

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/main":7,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/main":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global jQuery */
var $ = jQuery === undefined ? {} : jQuery;
exports.$ = $;

},{}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

/**
 * Property Color.
 *
 * Uses the build in color picker in WordPress.
 */

var Color = (function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      var _this = this;

      _$2['default']('.papi-property-color-picker input').each(function () {
        var $el = _$2['default'](_this);
        var palettes = $el.data().palettes;

        $el.wpColorPicker({
          color: true,
          palettes: palettes === undefined ? false : palettes
        });
      });
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Color.
     */

    value: function init() {
      new Color().binds();
    }
  }]);

  return Color;
})();

exports['default'] = Color;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

/**
 * Property Datetime.
 *
 * Using Pikaday with time fields and some custom fixes.
 */

var Datetime = (function () {
  function Datetime() {
    _classCallCheck(this, Datetime);
  }

  _createClass(Datetime, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      this.pikaday(_$2['default']('.inside > .papi-table > tbody > tr > td > input.papi-property-datetime'));
      this.pikaday(_$2['default']('.papi-table .papi-table:not(.papi-table-template) input.papi-property-datetime'));

      _$2['default'](document).on('papi/property/repeater/added', '[value="datetime"]', this.updateSelect);
    }
  }, {
    key: 'pikaday',

    /**
     * Initialize Pikaday.
     *
     * @param {object} $prop
     */

    value: function pikaday($props) {
      var _this = this;

      // Don't proceed if Pikaday is undefined.
      if (window.Pikaday === undefined) {
        return;
      }

      if (!$props.length) {
        return;
      }

      $props.each(function () {
        var $prop = _$2['default'](_this);
        var settings = $prop.data().settings;

        // Fixes to 24 hours actually works if you forget to change the format.
        if (settings.use24hour) {
          settings.format = settings.format.replace(/hh/, 'HH');
        }

        settings.field = $prop[0];

        new window.Pikaday(settings);
      });
    }
  }, {
    key: 'updateSelect',

    /**
     * Initialize pikaday field when added to repeater.
     *
     * @param {object} e
     */

    value: function updateSelect(e) {
      e.preventDefault();

      this.pikaday(_$2['default'](this).prev());
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Datetime.
     */

    value: function init() {
      new Datetime().binds();
    }
  }]);

  return Datetime;
})();

exports['default'] = Datetime;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],5:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

/**
 * Property Dropdown.
 *
 * Using Select2.
 */

var Dropdown = (function () {
  function Dropdown() {
    _classCallCheck(this, Dropdown);
  }

  _createClass(Dropdown, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default'](document).on('papi/property/repeater/added', '[value="dropdown"]', this.update);
    }
  }, {
    key: 'update',

    /**
     * Update select if isn't a select2.
     */

    value: function update(e) {
      e.preventDefault();

      var $select = _$2['default'](this).parent().find('select');

      if ($select.hasClass('papi-vendor-select2') && typeof $select.select2 === 'function') {
        $select.select2();
      }
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Color.
     */

    value: function init() {
      new Dropdown().binds();
    }
  }]);

  return Dropdown;
})();

exports['default'] = Dropdown;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],6:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var _Utils = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/utils');

var _Utils2 = _interopRequireWildcard(_Utils);

var _ImageView = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/views/image-view');

var _ImageView2 = _interopRequireWildcard(_ImageView);

/**
 * Property Image.
 *
 * Using the build in media management in WordPress.
 */

var Image = (function () {
  function Image() {
    _classCallCheck(this, Image);
  }

  _createClass(Image, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default']('.inside .papi-table:not(.papi-table-template) > tbody .papi-property-image.gallery .attachments').sortable({
        revert: true
      });

      _$2['default'](document).on('click', '.papi-property-image .papi-image-select > .button', this.add);
      _$2['default'](document).on('hover', '.papi-property-image .attachment', this.hover);
      _$2['default'](document).on('click', '.papi-property-image .attachment a', this.remove);
      _$2['default'](document).on('papi/property/repeater/added', '[value="image"]', this.update);
      _$2['default'](document).on('click', '.papi-property-image .attachment', this.replace);
    }
  }, {
    key: 'add',

    /**
     * Add new image.
     *
     * @param {object} e
     */

    value: function add(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var $prop = $this.closest('.papi-property-image');
      var $select = $this.closest('p');
      var $target = $prop.find('.attachments');
      var multiple = $prop.hasClass('gallery');
      var slug = $this.data().slug;

      _Utils2['default'].wpMediaEditor({
        library: {
          type: 'image'
        },
        multiple: multiple
      }).on('insert', function (attachment, isImage) {
        if (!isImage) {
          return;
        }

        new _ImageView2['default']({
          el: $target
        }).render({
          image: attachment.sizes.thumbnail !== undefined ? attachment.sizes.thumbnail.url : attachment.url,
          id: attachment.id,
          slug: slug
        });

        if (!multiple) {
          $select.hide();
        }
      }).open();
    }
  }, {
    key: 'hover',

    /**
     * Toggle the remove button.
     *
     * @param {object} e
     */

    value: function hover(e) {
      e.preventDefault();

      _$2['default'](this).find('a').toggle();
    }
  }, {
    key: 'remove',

    /**
     * Remove a image.
     *
     * @param {object} e
     */

    value: function remove(e) {
      e.preventDefault();

      var $this = _$2['default'](this);

      $this.closest('.papi-property-image').find('.papi-image-select').show();

      $this.closest('.attachment').remove();
    }
  }, {
    key: 'replace',

    /**
     * Replace image with another one.
     *
     * @param {object} e
     */

    value: function replace(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var $img = $this.find('img[src]');
      var $input = $this.find('input[type=hidden]');
      var postId = $input.val();

      _Utils2['default'].wpMediaEditor({
        library: {
          type: 'image'
        },
        multiple: false
      }).on('open', function () {
        var selection = _Utils2['default'].wpMediaFrame.state().get('selection');
        var attachment = window.wp.media.attachment(postId);

        attachment.fetch();
        selection.add(attachment ? [attachment] : []);
      }).on('insert', function (attachment, isImage) {
        attachment.sizes.thumbnail = attachment.sizes.thumbnail || attachment.url;
        $img.attr('src', attachment.sizes.thumbnail);

        $input.val(attachment.id);
      }).open();
    }
  }, {
    key: 'update',

    /**
     * Update when added to repeater.
     */

    value: function update(e) {
      e.preventDefault();

      _$2['default'](this).prev().find('.attachments').sortable({
        revert: true
      });
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Image.
     */

    value: function init() {
      new Image().binds();
    }
  }]);

  return Image;
})();

exports['default'] = Image;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/views/image-view":12,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/utils":17}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Initialize all properties.
 */

exports.init = init;

var _Color = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/color');

var _Color2 = _interopRequireWildcard(_Color);

var _Datetime = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/datetime');

var _Datetime2 = _interopRequireWildcard(_Datetime);

var _Dropdown = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/dropdown');

var _Dropdown2 = _interopRequireWildcard(_Dropdown);

var _Image = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/image');

var _Image2 = _interopRequireWildcard(_Image);

var _Post = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/post');

var _Post2 = _interopRequireWildcard(_Post);

var _Reference = _interopRequireWildcard(_Post);

var _Relationship = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/relationship');

var _Relationship2 = _interopRequireWildcard(_Relationship);

var _Repeater = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/repeater');

var _Repeater2 = _interopRequireWildcard(_Repeater);

var _Url = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/url');

var _Url2 = _interopRequireWildcard(_Url);

function init() {
  'use strict';

  _Color2['default'].init();
  _Datetime2['default'].init();
  _Dropdown2['default'].init();
  _Image2['default'].init();
  _Post2['default'].init();
  _Reference['default'].init();
  _Relationship2['default'].init();
  _Repeater2['default'].init();
  _Url2['default'].Init();
}

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/color":3,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/datetime":4,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/dropdown":5,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/image":6,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/post":8,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/relationship":9,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/repeater":10,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi-properties/lib/url":11}],8:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

/**
 * Property Post.
 *
 * Using Select2.
 */

var Post = (function () {
  function Post() {
    _classCallCheck(this, Post);
  }

  _createClass(Post, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default'](document).on('papi/property/repeater/added', '[value="post"]', this.update);
    }
  }, {
    key: 'update',

    /**
     * Initialize pikaday field when added to repeater.
     *
     * @param {object} e
     */

    value: function update(e) {
      e.preventDefault();

      var $select = _$2['default'](this).parent().find('select');

      if ($select.hasClass('papi-vendor-select2') && typeof $select.select2 === 'function') {
        $select.select2();
      }
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Post.
     */

    value: function init() {
      new Post().binds();
    }
  }]);

  return Post;
})();

exports['default'] = Post;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],9:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

/**
 * Property Relationship.
 */

var Relationship = (function () {
  function Relationship() {
    _classCallCheck(this, Relationship);
  }

  _createClass(Relationship, [{
    key: 'add',

    /**
     * Add new page to the list.
     *
     * @param {object} e
     */

    value: function add(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var $li = $this.clone();
      var $right = $this.closest('.papi-property-relationship').find('.relationship-right');
      var $list = $right.find('ul');
      var max = $right.data().relationshipChooseMax;
      var append = max === undefined || max === -1 || $list.find('li').length < max;

      if (append) {
        $li.find('span.icon').removeClass('plus').addClass('minus');
        $li.find('input').attr('name', $li.find('input').data().name);

        $li.appendTo($list);
      }
    }
  }, {
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default'](document).on('click', '.papi-property-relationship .relationship-left li', this.add);
      _$2['default'](document).on('click', '.papi-property-relationship .relationship-right li', this.remove);
      _$2['default'](document).on('keyup', '.papi-property-relationship input[type=search]', this.search);
      _$2['default'](document).on('papi/property/repeater/added', '[value="relationship"]', this.update);
    }
  }, {
    key: 'remove',

    /**
     * Remove the selected page.
     *
     * @parma {object} e
     */

    value: function remove(e) {
      e.preventDefault();

      _$2['default'](this).remove();
    }
  }, {
    key: 'search',

    /**
     * Search for a page in the list.
     *
     * @parma {object} e
     */

    value: function search(e) {
      var _this = this;

      e.preventDefault();

      var $this = _$2['default'](this);
      var $list = $this.closest('.papi-property-relationship').find('.relationshio-left ul');
      var val = $this.val().toLowerCase();

      $list.find('li').each(function () {
        var $li = _$2['default'](_this);
        $li[$li.text().toLowerCase().indexOf(val) === -1 ? 'hide' : 'show']();
      });
    }
  }, {
    key: 'update',

    /**
     * Fix name attribute when added to a repeater.
     *
     * @parma {object} e
     */

    value: function update(e) {
      var _this2 = this;

      e.preventDefault();

      var $this = _$2['default'](this);
      var $prop = $this.prev();

      $prop.find('.relationship-left [name]').each(function () {
        $this = _$2['default'](_this2);
        $this.data('name', $this.attr('name'));
        $this.removeAttr('name');
      });
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Relationship.
     */

    value: function init() {
      new Relationship().binds();
    }
  }]);

  return Relationship;
})();

exports['default'] = Relationship;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],10:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var papiL10n = window.papiL10n;

/**
 * Property Repeater.
 */

var Repeater = (function () {
  function Repeater() {
    _classCallCheck(this, Repeater);
  }

  _createClass(Repeater, [{
    key: 'add',

    /**
     * Add new media file.
     *
     * @param {object} e
     */

    value: function add(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var $repeater = $this.closest('.papi-property-repeater');
      var $table = $repeater.find('> .papi-table tbody');
      var counter = $table.children().length;
      var attrNameRegex = /\[(\d+)\]/g;
      var attrNameValue = '[' + counter + ']';
      var jsonText = _$2['default']($repeater.data().jsonId).text();

      if (!jsonText.length) {
        return;
      }

      var properties = _$2['default'].parseJSON(jsonText);

      for (var i = 0, l = properties.length; i < l; i++) {
        properties[i].slug.replace(attrNameRegex, attrNameValue);
      }

      _$2['default'].ajax({
        type: 'POST',
        data: JSON.stringify(properties),
        url: papi.ajaxUrl + '?papi-ajax=get_properties',
        dataType: 'json'
      }).success(function (res) {
        var html = ['<tr>', '<td class="handle"><span>' + (counter + 1) + '</span></td>'];

        for (var i = 0, l = res.length; i < l; i++) {
          html.push('<td>' + res[i] + '</td>');
        }

        html.push('<td class="last">');
        html.push('<span>');
        html.push('<a title="' + papiL10n.remove + '" href="#" class="repeater-remove-item">x</a>');
        html.push('</span>');
        html.push('</td>');

        var $template = _$2['default'](html.join('') + '</tr>');

        $template.find('[name],[data-slug], [data-id]').each(function () {
          var value = '';
          var attr = '';
          var $el = _$2['default'](this);
          var attrs = [{
            source: 'data-slug',
            target: 'data-slug' }, {
            source: 'data-id',
            target: 'id'
          }, {
            source: 'name',
            target: 'name'
          }];

          for (var i = 0, l = attrs.length; i < l; i++) {
            if ($el.attr(attrs[i].source) !== undefined) {
              attr = attrs[i].target;
              value = $el.attr(attrs[i].source);
            }
          }

          value = value.replace(attrNameRegex, attrNameValue);

          $el.attr(attr, value);
        });

        $template.appendTo($table);

        // Trigger the property that we just added.
        $template.find('[name*="_property"]').trigger('papi/property/repeater/added');

        _$2['default']('html, body').animate({
          scrollTop: _$2['default']('> tr:last', $table).offset().top
        });

        $table.closest('.papi-property-repeater').find('.papi-property-repeater-rows').val($table.find('tr').length);
      });
    }
  }, {
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      var self = this;

      _$2['default']('.papi-property-repeater tbody').sortable({
        revert: true,
        handle: '.handle',
        helper: function helper(e, ui) {
          ui.children().each(function () {
            _$2['default'](this).width(_$2['default'](this).width());
          });
          return ui;
        },
        stop: function stop() {
          self.updateRowNumber(_$2['default'](this).closest('.papi-property-repeater tbody'));
        }
      });

      _$2['default'](document).on('click', '.papi-property-repeater .bottom a.button', this.add);
      _$2['default'](document).on('click', '.papi-property-repeater .repeater-remove-item', this.remove);
    }
  }, {
    key: 'remove',

    /**
     * Remove item in the repeater.
     *
     * @param {object} e
     */

    value: function remove(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var $tbody = $this.closest('.papi-property-repeater tbody');

      $this.closest('tr').remove();

      this.updateRowNumber($tbody);
    }
  }, {
    key: 'updateRowNumber',

    /**
     * Update table row number.
     *
     * @param {object} $tbody
     */

    value: function updateRowNumber($tbody) {
      var _this = this;

      $tbody.find('tr').each(function (i) {
        var $this = _$2['default'](_this);

        $this.find('td:first-child span').text(i + 1);

        $this.find('input, select, textarea').each(function () {
          $this = _this;

          if ($this.attr('name') === undefined || !$this.attr('name').length) {
            return;
          }

          $this.attr('name', $this.attr('name').replace(/(\[\d+\])/, '[' + i + ']'));
        });
      });

      $tbody.closest('.papi-property-repeater').find('.papi-property-repeater-rows').val($tbody.find('tr').length);
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Repeater.
     */

    value: function init() {
      new Repeater().binds();
    }
  }]);

  return Repeater;
})();

exports['default'] = Repeater;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],11:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var _Utils = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/utils');

var _Utils2 = _interopRequireWildcard(_Utils);

/**
 * Property Url.
 */

var Url = (function () {
  function Url() {
    _classCallCheck(this, Url);
  }

  _createClass(Url, [{
    key: 'add',

    /**
     * Add new media file.
     *
     * @param {object} e
     */

    value: function add(e) {
      e.preventDefault();

      var $this = _$2['default'](this);

      _Utils2['default'].wpMediaEditor().on('insert', function (attachment) {
        $this.prev().val(attachment.url);
      }).open();
    }
  }, {
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default'](document).on('click', '.papi-url-media-button', this.add);
    }
  }], [{
    key: 'init',

    /**
     * Initialize Property Url.
     */

    value: function init() {
      new Url().binds();
    }
  }]);

  return Url;
})();

exports['default'] = Url;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/utils":17}],12:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
var wp = window.wp;
var _ = window._;

var ImageView = (function (_wp$Backbone$View) {
  function ImageView() {
    _classCallCheck(this, ImageView);

    if (_wp$Backbone$View != null) {
      _wp$Backbone$View.apply(this, arguments);
    }
  }

  _inherits(ImageView, _wp$Backbone$View);

  _createClass(ImageView, [{
    key: 'template',

    /**
     * The image template to compile.
     */

    get: function () {
      return wp.template('papi-image');
    }
  }, {
    key: 'render',

    /**
     * Render image template with the given data object.
     *
     * @param {object} data
     */

    value: function render(data) {
      var template = _.template(this.template());
      var html = template(data);

      this.$el.append('<div class="attachment">' + html + '</div>');
    }
  }]);

  return ImageView;
})(wp.Backbone.View);

exports['default'] = ImageView;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

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
      _$2['default']('.papi-box-list > li > p').on('click', this.redirect);
      _$2['default']('input[name="add-new-page-search"]').on('keyup', this.search);
      _$2['default']('[data-papi-href]').on('click touchstart', this.redirect);

      if ('select2' in _$2['default'].fn) {
        _$2['default']('.inside .papi-table tr .papi-vendor-select2').select2();
      }
    }
  }, {
    key: 'addCurrentClassToMenuItem',

    /**
     * Add current class to menu item.
     */

    value: function addCurrentClassToMenuItem() {
      var $submenu = _$2['default']('.wp-has-current-submenu .wp-submenu');
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
      var $this = _$2['default'](this);
      var papiHref = $this.data().papiHref;

      if (papiHref !== undefined) {
        window.location = papiHref;
      } else {
        window.location = _$2['default'](this).closest('[href]').attr('href');
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
      var _this = this;

      e.preventDefault();

      var $this = _$2['default'](this);
      var $list = _$2['default']('.papi-box-list');
      var val = $this.val();

      $list.find('.papi-box-item').each(function () {
        var $item = _$2['default'](_this);
        $item[$item.text().toLowerCase().indexOf(val) === -1 ? 'addClass' : 'removeClass']('.papi-hide');
      });
    }
  }, {
    key: 'setEqualBoxHeights',

    /**
     * Set equal height on page type boxes.
     */

    value: function setEqualBoxHeights() {
      var boxItems = _$2['default']('.papi-post-type-info');
      var boxMaxHeight = 0;

      boxItems.each(function () {
        var height = _$2['default'](this).height();
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
      var $adminmenu = _$2['default']('#adminmenu');

      if (!$adminmenu.find('li.current > a.current').length) {
        href = href.substr(href.lastIndexOf('/') + 1);
        _$2['default']('a[href="' + href + '"]', $adminmenu).addClass('current').parent().addClass('current');
      }
    }
  }], [{
    key: 'init',

    /**
     * Initialize Papi core class.
     */

    value: function init() {
      var core = new Core();

      core.binds();
      core.setEqualBoxHeights();
      core.setSelectedMenuItem();
      core.addCurrentClassToMenuItem();
    }
  }]);

  return Core;
})();

exports['default'] = Core;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],14:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Initialize all necessary core classes.
 */

exports.init = init;

var _Core = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/core');

var _Core2 = _interopRequireWildcard(_Core);

var _Required = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/required');

var _Required2 = _interopRequireWildcard(_Required);

var _Tabs = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/tabs');

var _Tabs2 = _interopRequireWildcard(_Tabs);

function init() {
  'use strict';

  _Core2['default'].init();
  _Required2['default'].init();
  _Tabs2['default'].init();
}

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/core":13,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/required":15,"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/papi/lib/tabs":16}],15:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var papiL10n = window.papiL10n;

var Required = (function () {
  function Required() {
    _classCallCheck(this, Required);
  }

  _createClass(Required, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default']('body').on('click', this.requiredLink);
      _$2['default']('#publish').on('click', this.publishPost);
    }
  }, {
    key: 'requiredLink',

    /**
     * Animate down to required field.
     *
     * @param {object} e
     */

    value: function requiredLink(e) {
      _$2['default']('html, body').animate({
        scrollTop: _$2['default']('[for=' + _$2['default'](this).attr('href').replace('#', '') + ']').offset().top - 45
      });
    }
  }, {
    key: 'publishPost',

    /**
     * Collect all required fields that don't have any value
     * and output error message.
     *
     * @param {object} e
     */

    value: function publishPost(e) {
      var $button = _$2['default'](this);
      var $fields = _$2['default']('.papi-rq');
      var $spinner = _$2['default']('#publishing-action .spinner');
      var $errors = [];

      for (var i = 0, l = $fields.length; i < l; i++) {
        var $this = _$2['default']($fields[i]);

        if ($this.parent().parent().hasClass('metabox-prefs') || !$this.is(':visible')) {
          continue;
        }

        var data = $this.data();
        var $field = _$2['default']('[name="' + data.propertyId + '"]');

        if (!$field.length) {
          $field = _$2['default']('[name="' + data.propertyId + '[]"]').first();
        }

        if ($field.val() === undefined || !$field.val().length) {
          $errors.push($fields[i]);
        }
      }

      if ($errors.length) {
        e.preventDefault();

        $spinner.hide();
        $button.removeClass('button-primary-disabled');
        _$2['default']('#message').remove();

        var items = '';

        for (var i = 0, l = $errors.length; i < l; i++) {
          var $field = _$2['default']($errors[i]);
          var data = $field.data();
          items += '<a class="papi-rq-link" href="#' + data.propertyId + '">' + data.propertyName + '</a>';

          if (i + 1 !== $errors.length) {
            items += ', ';
          }

          _$2['default']('.wrap h2').after('<div id="message" class="error below-h2"><p>' + papiL10n.requiredError + ' ' + items + '</p></div>');
        }
      }
    }
  }], [{
    key: 'init',

    /**
     * Initialize Papi core class.
     */

    value: function init() {
      new Required().binds();
    }
  }]);

  return Required;
})();

exports['default'] = Required;
module.exports = exports['default'];

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],16:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _$ = require('/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery');

var _$2 = _interopRequireWildcard(_$);

var Tabs = (function () {
  function Tabs() {
    _classCallCheck(this, Tabs);
  }

  _createClass(Tabs, [{
    key: 'binds',

    /**
     * Bind elements with functions.
     */

    value: function binds() {
      _$2['default']('a[data-papi-tab]').on('click', this.changeTab);
    }
  }, {
    key: 'changeTab',

    /**
     * Change tab.
     *
     * @param {object} e
     */

    value: function changeTab(e) {
      e.preventDefault();

      var $this = _$2['default'](this);
      var tab = $this.data().papiTab;

      _$2['default']('a[data-papi-tab]').parent().removeClass('active');
      $this.parent().addClass('active');

      _$2['default']('div[data-papi-tab]').removeClass('active').addClass('.papi-hide');
      _$2['default']('div[data-papi-tab="' + tab + '"]').addClass('active').removeClass('papi-show');
    }
  }], [{
    key: 'init',

    /**
     * Initialize Papi tabs class.
     */

    value: function init() {
      var tabs = new Tabs();

      tabs.binds();
    }
  }]);

  return Tabs;
})();

},{"/u/sites/dev.wordpress.org/wp-content/plugins/papi-es/src/assets/js/packages/jquery/lib/jquery":2}],17:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
var wp = window.wp;

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'init',

    /**
     * Initialize Papi core class.
     */

    value: function init() {
      var utils = new Utils();

      utils.binds();
    }
  }, {
    key: 'isImage',

    /**
     * Check if given string is a image via regex.
     *
     * @param {string} url
     */

    value: function isImage(url) {
      return /\.(jpeg|jpg|gif|png)$/.test(url.toLowerCase());
    }
  }, {
    key: 'wpMediaEditor',

    /**
     * Open WordPress media editor.
     *
     * @param {object} options
     */

    value: function wpMediaEditor(options) {
      if (Utils.wpMediaFrame !== undefined) {
        Utils.wpMediaFrame.dispose();
      }

      Utils.wpMediaFrame = wp.media(options).on('select', function () {
        var attachments = Utils.wpMediaFrame.state().get('selection').toJSON();
        for (var i = 0, l = attachments.length; i < l; i++) {
          if (attachments[i] === null) {
            continue;
          }

          Utils.wpMediaFrame.trigger('insert', attachments[i], Utils.isImage(attachments[i].url));
        }
      });

      return Utils.wpMediaFrame;
    }
  }, {
    key: 'wpMediaFrame',

    /**
     * Get media frame.
     *
     * @return {object}
     */

    get: function () {
      return this.wpMediaFrame;
    },

    /**
     * Set media frame.
     *
     * @param {object} obj
     */

    set: function (obj) {
      this.wpMediaFrame = obj;
    }
  }]);

  return Utils;
})();

exports['default'] = Utils;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9tYWluLmpzIiwianF1ZXJ5L2xpYi9qcXVlcnkuanMiLCJwYXBpLXByb3BlcnRpZXMvbGliL2NvbG9yLmpzIiwicGFwaS1wcm9wZXJ0aWVzL2xpYi9kYXRldGltZS5qcyIsInBhcGktcHJvcGVydGllcy9saWIvZHJvcGRvd24uanMiLCJwYXBpLXByb3BlcnRpZXMvbGliL2ltYWdlLmpzIiwicGFwaS1wcm9wZXJ0aWVzL2xpYi9tYWluLmpzIiwicGFwaS1wcm9wZXJ0aWVzL2xpYi9wb3N0LmpzIiwicGFwaS1wcm9wZXJ0aWVzL2xpYi9yZWxhdGlvbnNoaXAuanMiLCJwYXBpLXByb3BlcnRpZXMvbGliL3JlcGVhdGVyLmpzIiwicGFwaS1wcm9wZXJ0aWVzL2xpYi91cmwuanMiLCJwYXBpLXByb3BlcnRpZXMvbGliL3ZpZXdzL2ltYWdlLXZpZXcuanMiLCJwYXBpL2xpYi9jb3JlLmpzIiwicGFwaS9saWIvbWFpbi5qcyIsInBhcGkvbGliL3JlcXVpcmVkLmpzIiwicGFwaS9saWIvdGFicy5qcyIsInBhcGkvbGliL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztpQkNBYyxnR0FBUTs7OztzQkFDQSw0RkFBVzs7SUFBckIsSUFBSTs7dUJBQ1ksdUdBQXNCOztJQUF0QyxVQUFVOzs7QUFHdEIsZUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUU7QUFDMUIsWUFBVSxFQUFFLEVBQUU7QUFDZCxPQUFLLEVBQUUsRUFBRTtDQUNWLENBQUMsQ0FBQzs7O0FBR0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7QUNYWCxJQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssU0FBUyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7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QztLQUN6Qjs7O1NBbEVHLEtBQUs7OztxQkFzRUksS0FBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICogYXMgUGFwaSBmcm9tICdwYXBpL21haW4nO1xuaW1wb3J0ICogYXMgUHJvcGVydGllcyBmcm9tICdwYXBpLXByb3BlcnRpZXMvbWFpbic7XG5cbi8vIEV4dGVuZCBQYXBpIG9iamVjdC5cbiQuZXh0ZW5kKHdpbmRvdy5wYXBpIHx8wqB7fSwge1xuICBwcm9wZXJ0aWVzOiB7fSxcbiAgdmlld3M6IHt9XG59KTtcblxuLy8gSW5pdGlhbGl6ZSBhbGwgcGFja2FnZXMuXG5QYXBpLmluaXQoKTtcblByb3BlcnRpZXMuSW5pdCgpO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSAqL1xuZXhwb3J0IGxldCAkID0galF1ZXJ5ID09PSB1bmRlZmluZWQgPyB7fSA6IGpRdWVyeTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8qKlxuICogUHJvcGVydHkgQ29sb3IuXG4gKlxuICogVXNlcyB0aGUgYnVpbGQgaW4gY29sb3IgcGlja2VyIGluIFdvcmRQcmVzcy5cbiAqL1xuXG5jbGFzcyBDb2xvciB7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgUHJvcGVydHkgQ29sb3IuXG4gICAqL1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5ldyBDb2xvcigpLmJpbmRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBlbGVtZW50cyB3aXRoIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgYmluZHMoKSB7XG4gICAgJCgnLnBhcGktcHJvcGVydHktY29sb3ItcGlja2VyIGlucHV0JykuZWFjaCgoKSA9PiB7XG4gICAgICBjb25zdCAkZWwgPSAkKHRoaXMpO1xuICAgICAgY29uc3QgcGFsZXR0ZXMgPSAkZWwuZGF0YSgpLnBhbGV0dGVzO1xuXG4gICAgICAkZWwud3BDb2xvclBpY2tlcih7XG4gICAgICAgIGNvbG9yOiB0cnVlLFxuICAgICAgICBwYWxldHRlczogcGFsZXR0ZXMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogcGFsZXR0ZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sb3I7XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vKipcbiAqIFByb3BlcnR5IERhdGV0aW1lLlxuICpcbiAqIFVzaW5nIFBpa2FkYXkgd2l0aCB0aW1lIGZpZWxkcyBhbmQgc29tZSBjdXN0b20gZml4ZXMuXG4gKi9cblxuY2xhc3MgRGF0ZXRpbWUge1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIFByb3BlcnR5IERhdGV0aW1lLlxuICAgKi9cblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBuZXcgRGF0ZXRpbWUoKS5iaW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgZWxlbWVudHMgd2l0aCBmdW5jdGlvbnMuXG4gICAqL1xuXG4gIGJpbmRzKCkge1xuICAgIHRoaXMucGlrYWRheSgkKCcuaW5zaWRlID4gLnBhcGktdGFibGUgPiB0Ym9keSA+IHRyID4gdGQgPiBpbnB1dC5wYXBpLXByb3BlcnR5LWRhdGV0aW1lJykpO1xuICAgIHRoaXMucGlrYWRheSgkKCcucGFwaS10YWJsZSAucGFwaS10YWJsZTpub3QoLnBhcGktdGFibGUtdGVtcGxhdGUpIGlucHV0LnBhcGktcHJvcGVydHktZGF0ZXRpbWUnKSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbigncGFwaS9wcm9wZXJ0eS9yZXBlYXRlci9hZGRlZCcsICdbdmFsdWU9XCJkYXRldGltZVwiXScsIHRoaXMudXBkYXRlU2VsZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIFBpa2FkYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSAkcHJvcFxuICAgKi9cblxuICBwaWthZGF5KCRwcm9wcykge1xuICAgIC8vIERvbid0IHByb2NlZWQgaWYgUGlrYWRheSBpcyB1bmRlZmluZWQuXG4gICAgaWYgKHdpbmRvdy5QaWthZGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoISRwcm9wcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkcHJvcHMuZWFjaCgoKSA9PiB7XG4gICAgICBsZXQgJHByb3AgPSAkKHRoaXMpO1xuICAgICAgbGV0IHNldHRpbmdzID0gJHByb3AuZGF0YSgpLnNldHRpbmdzO1xuXG4gICAgICAvLyBGaXhlcyB0byAyNCBob3VycyBhY3R1YWxseSB3b3JrcyBpZiB5b3UgZm9yZ2V0IHRvIGNoYW5nZSB0aGUgZm9ybWF0LlxuICAgICAgaWYgKHNldHRpbmdzLnVzZTI0aG91cikge1xuICAgICAgICBzZXR0aW5ncy5mb3JtYXQgPSBzZXR0aW5ncy5mb3JtYXQucmVwbGFjZSgvaGgvLCAnSEgnKTtcbiAgICAgIH1cblxuICAgICAgc2V0dGluZ3MuZmllbGQgPSAkcHJvcFswXTtcblxuICAgICAgbmV3IHdpbmRvdy5QaWthZGF5KHNldHRpbmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBpa2FkYXkgZmllbGQgd2hlbiBhZGRlZCB0byByZXBlYXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgIHVwZGF0ZVNlbGVjdChlKSB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICB0aGlzLnBpa2FkYXkoJCh0aGlzKS5wcmV2KCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGV0aW1lO1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBQcm9wZXJ0eSBEcm9wZG93bi5cbiAqXG4gKiBVc2luZyBTZWxlY3QyLlxuICovXG5cbmNsYXNzIERyb3Bkb3duIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQcm9wZXJ0eSBDb2xvci5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbmV3IERyb3Bkb3duKCkuYmluZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGVsZW1lbnRzIHdpdGggZnVuY3Rpb25zLlxuICAgKi9cblxuICBiaW5kcygpIHtcbiAgICAkKGRvY3VtZW50KS5vbigncGFwaS9wcm9wZXJ0eS9yZXBlYXRlci9hZGRlZCcsICdbdmFsdWU9XCJkcm9wZG93blwiXScsIHRoaXMudXBkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc2VsZWN0IGlmIGlzbid0IGEgc2VsZWN0Mi5cbiAgICovXG5cbiAgdXBkYXRlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkc2VsZWN0ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3QnKTtcblxuICAgIGlmICgkc2VsZWN0Lmhhc0NsYXNzKCdwYXBpLXZlbmRvci1zZWxlY3QyJykgJiYgdHlwZW9mICRzZWxlY3Quc2VsZWN0MiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJHNlbGVjdC5zZWxlY3QyKCk7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IFV0aWxzIGZyb20gJ3BhcGkvdXRpbHMnO1xuaW1wb3J0IEltYWdlVmlldyBmcm9tICdwYXBpLXByb3BlcnRpZXMvdmlld3MvaW1hZ2Utdmlldyc7XG5cbi8qKlxuICogUHJvcGVydHkgSW1hZ2UuXG4gKlxuICogVXNpbmcgdGhlIGJ1aWxkIGluIG1lZGlhIG1hbmFnZW1lbnQgaW4gV29yZFByZXNzLlxuICovXG5cbmNsYXNzIEltYWdlIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQcm9wZXJ0eSBJbWFnZS5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbmV3IEltYWdlKCkuYmluZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGVsZW1lbnRzIHdpdGggZnVuY3Rpb25zLlxuICAgKi9cblxuICBiaW5kcygpIHtcbiAgICAkKCcuaW5zaWRlIC5wYXBpLXRhYmxlOm5vdCgucGFwaS10YWJsZS10ZW1wbGF0ZSkgPiB0Ym9keSAucGFwaS1wcm9wZXJ0eS1pbWFnZS5nYWxsZXJ5IC5hdHRhY2htZW50cycpLnNvcnRhYmxlKHtcbiAgICAgIHJldmVydDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXByb3BlcnR5LWltYWdlIC5wYXBpLWltYWdlLXNlbGVjdCA+IC5idXR0b24nLCB0aGlzLmFkZCk7XG4gICAgJChkb2N1bWVudCkub24oJ2hvdmVyJywgJy5wYXBpLXByb3BlcnR5LWltYWdlIC5hdHRhY2htZW50JywgdGhpcy5ob3Zlcik7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXByb3BlcnR5LWltYWdlIC5hdHRhY2htZW50IGEnLCB0aGlzLnJlbW92ZSk7XG4gICAgJChkb2N1bWVudCkub24oJ3BhcGkvcHJvcGVydHkvcmVwZWF0ZXIvYWRkZWQnLCAnW3ZhbHVlPVwiaW1hZ2VcIl0nLCB0aGlzLnVwZGF0ZSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXByb3BlcnR5LWltYWdlIC5hdHRhY2htZW50JywgdGhpcy5yZXBsYWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbmV3IGltYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cblxuICBhZGQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0ICR0aGlzICAgID0gJCh0aGlzKTtcbiAgICBjb25zdCAkcHJvcCAgICA9ICR0aGlzLmNsb3Nlc3QoJy5wYXBpLXByb3BlcnR5LWltYWdlJyk7XG4gICAgY29uc3QgJHNlbGVjdCAgPSAkdGhpcy5jbG9zZXN0KCdwJyk7XG4gICAgY29uc3QgJHRhcmdldCAgPSAkcHJvcC5maW5kKCcuYXR0YWNobWVudHMnKTtcbiAgICBjb25zdCBtdWx0aXBsZSA9ICRwcm9wLmhhc0NsYXNzKCdnYWxsZXJ5Jyk7XG4gICAgY29uc3Qgc2x1ZyAgICAgPSAkdGhpcy5kYXRhKCkuc2x1ZztcblxuICAgIFV0aWxzLndwTWVkaWFFZGl0b3Ioe1xuICAgICAgbGlicmFyeToge1xuICAgICAgICB0eXBlOiAnaW1hZ2UnXG4gICAgICB9LFxuICAgICAgbXVsdGlwbGU6IG11bHRpcGxlXG4gICAgfSkub24oJ2luc2VydCcsIChhdHRhY2htZW50LCBpc0ltYWdlKSA9PiB7XG4gICAgICBpZiAoIWlzSW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBuZXcgSW1hZ2VWaWV3KHtcbiAgICAgICAgZWw6ICR0YXJnZXRcbiAgICAgIH0pLnJlbmRlcih7XG4gICAgICAgIGltYWdlOiBhdHRhY2htZW50LnNpemVzLnRodW1ibmFpbCAhPT0gdW5kZWZpbmVkID8gYXR0YWNobWVudC5zaXplcy50aHVtYm5haWwudXJsIDogYXR0YWNobWVudC51cmwsXG4gICAgICAgIGlkOiBhdHRhY2htZW50LmlkLFxuICAgICAgICBzbHVnOiBzbHVnXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFtdWx0aXBsZSkge1xuICAgICAgICAkc2VsZWN0LmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KS5vcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSByZW1vdmUgYnV0dG9uLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH3CoGVcbiAgICovXG5cbiAgaG92ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICQodGhpcykuZmluZCgnYScpLnRvZ2dsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGltYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cblxuICByZW1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuICAgICR0aGlzXG4gICAgICAuY2xvc2VzdCgnLnBhcGktcHJvcGVydHktaW1hZ2UnKVxuICAgICAgLmZpbmQoJy5wYXBpLWltYWdlLXNlbGVjdCcpXG4gICAgICAuc2hvdygpO1xuXG4gICAgJHRoaXNcbiAgICAgIC5jbG9zZXN0KCcuYXR0YWNobWVudCcpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBpbWFnZSB3aXRoIGFub3RoZXIgb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cblxuICByZXBsYWNlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkdGhpcyAgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRpbWcgICA9ICR0aGlzLmZpbmQoJ2ltZ1tzcmNdJyk7XG4gICAgY29uc3QgJGlucHV0ID0gJHRoaXMuZmluZCgnaW5wdXRbdHlwZT1oaWRkZW5dJyk7XG4gICAgY29uc3QgcG9zdElkID0gJGlucHV0LnZhbCgpO1xuXG4gICAgVXRpbHMud3BNZWRpYUVkaXRvcih7XG4gICAgICBsaWJyYXJ5OiB7XG4gICAgICAgIHR5cGU6ICdpbWFnZSdcbiAgICAgIH0sXG4gICAgICBtdWx0aXBsZTogZmFsc2VcbiAgICB9KS5vbignb3BlbicsICgpID0+IHtcbiAgICAgIGxldCAgIHNlbGVjdGlvbiA9IFV0aWxzLndwTWVkaWFGcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJyk7XG4gICAgICBjb25zdCBhdHRhY2htZW50ID0gd2luZG93LndwLm1lZGlhLmF0dGFjaG1lbnQocG9zdElkKTtcblxuICAgICAgYXR0YWNobWVudC5mZXRjaCgpO1xuICAgICAgc2VsZWN0aW9uLmFkZChhdHRhY2htZW50ID8gW2F0dGFjaG1lbnRdIDogW10pO1xuICAgIH0pLm9uKCdpbnNlcnQnLCAoYXR0YWNobWVudCwgaXNJbWFnZSkgPT4ge1xuICAgICAgYXR0YWNobWVudC5zaXplcy50aHVtYm5haWwgPSBhdHRhY2htZW50LnNpemVzLnRodW1ibmFpbMKgfHzCoGF0dGFjaG1lbnQudXJsO1xuICAgICAgJGltZy5hdHRyKCdzcmMnLCBhdHRhY2htZW50LnNpemVzLnRodW1ibmFpbCk7XG5cbiAgICAgICRpbnB1dC52YWwoYXR0YWNobWVudC5pZCk7XG4gICAgfSkub3BlbigpO1xuXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHdoZW4gYWRkZWQgdG8gcmVwZWF0ZXIuXG4gICAqL1xuXG4gIHVwZGF0ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzKVxuICAgICAgLnByZXYoKVxuICAgICAgLmZpbmQoJy5hdHRhY2htZW50cycpXG4gICAgICAuc29ydGFibGUoe1xuICAgICAgICByZXZlcnQ6IHRydWVcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCJpbXBvcnQgQ29sb3IgZnJvbSAncGFwaS1wcm9wZXJ0aWVzL2NvbG9yJztcbmltcG9ydCBEYXRldGltZSBmcm9tICdwYXBpLXByb3BlcnRpZXMvZGF0ZXRpbWUnO1xuaW1wb3J0IERyb3Bkb3duIGZyb20gJ3BhcGktcHJvcGVydGllcy9kcm9wZG93bic7XG5pbXBvcnQgSW1hZ2UgZnJvbSAncGFwaS1wcm9wZXJ0aWVzL2ltYWdlJztcbmltcG9ydCBQb3N0IGZyb20gJ3BhcGktcHJvcGVydGllcy9wb3N0JztcbmltcG9ydCBSZWZlcmVuY2UgZnJvbSAncGFwaS1wcm9wZXJ0aWVzL3Bvc3QnO1xuaW1wb3J0IFJlbGF0aW9uc2hpcCBmcm9tICdwYXBpLXByb3BlcnRpZXMvcmVsYXRpb25zaGlwJztcbmltcG9ydCBSZXBlYXRlciBmcm9tICdwYXBpLXByb3BlcnRpZXMvcmVwZWF0ZXInO1xuaW1wb3J0IFVybCBmcm9tICdwYXBpLXByb3BlcnRpZXMvdXJsJztcblxuLyoqXG4gKiBJbml0aWFsaXplIGFsbCBwcm9wZXJ0aWVzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgQ29sb3IuaW5pdCgpO1xuICBEYXRldGltZS5pbml0KCk7XG4gIERyb3Bkb3duLmluaXQoKTtcbiAgSW1hZ2UuaW5pdCgpO1xuICBQb3N0LmluaXQoKTtcbiAgUmVmZXJlbmNlLmluaXQoKTtcbiAgUmVsYXRpb25zaGlwLmluaXQoKTtcbiAgUmVwZWF0ZXIuaW5pdCgpO1xuICBVcmwuSW5pdCgpO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBQcm9wZXJ0eSBQb3N0LlxuICpcbiAqIFVzaW5nIFNlbGVjdDIuXG4gKi9cblxuY2xhc3MgUG9zdCB7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgUHJvcGVydHkgUG9zdC5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbmV3IFBvc3QoKS5iaW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgZWxlbWVudHMgd2l0aCBmdW5jdGlvbnMuXG4gICAqL1xuXG4gIGJpbmRzKCkge1xuICAgICQoZG9jdW1lbnQpLm9uKCdwYXBpL3Byb3BlcnR5L3JlcGVhdGVyL2FkZGVkJywgJ1t2YWx1ZT1cInBvc3RcIl0nLCB0aGlzLnVwZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwaWthZGF5IGZpZWxkIHdoZW4gYWRkZWQgdG8gcmVwZWF0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlXG4gICAqL1xuXG4gIHVwZGF0ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgJHNlbGVjdCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoJHNlbGVjdC5oYXNDbGFzcygncGFwaS12ZW5kb3Itc2VsZWN0MicpICYmIHR5cGVvZiAkc2VsZWN0LnNlbGVjdDIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICRzZWxlY3Quc2VsZWN0MigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3N0O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBQcm9wZXJ0eSBSZWxhdGlvbnNoaXAuXG4gKi9cblxuY2xhc3MgUmVsYXRpb25zaGlwIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQcm9wZXJ0eSBSZWxhdGlvbnNoaXAuXG4gICAqL1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5ldyBSZWxhdGlvbnNoaXAoKS5iaW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuZXcgcGFnZSB0byB0aGUgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgYWRkKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkdGhpcyAgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRsaSAgICA9ICR0aGlzLmNsb25lKCk7XG4gICAgY29uc3QgJHJpZ2h0ID0gJHRoaXMuY2xvc2VzdCgnLnBhcGktcHJvcGVydHktcmVsYXRpb25zaGlwJykuZmluZCgnLnJlbGF0aW9uc2hpcC1yaWdodCcpO1xuICAgIGNvbnN0ICRsaXN0ICA9ICRyaWdodC5maW5kKCd1bCcpO1xuICAgIGNvbnN0IG1heCAgICA9ICRyaWdodC5kYXRhKCkucmVsYXRpb25zaGlwQ2hvb3NlTWF4O1xuICAgIGNvbnN0IGFwcGVuZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8wqBtYXggPT09IC0xIHx8wqAkbGlzdC5maW5kKCdsaScpLmxlbmd0aCA8IG1heDtcblxuICAgIGlmIChhcHBlbmQpIHtcbiAgICAgICRsaS5maW5kKCdzcGFuLmljb24nKS5yZW1vdmVDbGFzcygncGx1cycpLmFkZENsYXNzKCdtaW51cycpO1xuICAgICAgJGxpLmZpbmQoJ2lucHV0JykuYXR0cignbmFtZScsICRsaS5maW5kKCdpbnB1dCcpLmRhdGEoKS5uYW1lKTtcblxuICAgICAgJGxpLmFwcGVuZFRvKCRsaXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBlbGVtZW50cyB3aXRoIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgYmluZHMoKSB7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXByb3BlcnR5LXJlbGF0aW9uc2hpcCAucmVsYXRpb25zaGlwLWxlZnQgbGknLCB0aGlzLmFkZCk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXByb3BlcnR5LXJlbGF0aW9uc2hpcCAucmVsYXRpb25zaGlwLXJpZ2h0IGxpJywgdGhpcy5yZW1vdmUpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcucGFwaS1wcm9wZXJ0eS1yZWxhdGlvbnNoaXAgaW5wdXRbdHlwZT1zZWFyY2hdJywgdGhpcy5zZWFyY2gpO1xuICAgICQoZG9jdW1lbnQpLm9uKCdwYXBpL3Byb3BlcnR5L3JlcGVhdGVyL2FkZGVkJywgJ1t2YWx1ZT1cInJlbGF0aW9uc2hpcFwiXScsIHRoaXMudXBkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIHNlbGVjdGVkIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJtYSB7b2JqZWN0fSBlXG4gICAqL1xuXG4gIHJlbW92ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggZm9yIGEgcGFnZSBpbiB0aGUgbGlzdC5cbiAgICpcbiAgICogQHBhcm1hIHtvYmplY3R9IGVcbiAgICovXG5cbiAgc2VhcmNoKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJGxpc3QgPSAkdGhpcy5jbG9zZXN0KCcucGFwaS1wcm9wZXJ0eS1yZWxhdGlvbnNoaXAnKS5maW5kKCcucmVsYXRpb25zaGlvLWxlZnQgdWwnKTtcbiAgICBjb25zdCB2YWwgICA9ICR0aGlzLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAkbGlzdC5maW5kKCdsaScpLmVhY2goKCkgPT4ge1xuICAgICAgbGV0ICRsaSA9ICQodGhpcyk7XG4gICAgICAkbGlbJGxpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsKSA9PT0gLTEgPyAnaGlkZScgOiAnc2hvdyddKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRml4IG5hbWUgYXR0cmlidXRlIHdoZW4gYWRkZWQgdG8gYSByZXBlYXRlci5cbiAgICpcbiAgICogQHBhcm1hIHtvYmplY3R9IGVcbiAgICovXG5cbiAgdXBkYXRlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJHByb3AgPSAkdGhpcy5wcmV2KCk7XG5cbiAgICAkcHJvcC5maW5kKCcucmVsYXRpb25zaGlwLWxlZnQgW25hbWVdJykuZWFjaCgoKSA9PiB7XG4gICAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAkdGhpcy5kYXRhKCduYW1lJywgJHRoaXMuYXR0cignbmFtZScpKTtcbiAgICAgICR0aGlzLnJlbW92ZUF0dHIoJ25hbWUnKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbGF0aW9uc2hpcDtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNvbnN0IHBhcGlMMTBuID0gd2luZG93LnBhcGlMMTBuO1xuXG4vKipcbiAqIFByb3BlcnR5IFJlcGVhdGVyLlxuICovXG5cbmNsYXNzIFJlcGVhdGVyIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQcm9wZXJ0eSBSZXBlYXRlci5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbmV3IFJlcGVhdGVyKCkuYmluZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbmV3IG1lZGlhIGZpbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlXG4gICAqL1xuXG4gIGFkZChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3TCoCR0aGlzICAgICAgICAgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRyZXBlYXRlciAgICAgPSAkdGhpcy5jbG9zZXN0KCcucGFwaS1wcm9wZXJ0eS1yZXBlYXRlcicpO1xuICAgIGNvbnN0ICR0YWJsZSAgICAgICAgPSAkcmVwZWF0ZXIuZmluZCgnPiAucGFwaS10YWJsZSB0Ym9keScpO1xuICAgIGNvbnN0IGNvdW50ZXIgICAgICAgPSAkdGFibGUuY2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgY29uc3QgYXR0ck5hbWVSZWdleCA9IC9cXFsoXFxkKylcXF0vZztcbiAgICBjb25zdCBhdHRyTmFtZVZhbHVlID0gJ1snICsgY291bnRlciArICddJztcbiAgICBjb25zdCBqc29uVGV4dCAgICAgID0gJCgkcmVwZWF0ZXIuZGF0YSgpLmpzb25JZCkudGV4dCgpO1xuXG4gICAgaWYgKCFqc29uVGV4dC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcHJvcGVydGllcyA9ICQucGFyc2VKU09OKGpzb25UZXh0KTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcHJvcGVydGllcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHByb3BlcnRpZXNbaV0uc2x1Zy5yZXBsYWNlKGF0dHJOYW1lUmVnZXgsIGF0dHJOYW1lVmFsdWUpO1xuICAgIH1cblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKSxcbiAgICAgIHVybDogcGFwaS5hamF4VXJsICsgJz9wYXBpLWFqYXg9Z2V0X3Byb3BlcnRpZXMnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pLnN1Y2Nlc3MocmVzID0+IHtcbiAgICAgIGxldCBodG1sID0gW1xuICAgICAgICAnPHRyPicsXG4gICAgICAgICAgJzx0ZCBjbGFzcz1cImhhbmRsZVwiPjxzcGFuPicgKyAoY291bnRlciArIDEpICsgJzwvc3Bhbj48L3RkPidcbiAgICAgIF07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBodG1sLnB1c2goJzx0ZD4nICsgcmVzW2ldICsgJzwvdGQ+Jyk7XG4gICAgICB9XG5cbiAgICAgIGh0bWwucHVzaCgnPHRkIGNsYXNzPVwibGFzdFwiPicpO1xuICAgICAgICBodG1sLnB1c2goJzxzcGFuPicpO1xuICAgICAgICAgIGh0bWwucHVzaCgnPGEgdGl0bGU9XCInICsgcGFwaUwxMG4ucmVtb3ZlICsgJ1wiIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXBlYXRlci1yZW1vdmUtaXRlbVwiPng8L2E+Jyk7XG4gICAgICAgIGh0bWwucHVzaCgnPC9zcGFuPicpO1xuICAgICAgaHRtbC5wdXNoKCc8L3RkPicpO1xuXG4gICAgICBsZXQgJHRlbXBsYXRlID0gJChodG1sLmpvaW4oJycpICsgJzwvdHI+Jyk7XG5cbiAgICAgICR0ZW1wbGF0ZS5maW5kKCdbbmFtZV0sW2RhdGEtc2x1Z10sIFtkYXRhLWlkXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgICB2YWx1ZSA9ICcnO1xuICAgICAgICBsZXQgICBhdHRyICA9ICcnO1xuICAgICAgICBjb25zdCAkZWwgPSAkKHRoaXMpO1xuICAgICAgICBjb25zdCBhdHRycyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzb3VyY2U6ICdkYXRhLXNsdWcnLFxuICAgICAgICAgICAgdGFyZ2V0OiAnZGF0YS1zbHVnJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNvdXJjZTogJ2RhdGEtaWQnLFxuICAgICAgICAgICAgdGFyZ2V0OiAnaWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzb3VyY2U6ICduYW1lJyxcbiAgICAgICAgICAgIHRhcmdldDogJ25hbWUnXG4gICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCRlbC5hdHRyKGF0dHJzW2ldLnNvdXJjZSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXR0ciAgPSBhdHRyc1tpXS50YXJnZXQ7XG4gICAgICAgICAgICB2YWx1ZSA9ICRlbC5hdHRyKGF0dHJzW2ldLnNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKGF0dHJOYW1lUmVnZXgsIGF0dHJOYW1lVmFsdWUpO1xuXG4gICAgICAgICRlbC5hdHRyKGF0dHIsIHZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICAkdGVtcGxhdGUuYXBwZW5kVG8oJHRhYmxlKTtcblxuICAgICAgLy8gVHJpZ2dlciB0aGUgcHJvcGVydHkgdGhhdCB3ZSBqdXN0IGFkZGVkLlxuICAgICAgJHRlbXBsYXRlXG4gICAgICAgIC5maW5kKCdbbmFtZSo9XCJfcHJvcGVydHlcIl0nKVxuICAgICAgICAudHJpZ2dlcigncGFwaS9wcm9wZXJ0eS9yZXBlYXRlci9hZGRlZCcpO1xuXG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgnPiB0cjpsYXN0JywgJHRhYmxlKS5vZmZzZXQoKS50b3BcbiAgICAgIH0pO1xuXG4gICAgICAkdGFibGVcbiAgICAgICAgLmNsb3Nlc3QoJy5wYXBpLXByb3BlcnR5LXJlcGVhdGVyJylcbiAgICAgICAgLmZpbmQoJy5wYXBpLXByb3BlcnR5LXJlcGVhdGVyLXJvd3MnKVxuICAgICAgICAudmFsKCR0YWJsZS5maW5kKCd0cicpLmxlbmd0aCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBlbGVtZW50cyB3aXRoIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgYmluZHMoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCcucGFwaS1wcm9wZXJ0eS1yZXBlYXRlciB0Ym9keScpLnNvcnRhYmxlKHtcbiAgICAgIHJldmVydDogdHJ1ZSxcbiAgICAgIGhhbmRsZTogJy5oYW5kbGUnLFxuICAgICAgaGVscGVyOiBmdW5jdGlvbiAoZSwgdWkpIHtcbiAgICAgICAgdWkuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykud2lkdGgoJCh0aGlzKS53aWR0aCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1aTtcbiAgICAgIH0sXG4gICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYudXBkYXRlUm93TnVtYmVyKCQodGhpcykuY2xvc2VzdCgnLnBhcGktcHJvcGVydHktcmVwZWF0ZXIgdGJvZHknKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBhcGktcHJvcGVydHktcmVwZWF0ZXIgLmJvdHRvbSBhLmJ1dHRvbicsIHRoaXMuYWRkKTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBhcGktcHJvcGVydHktcmVwZWF0ZXIgLnJlcGVhdGVyLXJlbW92ZS1pdGVtJywgdGhpcy5yZW1vdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGluIHRoZSByZXBlYXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgcmVtb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkdGhpcyAgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICR0Ym9keSA9ICR0aGlzLmNsb3Nlc3QoJy5wYXBpLXByb3BlcnR5LXJlcGVhdGVyIHRib2R5Jyk7XG5cbiAgICAkdGhpcy5jbG9zZXN0KCd0cicpLnJlbW92ZSgpO1xuXG4gICAgdGhpcy51cGRhdGVSb3dOdW1iZXIoJHRib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGFibGUgcm93IG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9ICR0Ym9keVxuICAgKi9cblxuICB1cGRhdGVSb3dOdW1iZXIoJHRib2R5KSB7XG4gICAgJHRib2R5LmZpbmQoJ3RyJykuZWFjaChpID0+IHtcbiAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICR0aGlzLmZpbmQoJ3RkOmZpcnN0LWNoaWxkIHNwYW4nKS50ZXh0KGkgKyAxKTtcblxuICAgICAgJHRoaXMuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lYWNoKCgpID0+IHtcbiAgICAgICAgJHRoaXMgPSAodGhpcyk7XG5cbiAgICAgICAgaWYgKCR0aGlzLmF0dHIoJ25hbWUnKSA9PT0gdW5kZWZpbmVkIHx8ICEkdGhpcy5hdHRyKCduYW1lJykubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJHRoaXMuYXR0cignbmFtZScsICR0aGlzLmF0dHIoJ25hbWUnKS5yZXBsYWNlKC8oXFxbXFxkK1xcXSkvLCAnWycgKyBpICsgJ10nKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICR0Ym9keVxuICAgICAgLmNsb3Nlc3QoJy5wYXBpLXByb3BlcnR5LXJlcGVhdGVyJylcbiAgICAgIC5maW5kKCcucGFwaS1wcm9wZXJ0eS1yZXBlYXRlci1yb3dzJylcbiAgICAgIC52YWwoJHRib2R5LmZpbmQoJ3RyJykubGVuZ3RoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcGVhdGVyO1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBVdGlscyBmcm9tICdwYXBpL3V0aWxzJztcblxuLyoqXG4gKiBQcm9wZXJ0eSBVcmwuXG4gKi9cblxuY2xhc3MgVXJsIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQcm9wZXJ0eSBVcmwuXG4gICAqL1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5ldyBVcmwoKS5iaW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuZXcgbWVkaWEgZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgYWRkKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICBVdGlscy53cE1lZGlhRWRpdG9yKCkub24oJ2luc2VydCcsIChhdHRhY2htZW50KSA9PiB7XG4gICAgICAkdGhpcy5wcmV2KCkudmFsKGF0dGFjaG1lbnQudXJsKTtcbiAgICB9KS5vcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBlbGVtZW50cyB3aXRoIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgYmluZHMoKSB7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYXBpLXVybC1tZWRpYS1idXR0b24nLCB0aGlzLmFkZCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVcmw7XG4iLCJjb25zdCB3cCA9IHdpbmRvdy53cDtcbmNvbnN0IF8gID0gd2luZG93Ll87XG5cbmNsYXNzIEltYWdlVmlldyBleHRlbmRzIHdwLkJhY2tib25lLlZpZXcge1xuXG4gIC8qKlxuICAgKiBUaGUgaW1hZ2UgdGVtcGxhdGUgdG8gY29tcGlsZS5cbiAgICovXG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiB3cC50ZW1wbGF0ZSgncGFwaS1pbWFnZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBpbWFnZSB0ZW1wbGF0ZSB3aXRoIHRoZSBnaXZlbiBkYXRhIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICovXG5cbiAgcmVuZGVyKGRhdGEpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUodGhpcy50ZW1wbGF0ZSgpKTtcbiAgICBjb25zdCBodG1sICAgICA9IHRlbXBsYXRlKGRhdGEpO1xuXG4gICAgdGhpcy4kZWwuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYXR0YWNobWVudFwiPicgKyBodG1sICsgJzwvZGl2PicpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VWaWV3O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY2xhc3MgQ29yZSB7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgUGFwaSBjb3JlIGNsYXNzLlxuICAgKi9cblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBsZXQgY29yZSA9IG5ldyBDb3JlKCk7XG5cbiAgICBjb3JlLmJpbmRzKCk7XG4gICAgY29yZS5zZXRFcXVhbEJveEhlaWdodHMoKTtcbiAgICBjb3JlLnNldFNlbGVjdGVkTWVudUl0ZW0oKTtcbiAgICBjb3JlLmFkZEN1cnJlbnRDbGFzc1RvTWVudUl0ZW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGVsZW1lbnRzIHdpdGggZnVuY3Rpb25zLlxuICAgKi9cblxuICBiaW5kcygpIHtcbiAgICAkKCcucGFwaS1ib3gtbGlzdCA+IGxpID4gcCcpLm9uKCdjbGljaycsIHRoaXMucmVkaXJlY3QpO1xuICAgICQoJ2lucHV0W25hbWU9XCJhZGQtbmV3LXBhZ2Utc2VhcmNoXCJdJykub24oJ2tleXVwJywgdGhpcy5zZWFyY2gpO1xuICAgICQoJ1tkYXRhLXBhcGktaHJlZl0nKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIHRoaXMucmVkaXJlY3QpO1xuXG4gICAgaWYgKCdzZWxlY3QyJyBpbiAkLmZuKSB7XG4gICAgICAkKCcuaW5zaWRlIC5wYXBpLXRhYmxlIHRyIC5wYXBpLXZlbmRvci1zZWxlY3QyJykuc2VsZWN0MigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3VycmVudCBjbGFzcyB0byBtZW51IGl0ZW0uXG4gICAqL1xuXG4gIGFkZEN1cnJlbnRDbGFzc1RvTWVudUl0ZW0oKSB7XG4gICAgbGV0ICRzdWJtZW51ID0gJCgnLndwLWhhcy1jdXJyZW50LXN1Ym1lbnUgLndwLXN1Ym1lbnUnKTtcbiAgICBsZXQgJG1lbnVpdGVtID0gJHN1Ym1lbnUuZmluZCgnYVtocmVmKj1cInBhcGktYWRkLW5ldy1wYWdlXCJdJykucGFyZW50KCk7XG5cbiAgICBpZiAoISRtZW51aXRlbS5oYXNDbGFzcygnY3VycmVudCcpICYmICEkc3VibWVudS5maW5kKCdsaS5jdXJyZW50JykubGVuZ3RoKSB7XG4gICAgICAkbWVudWl0ZW0uYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVkaXJlY3QgdG8gbG9jYXRpb24gZnJvbSBgcGFwaS1ocmVmYCBkYXRhIGF0dHJpYnV0ZVxuICAgKiBvciBjbG9zZXN0IHRhZyB3aXRoIGhyZWYgYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cblxuICByZWRpcmVjdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCAkdGhpcyAgICA9ICQodGhpcyk7XG4gICAgbGV0IHBhcGlIcmVmID0gJHRoaXMuZGF0YSgpLnBhcGlIcmVmO1xuXG4gICAgaWYgKHBhcGlIcmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHBhcGlIcmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJ1tocmVmXScpLmF0dHIoJ2hyZWYnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGluIHBhZ2UgdHlwZXMgYm94IGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlXG4gICAqL1xuXG4gIHNlYXJjaChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICBsZXQgJGxpc3QgPSAkKCcucGFwaS1ib3gtbGlzdCcpO1xuICAgIGxldCB2YWwgICA9ICR0aGlzLnZhbCgpO1xuXG4gICAgJGxpc3QuZmluZCgnLnBhcGktYm94LWl0ZW0nKS5lYWNoKCgpID0+IHtcbiAgICAgIGxldCAkaXRlbSA9ICQodGhpcyk7XG4gICAgICAkaXRlbVskaXRlbS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbCkgPT09IC0xID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKCcucGFwaS1oaWRlJyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGVxdWFsIGhlaWdodCBvbiBwYWdlIHR5cGUgYm94ZXMuXG4gICAqL1xuXG4gIHNldEVxdWFsQm94SGVpZ2h0cygpIHtcbiAgICBsZXQgYm94SXRlbXMgPSAkKCcucGFwaS1wb3N0LXR5cGUtaW5mbycpO1xuICAgIGxldCBib3hNYXhIZWlnaHQgPSAwO1xuXG4gICAgYm94SXRlbXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gJCh0aGlzKS5oZWlnaHQoKTtcbiAgICAgIGJveE1heEhlaWdodCA9IGhlaWdodCA+IGJveE1heEhlaWdodCA/IGhlaWdodCA6IGJveE1heEhlaWdodDtcbiAgICB9KTtcblxuICAgIGJveEl0ZW1zLmhlaWdodChib3hNYXhIZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBzZWxlY3RlZCBtZW51IGl0ZW0gaWYgaXQgaXNuJ3Qgc2VsZWN0ZWQuXG4gICAqL1xuXG4gIHNldFNlbGVjdGVkTWVudUl0ZW0oKSB7XG4gICAgbGV0IGhyZWYgPSB0eXBlb2Ygd2luZG93LmxvY2F0aW9uID09PSAnc3RyaW5nJyA/IHdpbmRvdy5sb2NhdGlvbiA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIGxldCAkYWRtaW5tZW51ID0gJCgnI2FkbWlubWVudScpO1xuXG4gICAgaWYgKCEkYWRtaW5tZW51LmZpbmQoJ2xpLmN1cnJlbnQgPiBhLmN1cnJlbnQnKS5sZW5ndGgpIHtcbiAgICAgIGhyZWYgPSBocmVmLnN1YnN0cihocmVmLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICQoJ2FbaHJlZj1cIicgKyBocmVmICsgJ1wiXScsICRhZG1pbm1lbnUpLmFkZENsYXNzKCdjdXJyZW50JykucGFyZW50KCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb3JlO1xuIiwiaW1wb3J0IENvcmUgZnJvbSAncGFwaS9jb3JlJztcbmltcG9ydCBSZXF1aXJlZCBmcm9tICdwYXBpL3JlcXVpcmVkJztcbmltcG9ydCBUYWJzIGZyb20gJ3BhcGkvdGFicyc7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhbGwgbmVjZXNzYXJ5IGNvcmUgY2xhc3Nlcy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIENvcmUuaW5pdCgpO1xuICBSZXF1aXJlZC5pbml0KCk7XG4gIFRhYnMuaW5pdCgpO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3QgcGFwaUwxMG4gPSB3aW5kb3cucGFwaUwxMG47XG5cbmNsYXNzIFJlcXVpcmVkIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQYXBpIGNvcmUgY2xhc3MuXG4gICAqL1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5ldyBSZXF1aXJlZCgpLmJpbmRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBlbGVtZW50cyB3aXRoIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgYmluZHMoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHRoaXMucmVxdWlyZWRMaW5rKTtcbiAgICAkKCcjcHVibGlzaCcpLm9uKCdjbGljaycsIHRoaXMucHVibGlzaFBvc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hdGUgZG93biB0byByZXF1aXJlZCBmaWVsZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgcmVxdWlyZWRMaW5rKGUpIHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6ICQoJ1tmb3I9JyArICQodGhpcykuYXR0cignaHJlZicpLnJlcGxhY2UoJyMnLCAnJykgKyAnXScpLm9mZnNldCgpLnRvcCAtIDQ1XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdCBhbGwgcmVxdWlyZWQgZmllbGRzIHRoYXQgZG9uJ3QgaGF2ZSBhbnkgdmFsdWVcbiAgICogYW5kIG91dHB1dCBlcnJvciBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cblxuICBwdWJsaXNoUG9zdChlKSB7XG4gICAgY29uc3QgJGJ1dHRvbiAgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRmaWVsZHMgID0gJCgnLnBhcGktcnEnKTtcbiAgICBjb25zdCAkc3Bpbm5lciA9ICQoJyNwdWJsaXNoaW5nLWFjdGlvbiAuc3Bpbm5lcicpO1xuICAgIGxldCAgICRlcnJvcnMgID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9ICRmaWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgJHRoaXMgPSAkKCRmaWVsZHNbaV0pO1xuXG4gICAgICBpZiAoJHRoaXMucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ21ldGFib3gtcHJlZnMnKSB8fMKgISR0aGlzLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoKTtcbiAgICAgIGxldCAkZmllbGQgPSAkKCdbbmFtZT1cIicgKyBkYXRhLnByb3BlcnR5SWQgKyAnXCJdJyk7XG5cbiAgICAgIGlmICghJGZpZWxkLmxlbmd0aCkge1xuICAgICAgICAkZmllbGQgPSAkKCdbbmFtZT1cIicgKyBkYXRhLnByb3BlcnR5SWQgKyAnW11cIl0nKS5maXJzdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJGZpZWxkLnZhbCgpID09PSB1bmRlZmluZWQgfHzCoCEkZmllbGQudmFsKCkubGVuZ3RoKSB7XG4gICAgICAgICRlcnJvcnMucHVzaCgkZmllbGRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgJHNwaW5uZXIuaGlkZSgpO1xuICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcygnYnV0dG9uLXByaW1hcnktZGlzYWJsZWQnKTtcbiAgICAgICQoJyNtZXNzYWdlJykucmVtb3ZlKCk7XG5cbiAgICAgIGxldCBpdGVtcyA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9ICRlcnJvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxldCAkZmllbGQgPSAkKCRlcnJvcnNbaV0pO1xuICAgICAgICBsZXQgZGF0YSA9ICRmaWVsZC5kYXRhKCk7XG4gICAgICAgIGl0ZW1zICs9ICc8YSBjbGFzcz1cInBhcGktcnEtbGlua1wiIGhyZWY9XCIjJyArIGRhdGEucHJvcGVydHlJZCArICdcIj4nICsgZGF0YS5wcm9wZXJ0eU5hbWUgKyAnPC9hPic7XG5cbiAgICAgICAgaWYgKGkgKyAxICE9PSAkZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIGl0ZW1zICs9ICcsICc7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcud3JhcCBoMicpLmFmdGVyKCc8ZGl2IGlkPVwibWVzc2FnZVwiIGNsYXNzPVwiZXJyb3IgYmVsb3ctaDJcIj48cD4nICsgcGFwaUwxMG4ucmVxdWlyZWRFcnJvciArICcgJyArIGl0ZW1zICsgJzwvcD48L2Rpdj4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1aXJlZDtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNsYXNzIFRhYnMge1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIFBhcGkgdGFicyBjbGFzcy5cbiAgICovXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbGV0IHRhYnMgPSBuZXcgVGFicygpO1xuXG4gICAgdGFicy5iaW5kcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgZWxlbWVudHMgd2l0aCBmdW5jdGlvbnMuXG4gICAqL1xuXG4gIGJpbmRzKCkge1xuICAgICQoJ2FbZGF0YS1wYXBpLXRhYl0nKS5vbignY2xpY2snLCB0aGlzLmNoYW5nZVRhYik7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRhYi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGVcbiAgICovXG5cbiAgY2hhbmdlVGFiKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgIGxldCB0YWIgPSAkdGhpcy5kYXRhKCkucGFwaVRhYjtcblxuICAgICQoJ2FbZGF0YS1wYXBpLXRhYl0nKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRoaXMucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnZGl2W2RhdGEtcGFwaS10YWJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCcucGFwaS1oaWRlJyk7XG4gICAgJCgnZGl2W2RhdGEtcGFwaS10YWI9XCInICsgdGFiICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKS5yZW1vdmVDbGFzcygncGFwaS1zaG93Jyk7XG4gIH1cblxufVxuIiwiY29uc3Qgd3AgPSB3aW5kb3cud3A7XG5cbmNsYXNzIFV0aWxzIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBQYXBpIGNvcmUgY2xhc3MuXG4gICAqL1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGxldCB1dGlscyA9IG5ldyBVdGlscygpO1xuXG4gICAgdXRpbHMuYmluZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBnaXZlbiBzdHJpbmcgaXMgYSBpbWFnZSB2aWEgcmVnZXguXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG5cbiAgc3RhdGljIGlzSW1hZ2UodXJsKSB7XG4gICAgcmV0dXJuIC9cXC4oanBlZ3xqcGd8Z2lmfHBuZykkLy50ZXN0KHVybC50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIFdvcmRQcmVzcyBtZWRpYSBlZGl0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAqL1xuXG4gIHN0YXRpYyB3cE1lZGlhRWRpdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoVXRpbHMud3BNZWRpYUZyYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIFV0aWxzLndwTWVkaWFGcmFtZS5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgVXRpbHMud3BNZWRpYUZyYW1lID0gd3AubWVkaWEob3B0aW9ucylcbiAgICAgIC5vbignc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2htZW50cyA9IFV0aWxzLndwTWVkaWFGcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJykudG9KU09OKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXR0YWNobWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGF0dGFjaG1lbnRzW2ldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBVdGlscy53cE1lZGlhRnJhbWUudHJpZ2dlcignaW5zZXJ0JywgYXR0YWNobWVudHNbaV0sIFV0aWxzLmlzSW1hZ2UoYXR0YWNobWVudHNbaV0udXJsKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gVXRpbHMud3BNZWRpYUZyYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBtZWRpYSBmcmFtZS5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IHdwTWVkaWFGcmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy53cE1lZGlhRnJhbWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG1lZGlhIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gICAqL1xuXG4gIHN0YXRpYyBzZXQgd3BNZWRpYUZyYW1lKG9iaikge1xuICAgIHRoaXMud3BNZWRpYUZyYW1lID0gb2JqO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG4iXX0=
