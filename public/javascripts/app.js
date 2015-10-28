var app = angular.module('productManager', [
  'ui.router',
  'productManager.services',
  'productManager.productList',
  'productManager.productEditor'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state("index", {
      url: '',
      views: {
        "productList" : {
          controller  : 'productListController',
          templateUrl : "javascripts/productList/productList.html"
        },
        'productEditor' : {
          controller  : 'productEditorController',
          templateUrl : 'javascripts/productEditor/productEditor.html'
        }
      }
    });
  });