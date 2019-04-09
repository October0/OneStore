var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
  "hotGoods": {
    "title": String,
    "image": String,
    "id": String,
    "hotGoodsList": [{
      "productId": String,
      "productName": String,
      "productDec": String,
      "salePrice": Number,
      "productImage": String
    }]
  },
  "goods": {
    "title": String,
    "image": String,
    "id": String,
    "goodsList": [{
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
      }]
    }]
  },
  "circums": {
    "title": String,
    "image": String,
    "id": String,
    "circumList": [{
      "productId": String,
      "productName": String,
      "productDec": String,
      "productLabel": String,
      "salePrice": Number,
      "productImage": String,
      "color": [{
        "img": String,
        "dec": String,
        "color": String,
        "id": String
      }],
      "info": [{
        "src": String,
        "id": String
      }]
    }]
  }
})

module.exports = mongoose.model('Good', productSchema)