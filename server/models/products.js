var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
  "productId": String,
  "productName": String,
  "productDec": String,
  "salePrice": Number,
  "productImage": String,
  "colors": [{
    "id": String,
    "dec": String,
    "color": String
  }],
  "capacityList": [{
    "id": String,
    "dec": String
  }],
  "info": [{
    "src": String,
    "id": String
  }],
  "color": [{
    "img": String,
    "dec": String,
    "color": String,
    "id": String
  }]
})

module.exports = mongoose.model('Product', productSchema)