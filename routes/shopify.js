var express = require('express');
var request = require('request');
var router = express.Router();

var API_KEY = 'd465f4a1eccbf2b77607611d07afaa57';
var PASSWD = 'c2e6b4e4fc04fe1d4b35e63da97f1e22';
var STORE_NAME = 'cheeseemporium';


function createURL(path) {
  return 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path;
}

router.get('/get', function(req, res) {

  var path = req.query.path;

  res.set({'Content-Type': 'application/json'});

  request(createURL(path)
    , function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.status(200).send(body);
      }
    }
  );
});

router.post('/post', function(req, res){
  var path = req.query.path;
  var requestData = req.body;

  request({
    url: createURL(path)
    , method: "POST"
    , json: true
    , headers: {
      "Content-Type": "application/json"
    }
    , body: requestData
  }
  , function (error, response, body) {
      console.log('response status code', response.statusCode);
      console.log(body);
      if (!error && response.statusCode === 200 || response.statusCode === 201) {
        res.status(200).send(body);
      } else {
        console.log('error', error);
        //console.log(response);
        res.status(500).send(body);
      }
  });
});

router.put('/put', function(req, res) {
  var path = req.query.path;
  var requestData = req.body;

  request({
    url     : createURL(path),
    method  : 'PUT',
    json    : true,
    headers : {
      "Content-Type": "application/json"
    },
    body    : requestData
  }, 
  function (error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode === 200 || response.statusCode === 201) {
        res.status(200).send(body);
      } else {
        console.log('the error : ', error);
        res.status(500).send(body);
      }
  });
});

router.delete('/delete', function(req, res) {
  var path = req.query.path;

  request({
    url    : createURL(path),
    method : 'DELETE'
  },
  function(error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode === 200 || response.statusCode === 201) {
        res.status(200).send(body);
      } else {
        console.log('the error : ', error);
        res.status(500).send(body);
      }
  })
})

module.exports = router;