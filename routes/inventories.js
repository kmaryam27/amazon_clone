/**
 * @author Maryam
 */
const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const secret = 'harrypotter';
const multer = require('multer');
const path = require('path');
const targetPath = path.join(__dirname, '../public/images/');
/**
 * @description For override Method and use put and delete method directly from .hbs files to server
 */
router.use(methodOverride('_method'));

/**
 * @description Middleware to check auth(token) after router to this page redirect if client didn't login doesn't let him to see inventory and edit inventory pages
 * @property {String} auth
 */
router.use((req, res, next) => {
  let token =
    req.headers.authorization ||
    req.cookies.auth ||
    req.body.token ||
    req.body.query ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) res.redirect('/users/login?msg=failauthenticatetoken');
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.redirect('/users/login?msg=failauthenticatetoken');
  }
});

/**
 * @description Middleware taks string with special meaning and returns fail or success message to login and register page
 * @param {String} inventorymsg
 * @param {String} msgeupdate
 * @param {String} msgeupdateok
 * @param {String} msgadd
 * @returns {String} inventorymsg
 * @returns {String} msgeupdate
 * @returns {String} msgeupdateok
 * @returns {String} msgadd
 */
router.use((req, res, next) => {
  switch (true) {
    case (req.query.inventorymsg ==='removed'):
      res.locals.inventorymsg =
        'there is no information about this item please cotact to amazon support service.';
      break;
    case (req.query.msgeupdate === 'fail'):
      res.locals.msgeupdate =
        'could not update this perchase please contact to Amazon support service';
      break;
    case (req.query.msgeupdateok === 'success'):
      res.locals.msgeupdateok = 'updated successfully';
      break;
    case (req.query.msgadd === 'fail'):
      res.locals.msgadd = 'some input are wrong please fill all place correctly';
      break;
    case (req.query.msgaddok === 'success'):
      res.locals.msgadd = 'new product added you can edit it';
    break;
  
    default:
      res.locals.inventorymsg = '';
      req.query.msgeupdate = '';
      res.locals.msgeupdateok = '';
      res.locals.msgadd = '';
      res.locals.msgaddok = '';
      break;
  }

  next();
});

/**
 * @description Open inventory.hbs page with Post method with user inventory information
 * @description should for real user and program chose only users set in req.params.user but now we just show all with team decition
 */
router.get('/:user', (req, res, next) => {
  if(req.cookies.reviewer === (req.params.user)){
    Inventory.find({}).then(inventory => { 
       res.render('inventory', 
        {inventory: inventory, 
        reviewer: req.cookies.reviewer});
     });
    }else res.render('error',{noRoute: true, reviewer: req.cookies.reviewer});
 });

/**
 * @description Post inventoery for update product
 * @param {String} id
 * @returns selectedproduct
 */
router.post('/update/:id', (req, res, next) => {
  Inventory.findOne({ _id: req.params.id }).then(product => {
    if (!product) res.redirect('/users/inventory?msg=removed');
    else {
      const selectedproduct = new Inventory(product);
      res.render('inventory-edit', {
        selectedproduct: selectedproduct,
        reviewer: req.cookies.reviewer
      });
    }
  });
});

/**
 * @description get inventoery for update product for type on url
 * @param {String} id
 * @returns selectedproduct
 */
router.get('/update/:id', (req, res, next) => {
  Inventory.findOne({ _id: req.params.id }).then(product => {
    if (!product) res.redirect('/users/inventory?msg=removed');
    else {
      const selectedproduct = new Inventory(product);
      res.render('inventory-edit', {
        selectedproduct: selectedproduct,
        reviewer: req.cookies.reviewer
      });
    }
  });
});

/**
 * @description Put inventoery for update product
 * @param {String} id
 * @returns product
 */
router.put('/update/product/:id', (req, res, next) => {
  Inventory.findOne({ _id: req.params.id }).then(product => {
    req.body.itemName ? (product.itemName = req.body.itemName) : 0;
    req.body.itemDepartment
      ? (product.itemDepartment = req.body.itemDepartment)
      : 0;
    req.body.itemPrice ? (product.itemPrice = req.body.itemPrice) : 0;
    req.body.itemDescription
      ? (product.itemDescription = req.body.itemDescription)
      : 0;
    req.body.itemSeller ? (product.itemSeller = req.body.itemSeller) : 0;
    req.body.itemCount ? (product.itemCount = req.body.itemCount) : 0;
    req.body.itemImgPath ? (product.itemImgPath = req.body.itemImgPath) : 0;

    Inventory.update({ _id: req.params.id }, product, function(err, raw) {
      if (err) {
        res.redirect(`/inventories/update/${req.params.id}?msgeupdate=fail`);
      }
      res.redirect(`/inventories/update/${req.params.id}?msgeupdateok=success`);
    });
  });
});

/**
 * @description post inventoery for add product (not compelete because of time)
 * @param {String} id
 * @returns product
 */
router.post('/add/product', (req, res, next) => {
  let product = new Inventory();
  req.body.newitemName !== ''
    ? (product.itemName = req.body.newitemName)
    : console.log('/*/*/*/*/*'); 
  req.body.newitemDepartment !== ''
    ? (product.itemDepartment = req.body.newitemDepartment)
    : res.redirect(`/inventory/?msgadd=fail`);
  req.body.newitemPrice !== ''
    ? (product.itemPrice = req.body.inewtemPrice)
    : res.redirect(`/inventory/?msgadd=fail`);
  req.body.newitemDescription !== ''
    ? (product.itemDescription = req.body.newitemDescription)
    : res.redirect(`/inventory/?msgadd=fail`);
  req.body.newitemSeller !== ''
    ? (product.itemSeller = req.body.newitemSeller)
    : res.redirect(`/inventory/?msgadd=fail`);
  req.body.newitemCount !== ''
    ? (product.itemCount = req.body.newitemCount)
    : res.redirect(`/inventory/?msgadd=fail`);
  product.itemImgPath = `/images/${product._id}.png`;
  console.log({ k: product });
  Inventory.create(product)
    .then(function(dbInventory) {
      res.redirect(`/inventories/update/${dbInventory._id}?msgaddok=success`);
    })
    .catch(function(err) {
      res.redirect(`/inventory/?msgadd=fail`);
    });
});



 /**
 *@description useing multer storage because of upload on heroku
 */ 
const storage = multer.diskStorage({
  destination: targetPath,
  filename: function(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage
}).single('myImage');

/**
  * @description upload new image for update product 
  * @param {String} id
*/
router.post('/upload/:id', (req, res, next) => {
  upload(req, res, (err) => {
    if(err) res.render('inventory-edit');
    else {
      if(req.file == undefined)  res.render('inventory-edit');//no file selected;
      else{
        Inventory.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                itemImgPath: `/images/${req.file.filename}`
              }
            }
          )
          .then(function(selectedproduct) {
            res.redirect(`/inventories/update/${req.params.id}`);
        });
      }
    }
  });
});


/**
 * @description The 404 Route (ALWAYS Keep this as the last route)
*/
router.get('*', (req, res) => {
  res.render('error', { noRoute: true, 
    reviewer : req.cookies.reviewer}); 
});

module.exports = router;
