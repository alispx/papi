<?php

/**
 * Plugin Name: PageTypeBuilder
 * Description: PageTypeBuilder for WordPress
 * Author: Fredrik Forsmo - Isotop AB
 * Author URI: http://forsmo.me/
 * Version: 1.0
 * Plugin URI: http://opensource.isotop.se/wordpress/pagetypebuilder
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

/**
 * Page Type Builder Loader class.
 */

class PTB_Loader {

  /**
   * The instance of Page Type Builder.
   *
   * @since 1.0
   *
   * @var object
   */

  private static $instance;

  /**
   * Page Type Bulider instance.
   *
   * @since 1.0
   *
   * @return object
   */

  public static function instance () {
    if (!isset(self::$instance)) {
      self::$instance = new PTB_Loader;
      self::$instance->constants();
      self::$instance->setup_globals();
      self::$instance->require_files();
      self::$instance->setup_requried();
      self::$instance->setup_actions();
    }
    return self::$instance;
  }

  /**
   * Construct. Nothing to see.
   *
   * @since 1.0
   * @access private
   */

  private function __construct () {}

  /**
   * Bootstrap constants
   *
   * @since 1.0
   * @access private
   */

  private function constants () {
    // Path to Page Type Builder plugin directory
    if (!defined('PTB_PLUGIN_DIR')) {
      define('PTB_PLUGIN_DIR', trailingslashit(WP_PLUGIN_DIR . '/wp-pagetypebuilder'));
    }

    // URL to Page Type Builder plugin directory
    if (!defined('PTB_PLUGIN_URL')) {
      $plugin_url = plugin_dir_url(__FILE__);

      if (is_ssl()) {
        $plugin_url = str_replace('http://', 'https://', $plugin_url);
      }

      define('PTB_PLUGIN_URL', $plugin_url);
    }

    if (!defined('PTB_DIR')) {
      define('PTB_DIR', PTB_PLUGIN_DIR . 'pages/');
    }

    if (!defined('PTB_META_KEY')) {
      define('PTB_META_KEY', 'page_type_builder');
    }
  }

  /**
   * Include files.
   *
   * @since 1.0
   * @access private
   */

  private function require_files () {
    require_once($this->plugin_dir . 'includes/ptb-functions.php');
    require_once($this->plugin_dir . 'includes/class-ptb-html.php');
    require_once($this->plugin_dir . 'includes/class-ptb-core.php');
    require_once($this->plugin_dir . 'includes/class-ptb-view.php');
    require_once($this->plugin_dir . 'includes/class-ptb-properties-base.php');
    require_once($this->plugin_dir . 'includes/class-ptb-properties.php');
    require_once($this->plugin_dir . 'includes/class-ptb-base.php');
  }

  /**
   * Setup required files.
   *
   * @since 1.0
   * @access private
   */

  private function setup_requried () {
    $this->core = new PTB_Core;
  }

  /**
   * Setup globals.
   *
   * @since 1.0
   * @access private
   */

  private function setup_globals () {
    $this->file       = __FILE__;
    $this->basename   = plugin_basename($this->file);
    $this->plugin_dir = PTB_PLUGIN_DIR;
    $this->plugin_url = PTB_PLUGIN_URL;

    $this->name       = __('Page Type Builder', 'ptb');
  }

  /**
   * Setup the default hooks and actions.
   *
   * @since 1.0
   * @access private
   */

  private function setup_actions () {
    add_action('activate_' . $this->basename, 'ptb_activation');
    add_action('deactivate_' . $this->basename, 'ptb_deactivation');
  }
}

/**
 * Return the instance of Page Type Builder to everyone.
 *
 * @since 1.0
 *
 * @return object
 */

function page_type_builder () {
  return PTB_Loader::instance();
}

// Let's make it global too!
$_GLOBALS['ptb'] = &page_type_builder();