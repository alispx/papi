import $ from 'jquery';
import Utils from 'papi/utils';
import ImageView from 'papi-properties/views/image-view';

/**
 * Property Image.
 *
 * Using the build in media management in WordPress.
 */

class Image {

  /**
   * Initialize Property Image.
   */

  static init() {
    new Image().binds();
  }

  /**
   * Bind elements with functions.
   */

  binds() {
    $('.inside .papi-table:not(.papi-table-template) > tbody .papi-property-image.gallery .attachments').sortable({
      revert: true
    });

    $(document).on('click', '.papi-property-image .papi-image-select > .button', this.add);
    $(document).on('hover', '.papi-property-image .attachment', this.hover);
    $(document).on('click', '.papi-property-image .attachment a', this.remove);
    $(document).on('papi/property/repeater/added', '[value="image"]', this.update);
    $(document).on('click', '.papi-property-image .attachment', this.replace);
  }

  /**
   * Add new image.
   *
   * @param {object} e
   */

  add(e) {
    e.preventDefault();

    const $this    = $(this);
    const $prop    = $this.closest('.papi-property-image');
    const $select  = $this.closest('p');
    const $target  = $prop.find('.attachments');
    const multiple = $prop.hasClass('gallery');
    const slug     = $this.data().slug;

    Utils.wpMediaEditor({
      library: {
        type: 'image'
      },
      multiple: multiple
    }).on('insert', (attachment, isImage) => {
      if (!isImage) {
        return;
      }

      new ImageView({
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

  /**
   * Toggle the remove button.
   *
   * @param {object} e
   */

  hover(e) {
    e.preventDefault();

    $(this).find('a').toggle();
  }

  /**
   * Remove a image.
   *
   * @param {object} e
   */

  remove(e) {
    e.preventDefault();

    const $this = $(this);

    $this
      .closest('.papi-property-image')
      .find('.papi-image-select')
      .show();

    $this
      .closest('.attachment')
      .remove();
  }

  /**
   * Replace image with another one.
   *
   * @param {object} e
   */

  replace(e) {
    e.preventDefault();

    const $this  = $(this);
    const $img   = $this.find('img[src]');
    const $input = $this.find('input[type=hidden]');
    const postId = $input.val();

    Utils.wpMediaEditor({
      library: {
        type: 'image'
      },
      multiple: false
    }).on('open', () => {
      let   selection = Utils.wpMediaFrame.state().get('selection');
      const attachment = window.wp.media.attachment(postId);

      attachment.fetch();
      selection.add(attachment ? [attachment] : []);
    }).on('insert', (attachment, isImage) => {
      attachment.sizes.thumbnail = attachment.sizes.thumbnail || attachment.url;
      $img.attr('src', attachment.sizes.thumbnail);

      $input.val(attachment.id);
    }).open();

  }

  /**
   * Update when added to repeater.
   */

  update(e) {
    e.preventDefault();

    $(this)
      .prev()
      .find('.attachments')
      .sortable({
        revert: true
      });
  }

}

export default Image;
