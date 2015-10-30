angular.module('productManager.productEditor', []) 

.controller('productEditorController', ['$rootScope', '$scope', 'Inventory', '$sanitize', function ($rootScope, $scope, Inventory, $sanitize) {
  $scope.product = {}
  $scope.tags = [];
  var toUnbind = [];
  toUnbind.push($rootScope.$on('Inventory.productSelected', function(){ 
    $scope.product = jQuery.extend(true, {}, Inventory.getSelectedProduct());
    $scope.tags = $scope.product.tags.split(", ");
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
    $scope.tags = [];
  }));

  $scope.addTag = function() {

  }

  $scope.saveProduct = function() {
    if($scope.product) {
      $scope.product.tags = $scope.tags.join(", ");
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
