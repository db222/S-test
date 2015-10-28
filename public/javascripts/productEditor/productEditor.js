angular.module('productManager.productEditor', []) 

.controller('productEditorController', ['$rootScope', '$scope', 'Inventory', function ($rootScope, $scope, Inventory) {
  $scope.product = {}
  var toUnbind = [];
  toUnbind.push($rootScope.$on('Inventory.productSelected', function(){ 
    $scope.product = jQuery.extend(true, {}, Inventory.getSelectedProduct());

    for(var key in $scope.product) {
      console.log('this is the key ' + key + ' this is the value ' + $scope.product[key]);
      if(key === 'options') {
        for(var optKey in $scope.product[key]) {
          console.log('option : ' + optKey + ' the value is ', $scope.product[key][optKey]);
        }
      }
    }

  }));

  toUnbind.push($rootScope.$on('productList.createNewProduct', function() {
    $scope.product = {};
  }));



  $scope.saveProduct = function() {
    if($scope.product) {
      Inventory.saveProduct($scope.product);
    }
  }

  $scope.resetProduct = function() {
    if($scope.product) {
      $scope.product = $.extend(true, {}, Inventory.retrieveProductByID($scope.product.id));
    }
  }

  $scope.$on('$destroy', function() { 
    for(var i = 0; i < toUnbind.length; ++i) {
      toUnbind[i]();
    }
  });
}]);
