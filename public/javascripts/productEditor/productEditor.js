angular.module('productManager.productEditor', ['base64']) 
.controller('productEditorController', ['$base64', '$rootScope', '$scope', 'Inventory', function ($base64, $rootScope, $scope, Inventory) {
  var init = function(product) {
    $scope.product = {};
    $scope.tags = [];
    $scope.newTag = '';
    $scope.variants = { 
                      inUse   : []
                    };

    if(product) {
      $scope.product = jQuery.extend(true, {}, product);
      if(product.tags.length) {
        $scope.tags = $scope.product.tags.split(', ');
      }
    }
  }

  init();

  var toUnbind = [];
  toUnbind.push($rootScope.$on('Inventory.productSelected', function(){ 
    init(Inventory.getSelectedProduct());
    for(var key in $scope.product) {
      if(key === 'options') {
        console.log($scope.product[key]);
      }
    }

  }));

  toUnbind.push($rootScope.$on('productList.createNewProduct', function() {
    init();
  }));

  $scope.addTag = function() {
    if($scope.newTag.length) {
      if($scope.tags.indexOf($scope.newTag) === -1) {
        $scope.tags.push($scope.newTag);
        $scope.newTag = '';
      }
    }
  }

  $scope.removeTag = function(tag) {
    var index = $scope.tags.indexOf(tag);
    if(index !== -1) {
      $scope.tags.splice(index, 1);
    }
  }

  $scope.saveProduct = function() {
    if($scope.product) {
      $scope.product.tags = $scope.tags.join(", ");
      Inventory.saveProduct($scope.product);
    }
  }

  $scope.deleteProduct = function() {
    if($scope.product) {
      Inventory.deleteProduct($scope.product);
      init();
    }
  }

  $scope.resetProduct = function() {
    if($scope.product) {
      $scope.product = $.extend(true, {}, Inventory.retrieveProductByID($scope.product.id));
    }
  }

  $scope.uploadFile = function(files) {
    if(!fileInput.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)){
      return;
    }

  }

  $scope.addVariant = function() {
    $scope.variants.inUse.push('');
  };

  $scope.$on('$destroy', function() { 
    for(var i = 0; i < toUnbind.length; ++i) {
      toUnbind[i]();
    }
  });
}]);
