const express = require('express');
const router = express.Router();
const cors = require('cors')
const AuthMiddelWare = require('../middleware/AuthMiddleware');
const AdminController = require('../Controllers/Admin.Controller');
const CustomerController = require('../Controllers/Customer.Controller')
const CartController = require('../Controllers/Cart.Controller');
const ProductOrder = require('../Controllers/ProductOrder.Controller');
const Service = require('../Controllers/Service.Controller');
const ProductController = require('../Controllers/Product.Controller');
const Comment = require('../Controllers/Comment.Controller')
const ProductOrderDetail = require('../Controllers/ProductOrderDetail.Controller')


//admin login
router.post('/admin/login',AdminController.login);
//customer login
router.post('/customer/login',CustomerController.login)
//customer register
router.post('/customer/register',CustomerController.register)
//customer change password
router.post('/customer/changePassword',CustomerController.changePassword)
//add service
//change profile
router.post('/customer/changeprofile',CustomerController.changeProfile)
router.post('/api/service',Service.addService)
//router.use(AuthMiddelWare.isAuth);
//add to cart
router.post('/customer/addToCart',CartController.addToCart)
//bookOrderProduct
router.post('/customer/productOrder',ProductOrder.bookOrderProduct);
//add Product
router.post('/api/product',ProductController.addProduct)
//get product
router.get('/api/product',ProductController.getProduct)
//get service
router.get('/api/service',Service.getService)
//add to cart
router.post('/api/cart',CartController.addToCart)
//get cart
router.get('/api/cart',CartController.getCart)
//delete cart
router.delete('/api/cart',CartController.deleteCart)
//add comment
router.post('/api/comment',Comment.addComment)
//get comment
router.get('/api/comment',Comment.getComment)
//book prodcut
router.post('/api/Productorder',ProductOrder.bookOrderProduct)
//query product
router.get('/api/productorder',ProductOrder.getOrderProductDetails)

module.exports = router;