/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .config(config);

  /** @ngInject */
  function config(baConfigProvider, colorHelper) {
    // baConfigProvider.changeTheme({blur: true});
    
    // baConfigProvider.changeColors({
    //   default: '#ffffff',
    //   defaultText: '#ffffff',
    //   dashboard: {
    //     white: '#ffffff',
    //   },
    // });
  }
})();
