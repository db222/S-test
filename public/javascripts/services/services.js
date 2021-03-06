var urlPathToFetchProducts = '/shopify/get?path=/admin/products.json';
var urlPathToCreateNewProduct = 'shopify/post?path=/admin/products.json';

var getPathToUpdateProduct = function(id) {
  return 'shopify/put?path=/admin/products/' + id + '.json';
}

var getPathToDeleteProduct = function(id) {
  return 'shopify/delete?path=/admin/products/' + id + '.json';
}

function success(response) {
  console.log('it was a success', response);
}

function error(error) {
  console.log('an error has occured', error);
}

function Inventory($rootScope, $http) {
  this.selectedProduct = null;
  this.$http = $http;
  this.products = null;
  this.$rootScope = $rootScope; 
}

Inventory.prototype.saveProduct = function(product) {
  if(product.id) {
    console.log('updating');
    this.updateProduct(product);
  }
  else {
    console.log('creating');
    this.createNewProduct(product);
  }
}

Inventory.prototype.updateProduct = function(product) {
  var context = this;
  this.$http({
    method :'PUT',
    url    : getPathToUpdateProduct(product.id),
    data   : JSON.stringify({'product' : product}),
    headers : {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    var updateData = JSON.parse(response.config.data);
    var index = context.products.findIndex(function(value, index, array) {
      return value.id === updateData.product.id
    });
    if(index !== -1) {
      context.products[index] = updateData.product;
    }
  }, error);
}

Inventory.prototype.createNewProduct = function(newProduct) {
  console.log(newProduct);
  this.$http({
    method  : 'POST',
    url     : urlPathToCreateNewProduct,
    data    : JSON.stringify({'product' : newProduct}),
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  .then(success, error);
}

Inventory.prototype.deleteProduct = function(product) {
  var index = this.products.findIndex(function(value, index, array) {
    return value.id === product.id;
  });
  if(index !== -1) {
    this.products.splice(index, 1);
    this.$http({
      method : 'DELETE',
      url    : getPathToDeleteProduct(product.id),
    })
    .then(success, error);
  }
}

Inventory.prototype.retrieveProducts = function() {
  var context = this;
  return this.$http({
    method : 'GET',
    url    : urlPathToFetchProducts
  })
  .then(function (response) {
    context.products = response.data.products;
    return response.data.products;
  });
}

Inventory.prototype.retrieveProductByID = function(id) {
  var result = null;
  if(this.products) {
    result = this.products.find(function(value, index, array) {
      return value.id === id;
    });
  }
  return result;
}

Inventory.prototype.select = function(id) {
  this.selectedProduct = this.retrieveProductByID(id);
  this.$rootScope.$emit('Inventory.productSelected')
  return this.selectedProduct;
}

Inventory.prototype.getSelectedProduct = function() {
  return this.selectedProduct;
}

angular.module('productManager.services', [])
.service('Inventory', ['$rootScope','$http', Inventory]);
