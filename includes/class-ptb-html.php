<?php

/**
 * Page Type Builder Html class.
 */

class PTB_Html {

  /**
   * Generate HTML label tag.
   *
   * @param string $title
   * @param string $for
   * @since 1.0
   *
   * @return string
   */

  public static function label ($title, $for) {
    return '<label for="' . $for . '">' . $title . '</label>';
  }

  /**
   * Generate HTML tr tag.
   *
   * @param string $inner
   * @since 1.0
   *
   * @return string
   */

  public static function tr ($inner) {
    return '<tr>' . $inner . '</tr>';
  }

  /**
   * Generate HTML td tag.
   *
   * @param string $inner
   * @since 1.0
   *
   * @return string
   */

  public static function td ($inner) {
    return '<td>' . $inner . '</td>';
  }

  /**
   * Generate HTML input hidden tag.
   *
   * @param string $name
   * @param string $value
   * @since 1.0
   *
   * @return string
   */

  public static function hidden ($name, $value) {
    return '<input type="hidden" name="' . $name . '" value="' . $value . '" />';
  }

}