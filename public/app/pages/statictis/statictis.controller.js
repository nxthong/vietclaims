/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.statictis')
    .controller('statictisCtrl', statictisCtrl);

  /** @ngInject */
  function statictisCtrl($element, baConfig, layoutPaths, $firebase, $filter) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var ref = new Firebase("https://laluna.firebaseio.com/revenues");
    var sync = $firebase(ref);
    var DB = sync.$asArray();
    var dateCur = new Date();
    
    var chartMoney = [];
    var date = dateCur.getFullYear().toString() + ((dateCur.getMonth() > 9) ? "/" + (dateCur.getMonth() + 1) : "/0" + (dateCur.getMonth() + 1));
    
    console.log(date);
    
    angular.forEach(DB, function(value, key) {
      if(value.includes(date)) {
        chartMoney.push({
                          "date": value.date.replace(/\//g, '-'),
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": value.value
                        })
      }
    });
    
    
    var chart = AmCharts.makeChart(id, {
      "type": "serial",
      "theme": "none",
      "color": layoutColors.defaultText,
      "dataDateFormat": "YYYY-MM-DD",
      "precision": 2,
      "valueAxes": [
                      {
                        color: layoutColors.defaultText,
                        axisColor: layoutColors.defaultText,
                        gridColor: layoutColors.defaultText,
                        "id": "v1",
                        "title": "Values",
                        "position": "left",
                        "autoGridCount": false,
                        "labelFunction": function(value) {
                          return "$" + Math.round(value) + "M";
                        }
                      },
                      {
                        color: layoutColors.defaultText,
                        axisColor: layoutColors.defaultText,
                        gridColor: layoutColors.defaultText,
                        "id": "v2",
                        "title": "Market Days",
                        "gridAlpha": 0,
                        "position": "right",
                        "autoGridCount": false
                      }
                    ],
      "graphs": [
                  {
                    "id": "g3",
                    color: layoutColors.defaultText,
                    "valueAxis": "v1",
                    "lineColor": layoutColors.primaryLight,
                    "fillColors": layoutColors.primaryLight,
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.8,
                    "type": "column",
                    "title": "Moneys",
                    "valueField": "money",
                    "clustered": false,
                    "columnWidth": 0.5,
                    "lineColorField" : layoutColors.defaultText,
                    "legendValueText": "$[[value]]M",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>"
                  },
                  {
                    "id": "g4",
                    "valueAxis": "v1",
                    color: layoutColors.defaultText,
                    "lineColor": layoutColors.primary,
                    "fillColors": layoutColors.primary,
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.9,
                    "type": "column",
                    "title": "Datademo",
                    "valueField": "sales1",
                    "clustered": false,
                    "columnWidth": 0.3,
                    "legendValueText": "$[[value]]M",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>"
                  },
                  {
                    "id": "g1",
                    "valueAxis": "v2",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    color: layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": layoutColors.danger,
                    "type": "smoothedLine",
                    "title": "Customer",
                    "useLineColorForBulletBorder": true,
                    "valueField": "market1",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
                  },
                  {
                    "id": "g2",
                    "valueAxis": "v2",
                    color: layoutColors.defaultText,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": layoutColors.warning,
                    "type": "smoothedLine",
                    "dashLength": 5,
                    "title": "Market Days ALL",
                    "useLineColorForBulletBorder": true,
                    "valueField": "market2",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
                  }
                ],
      "chartScrollbar": {
                          "graph": "g1",
                          "oppositeAxis": false,
                          "offset": 30,
                          gridAlpha: 0,
                          color: layoutColors.defaultText,
                          scrollbarHeight: 50,
                          backgroundAlpha: 0,
                          selectedBackgroundAlpha: 0.05,
                          selectedBackgroundColor: layoutColors.defaultText,
                          graphFillAlpha: 0,
                          autoGridCount: true,
                          selectedGraphFillAlpha: 0,
                          graphLineAlpha: 0.2,
                          selectedGraphLineColor: layoutColors.defaultText,
                          selectedGraphLineAlpha: 1
                        },
      "chartCursor": {
                        "pan": true,
                        "cursorColor" : layoutColors.danger,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha": 0,
                        "valueLineAlpha": 0.2
                      },
      "categoryField": "date",
      "categoryAxis": {
                        "axisColor": layoutColors.defaultText,
                        "color": layoutColors.defaultText,
                        "gridColor": layoutColors.defaultText,
                        "parseDates": true,
                        "dashLength": 1,
                        "minorGridEnabled": true
                      },
      "legend": {
                  "useGraphSettings": true,
                  "position": "top",
                  "color": layoutColors.defaultText
                },
      "balloon": {
                    "borderThickness": 1,
                    "shadowAlpha": 0
                  },
      "export": {
                  "enabled": true
                },
      "dataProvider": [
                        {
                          "date": "2013-01-01",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-02",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-03",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-04",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-05",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-06",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-07",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-08",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-09",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-10",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-11",
                          "market1": 71,
                          "market2": 75,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-12",
                          "market1": 74,
                          "market2": 78,
                          "sales1": 4,
                          "money": 6
                        },
                        {
                          "date": "2013-01-13",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-14",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-15",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-16",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-17",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-18",
                          "market1": 78,
                          "market2": 88,
                          "sales1": 5,
                          "money": 2
                        },
                        {
                          "date": "2013-01-19",
                          "market1": 85,
                          "market2": 89,
                          "sales1": 8,
                          "money": 9
                        },
                        {
                          "date": "2013-01-20",
                          "market1": 82,
                          "market2": 89,
                          "sales1": 9,
                          "money": 6
                        },
                        {
                          "date": "2013-01-21",
                          "market1": 83,
                          "market2": 85,
                          "sales1": 3,
                          "money": 5
                        },
                        {
                          "date": "2013-01-22",
                          "market1": 88,
                          "market2": 92,
                          "sales1": 5,
                          "money": 7
                        },
                        {
                          "date": "2013-01-23",
                          "market1": 85,
                          "market2": 90,
                          "sales1": 7,
                          "money": 6
                        },
                        {
                          "date": "2013-01-24",
                          "market1": 85,
                          "market2": 91,
                          "sales1": 9,
                          "money": 5
                        },
                        {
                          "date": "2013-01-25",
                          "market1": 80,
                          "market2": 84,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-26",
                          "market1": 87,
                          "market2": 92,
                          "sales1": 4,
                          "money": 8
                        },
                        {
                          "date": "2013-01-27",
                          "market1": 84,
                          "market2": 87,
                          "sales1": 3,
                          "money": 4
                        },
                        {
                          "date": "2013-01-28",
                          "market1": 83,
                          "market2": 88,
                          "sales1": 5,
                          "money": 7
                        },
                        {
                          "date": "2013-01-29",
                          "market1": 84,
                          "market2": 87,
                          "sales1": 5,
                          "money": 8
                        },
                        {
                          "date": "2013-01-30",
                          "market1": 81,
                          "market2": 85,
                          "sales1": 4,
                          "money": 7
                        },
                        {
                          "date": "2013-01-31",
                          "market1": 81,
                          "market2": 85,
                          "sales1": 4,
                          "money": 7
                        }
                      ],
      pathToImages: layoutPaths.images.amChart
    });
  }

})();
