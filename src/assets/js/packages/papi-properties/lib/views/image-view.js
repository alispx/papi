const wp = window.wp;
const _  = window._;

class ImageView extends wp.Backbone.View {

  /**
   * The image template to compile.
   */

  get template() {
    return wp.template('papi-image');
  }

  /**
   * Render image template with the given data object.
   *
   * @param {object} data
   */

  render(data) {
    const template = _.template(this.template());
    const html     = template(data);

    this.$el.append('<div class="attachment">' + html + '</div>');
  }

}

export default ImageView;
