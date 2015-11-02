angular.module('productManager.productEditor', []) 
.controller('productEditorController', ['$rootScope', '$scope', 'Inventory', function ($rootScope, $scope, Inventory) {
  var init = function(product) {
    $scope.product = {};
    $scope.product.images = [];
    $scope.tags = [];
    $scope.newTag = '';
    $scope.variants = { 
                      inUse   : []
                    };
    $scope.addedImages = [];

    if(product) {
      $scope.product = $.extend(true, {}, product);
      if(product.tags.length) {
        $scope.tags = $scope.product.tags.split(', ');
      }
    }
  }

  init();

  var toUnbind = [];
  toUnbind.push($rootScope.$on('Inventory.productSelected', function(){ 
    init(Inventory.getSelectedProduct());
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
      init(Inventory.retrieveProductByID($scope.product.id));
    }
  }

  $scope.uploadFile = function(files) {
    if(files && files[0]) {
      if(files[0].name.match(/\.(jpg|jpeg|png|gif)$/)){
        var fileReader = new FileReader();
        var file = files[0];
        fileReader.onload = function(event) {
          var index = event.target.result.indexOf(',') + 1;
          var image = event.target.result.slice(index);
          $scope.addedImages.push( image);
          console.log($scope.addedImages);
          $scope.product.images.push({
            'attachment' : image
          });
        }
        fileReader.readAsDataURL(files[0]);
        return;
      }
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
