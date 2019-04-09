var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "cartList": [{
    "productId": String,
    "productName": String,
    "productDec": String,
    "salePrice": Number,
    "productImage": String,
    "color": String,
    "capacity": String,
    "productNum": Number,
    "checked": Number
  }],
  "addressList": [{
    "addressId": String,
    "userName": String,
    "streetName": String,
    "postCode": Number,
    "tel": Number,
    "isDefault": Boolean
  }],
  "orderList": [{
    "orderId": String,
    "orderTotal": Number,
    "addressInfo": {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": String,
      "tel": String,
      "isDefault": Boolean
    },
    "goodsList": [{
      "productId": String,
      "productName": String,
      "productDec": String,
      "salePrice": Number,
      "productImage": String,
      "color": String,
      "capacity": String,
      "productNum": Number,
      "checked": Number
    }],
    "createDate": String
  }]
})

module.exports = mongoose.model('User', userSchema)