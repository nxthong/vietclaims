/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.statictis', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('statictis', {
          url: '/statictis',
          templateUrl: 'app/pages/statictis/statictis.html',
          title: 'Statictis',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 0,
          },
        });
  }
})();
