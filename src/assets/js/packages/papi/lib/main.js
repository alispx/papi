import Core from 'papi/core';
import Required from 'papi/required';
import Tabs from 'papi/tabs';

/**
 * Initialize all necessary core classes.
 */

export function init() {
  'use strict';

  Core.init();
  Required.init();
  Tabs.init();
}
