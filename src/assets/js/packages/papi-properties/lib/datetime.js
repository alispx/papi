import $ from 'jquery';

/**
 * Property Datetime.
 *
 * Using Pikaday with time fields and some custom fixes.
 */

class Datetime {

  /**
   * Initialize Property Datetime.
   */

  static init() {
    new Datetime().binds();
  }

  /**
   * Bind elements with functions.
   */

  binds() {
    this.pikaday($('.inside > .papi-table > tbody > tr > td > input.papi-property-datetime'));
    this.pikaday($('.papi-table .papi-table:not(.papi-table-template) input.papi-property-datetime'));

    $(document).on('papi/property/repeater/added', '[value="datetime"]', this.updateSelect);
  }

  /**
   * Initialize Pikaday.
   *
   * @param {object} $prop
   */

  pikaday($props) {
    // Don't proceed if Pikaday is undefined.
    if (window.Pikaday === undefined) {
      return;
    }

    if (!$props.length) {
      return;
    }

    $props.each(() => {
      let $prop = $(this);
      let settings = $prop.data().settings;

      // Fixes to 24 hours actually works if you forget to change the format.
      if (settings.use24hour) {
        settings.format = settings.format.replace(/hh/, 'HH');
      }

      settings.field = $prop[0];

      new window.Pikaday(settings);
    });
  }

  /**
   * Initialize pikaday field when added to repeater.
   *
   * @param {object} e
   */

   updateSelect(e) {
     e.preventDefault();

     this.pikaday($(this).prev());
  }
}

export default Datetime;
