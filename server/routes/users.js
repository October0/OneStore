var express = require('express');
var router = express.Router();
require('../utils/date')
var User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登陆验证
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie('userName', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '10003',
          msg: '',
          result: ''
        })
      }
    }
  })
})

router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 查询地址
router.get('/addressList', function (req, res, next) {
  let userId = req.cookies.userId
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      })
    }
  })
})

// 设置默认地址接口
router.post('/setDefault', function (req, res, next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId
  if (!addressId) {
    res.json({
      status: '1',
      msg: 'addressId is null',
      result: ''
    })
  } else {
    User.findOne({
      userId: userId
    }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        let addressList = doc.addressList
        addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
        doc.save(function (err1, doc1) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })
  }
})

// 删除地址接口
router.post('/delAddress', function (req, res, next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId
  User.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

// 新增地址接口
router.post('/addAddress', function (req, res, next) {
  let userId = req.cookies.userId,
    userName = req.body.userName,
    tel = req.body.tel,
    streetName = req.body.streetName
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var platform = '100';
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);

      var sysDate = new Date().Format('yyyyMMdd');
      var addressId = platform + r1 + sysDate + r2;
      var address = {
        addressId: addressId,
        userName: userName,
        streetName: streetName,
        tel: tel,
        isDefault: false
      }
      doc.addressList.push(address)

      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: 'success'
          })
        }
      })
    }
  })
})

// 查询当前用户的购物车数据
router.get('/cartList', function (req, res, next) {
  let userId = req.cookies.userId
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

// 购物车删除
router.post('/cartDel', function (req, res, next) {
  let userId = req.cookies.userId,
    productId = req.body.productId
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 修改商品数量
router.post('/cartEdit', function (req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked
  User.update({
    'userId': userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 修改所有商品选中状态
router.post('/editCheckAll', function (req, res, next) {
  let userId = req.cookies.userId,
    checkAll = req.body.checkAll ? 1 : 0
  User.findOne({
    userId: userId
  }, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
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
})

// 订单创建
router.post('/payMent', function (req, res, next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = '',
        goodsList = []
      doc.addressList.forEach((item) => {
        if (addressId == item.addressId) {
          address = item
        }
      })
      doc.cartList.filter((item) => {
        if (item.checked == 1) {
          goodsList.push(item)
        }
      })
      let platform = '622';
      let r1 = Math.floor(Math.random() * 10);
      let r2 = Math.floor(Math.random() * 10);

      let sysDate = new Date().Format('yyyyMMddhhmmss');
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      let orderStatus = '1'
      let orderId = platform + r1 + sysDate + r2;
      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: orderStatus,
        createDate: createDate
      }
      doc.orderList.push(order)
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})

//根据订单Id查询订单信息
router.get('/orderDetail', function (req, res, next) {
  let userId = req.cookies.userId,
    orderId = req.param('orderId')
  User.findOne({
    userId: userId
  }, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: 'err.message',
        result: ''
      })
    } else {
      let orderList = userInfo.orderList
      if (orderList.length > 0) {
        let orderTotal = 0
        orderList.forEach((item) => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        })
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        } else {
          res.json({
            status: '120002',
            msg: '无此订单',
            result: ''
          })
        }
      } else {
        res.json({
          status: '120001',
          msg: '当前用户未创建订单',
          result: ''
        })
      }
    }
  })
})

// 查询当前用户的购物车数量
router.get('/getCartCount', function (req, res, next) {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    User.findOne({
      'userId': userId
    }, function (err, doc) {
      if (err) {
        res.json({
          status: '0',
          msg: err.message
        })
      } else {
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map(function (item) {
          cartCount += parseFloat(item.productNum)
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  } else {
    res.json({
      status: '0',
      msg: '当前用户不存在'
    })
  }
})

module.exports = router;