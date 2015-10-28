angular.module('productManager.productList', [])
.controller('productListController', ['$rootScope', '$scope', 'Inventory', function ($rootScope, $scope, Inventory) {
  $scope.data = {};
  $scope.query = '';

  Inventory.retrieveProducts().then(function (products) {
    $scope.data.products = products;
  });

  $scope.selectProduct = function(id) {
    Inventory.select(id);
  };

  $scope.newProduct = function() {
    $rootScope.$emit('productList.createNewProduct');
  }
}]);