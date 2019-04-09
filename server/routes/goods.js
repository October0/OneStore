var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/small')

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

// 查询商品列表数据
router.get('/list', function (req, res, next) {
  Goods.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 查询商品详情列表
router.post('/productId', function (req, res, next) {
  let Products = require('../models/products')
  let productId = req.body.productId
  Products.findOne({
    productId: productId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

// 加入购物车
router.post('/addCart', function (req, res, next) {
  let userId = '100000077'
  let productId = req.body.productId
  var productNum = req.body.productNum
  let User = require('../models/user')
  User.findOne({
    userId: userId
  }, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach((item) => {
          if (item.productId == productId) {
            goodsItem = item
            item.productNum += parseInt(productNum)
          }
        })
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          let Products = require('../models/products')
          Products.findOne({
            productId: productId
          }, function (err1, doc) {
            if (err1) {
              res.json({
                status: '1',
                msg: err.message
              })
            } else {
              if (doc) {
                userDoc.cartList.push(doc)
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

module.exports = router;