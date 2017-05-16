/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.revenue', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('revenue', {
          url: '/revenue',
          templateUrl: 'app/pages/revenue/revenue.html',
          title: 'Revenue Thongnx',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 0,
          },
        });
  }
})();
