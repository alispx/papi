import $ from 'jquery';

const papiL10n = window.papiL10n;

/**
 * Property Repeater.
 */

class Repeater {

  /**
   * Initialize Property Repeater.
   */

  static init() {
    new Repeater().binds();
  }

  /**
   * Add new media file.
   *
   * @param {object} e
   */

  add(e) {
    e.preventDefault();

    const $this         = $(this);
    const $repeater     = $this.closest('.papi-property-repeater');
    const $table        = $repeater.find('> .papi-table tbody');
    const counter       = $table.children().length;
    const attrNameRegex = /\[(\d+)\]/g;
    const attrNameValue = '[' + counter + ']';
    const jsonText      = $($repeater.data().jsonId).text();

    if (!jsonText.length) {
      return;
    }

    let properties = $.parseJSON(jsonText);

    for (let i = 0, l = properties.length; i < l; i++) {
      properties[i].slug.replace(attrNameRegex, attrNameValue);
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(properties),
      url: papi.ajaxUrl + '?papi-ajax=get_properties',
      dataType: 'json'
    }).success(res => {
      let html = [
        '<tr>',
          '<td class="handle"><span>' + (counter + 1) + '</span></td>'
      ];

      for (let i = 0, l = res.length; i < l; i++) {
        html.push('<td>' + res[i] + '</td>');
      }

      html.push('<td class="last">');
        html.push('<span>');
          html.push('<a title="' + papiL10n.remove + '" href="#" class="repeater-remove-item">x</a>');
        html.push('</span>');
      html.push('</td>');

      let $template = $(html.join('') + '</tr>');

      $template.find('[name],[data-slug], [data-id]').each(function () {
        let   value = '';
        let   attr  = '';
        const $el = $(this);
        const attrs = [
          {
            source: 'data-slug',
            target: 'data-slug',
          },
          {
            source: 'data-id',
            target: 'id'
          },
          {
            source: 'name',
            target: 'name'
          }
        ];

        for (let i = 0, l = attrs.length; i < l; i++) {
          if ($el.attr(attrs[i].source) !== undefined) {
            attr  = attrs[i].target;
            value = $el.attr(attrs[i].source);
          }
        }

        value = value.replace(attrNameRegex, attrNameValue);

        $el.attr(attr, value);
      });

      $template.appendTo($table);

      // Trigger the property that we just added.
      $template
        .find('[name*="_property"]')
        .trigger('papi/property/repeater/added');

      $('html, body').animate({
        scrollTop: $('> tr:last', $table).offset().top
      });

      $table
        .closest('.papi-property-repeater')
        .find('.papi-property-repeater-rows')
        .val($table.find('tr').length);
    });
  }

  /**
   * Bind elements with functions.
   */

  binds() {
    const self = this;

    $('.papi-property-repeater tbody').sortable({
      revert: true,
      handle: '.handle',
      helper: function (e, ui) {
        ui.children().each(function() {
          $(this).width($(this).width());
        });
        return ui;
      },
      stop: function () {
        self.updateRowNumber($(this).closest('.papi-property-repeater tbody'));
      }
    });

    $(document).on('click', '.papi-property-repeater .bottom a.button', this.add);
    $(document).on('click', '.papi-property-repeater .repeater-remove-item', this.remove);
  }

  /**
   * Remove item in the repeater.
   *
   * @param {object} e
   */

  remove(e) {
    e.preventDefault();

    const $this  = $(this);
    const $tbody = $this.closest('.papi-property-repeater tbody');

    $this.closest('tr').remove();

    this.updateRowNumber($tbody);
  }

  /**
   * Update table row number.
   *
   * @param {object} $tbody
   */

  updateRowNumber($tbody) {
    $tbody.find('tr').each(i => {
      let $this = $(this);

      $this.find('td:first-child span').text(i + 1);

      $this.find('input, select, textarea').each(() => {
        $this = (this);

        if ($this.attr('name') === undefined || !$this.attr('name').length) {
          return;
        }

        $this.attr('name', $this.attr('name').replace(/(\[\d+\])/, '[' + i + ']'));
      });
    });

    $tbody
      .closest('.papi-property-repeater')
      .find('.papi-property-repeater-rows')
      .val($tbody.find('tr').length);
  }

}

export default Repeater;
