const express = require('express');
const router = express.Router();
const Inventory = require('./../models/inventory');

/**
 * middleware to print date/time on console.
 * @param {*} none
 */
router.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

/**
 * render home page
 * @param {*} none
 */
router.get('/', (req, res, next) => {
  res.render('home', {
    title: 'This is Amazon clone site, welcome!!!',
    reviewer: req.cookies.reviewer
  });
});

/**
 * render index page with all inventory
 * @param {*} none
 */
router.get('/inventory', (req, res, next) => {
  Inventory.find({}).then(inventory => {
    res.render('index', {
      inventory: inventory,
      reviewer: req.cookies.reviewer
    });
  });
});

/**
 * @author Maryam
 * @description login page Url
 */
router.get('/login', function(req, res, next) {
  res.render('login', { reviewer: req.cookies.reviewer });
});


/**
 * @author Maryam
 * @description Log out page, redirect to login page, clear cookie
 */
router.get('/logout', (req, res, next) => {
  res.clearCookie('auth');
  res.clearCookie('reviewer');
  res.redirect('login');
});

/**
 * to get all inventory data
 * @author Ming
 */
router.get('/database', (req, res) => {
  Inventory.find({}).then(inventory => {
    res.json(inventory);
  });
});

/**
 * to render purchase page
 * @author Ming
 */
router.get('/purchase/:id', function(req, res) {
  console.log('GET function');
  console.log(req.params.id);
  Inventory.findOne({ _id: req.params.id })
    .then(product => {
      res.render('purchase', {
        product: product,
        reviewer: req.cookies.reviewer
      });
    })
    .catch(function(err) {
      res.json(err);
    });
});

/**
 * to render cart page
 * @author Ming
 */
router.get('/shoppingCart', function(req, res) {
  console.log('GET function: shoppingCart');
  Inventory.find({}).then(inventory => {
    res.render('cart', {
      inventory: inventory,
      reviewer: req.cookies.reviewer
    });
  });
});

/**
 * a update by id link for cart page
 * @author Ming
 */
router.put('/cartUpdate/:id', function(req, res) {
  console.log('PUT function');
  console.log(req.params.id);
  Inventory.findOne({ _id: req.params.id })
    .then(function() {
      Inventory.updateOne({ _id: req.params.id }, req.body)
        .then(function(data) {
          res.json(data);
        })
        .catch(function(err) {
          res.json(err);
        });
    })
    .catch(function(err) {
      res.json(err);
    });
});

/**
 * update inventory count
 * @param {*}
 */
router.put('/inventory/:id', (req, res, next) => {
  Inventory.findOne({
    _id: req.params.id
  }).then(inventory => {
    inventory.itemCount = req.body.itemCount;
    inventory.save().then(inventory => {
      res.json(inventory);
    });
  });
});
// post inventory
router.post('/inventory', (req, res) => {
  const newInventory = {
    itemName: req.body.itemName,
    itemDepartment: req.body.itemDepartment,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription,
    itemSeller: req.body.itemSeller,
    itemCount: req.body.itemCount,
    itemImgPath: req.body.itemImgPath,
    itemInCart: req.body.itemInCart,
    itemSold: req.body.itemSold
  };
  new Inventory(newInventory)
    .save()
    .then(inventory => res.redirect('/inventory'));
});

router.delete('/inventory/:id', (req, res) => {
  Inventory.remove({ _id: req.params.id }).then(() => {
    res.redirect('/inventory');
  });
});

/**
 * pagination
 * @param {*}
 */
router.get('/inventory/:page', function(req, res, next) {
  const perPage = 10;
  const page = req.params.page || 1;

  if (page === 'prev') {
  }
  Inventory.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, products) {
      Inventory.count().exec(function(err, count) {
        if (err) {
          return err;
        } else {
          const pages = Math.ceil(count / perPage);
          if (pages > 0) {
            res.render('index', {
              reviewer: req.cookies.reviewer,
              inventory: products,
              current: page,
              pages: Math.ceil(count / perPage)
            });
          } else {
            res.render('index', {
              reviewer: req.cookies.reviewer,
              inventory: products,
              current: page
            });
          }
        }
      });
    });
});

/**
 * product search
 * @param {*}
 */
router.post('/inventory/search', function(req, res) {
  const deptSelect = req.body.departmentSelect;
  const searchQuery = req.body.searchQuery.toLowerCase().trim();
  if (deptSelect === 'All') {
    if (searchQuery.length > 0) {
      Inventory.find({ $text: { $search: searchQuery } }).then(function(data) {
        res.render('index', {
          inventory: data,
          reviewer: req.cookies.reviewer
        });
      });
    } else {
      Inventory.find({}).then(function(data) {
        res.render('index', {
          inventory: data,
          reviewer: req.cookies.reviewer
        });
      });
    }
  } else {
    if (searchQuery.length > 0) {
      Inventory.find({
        itemDepartment: deptSelect,
        $text: { $search: searchQuery }
      }).then(function(data) {
        res.render('index', {
          inventory: data,
          reviewer: req.cookies.reviewer
        });
      });
    } else {
      Inventory.find({ itemDepartment: deptSelect }).then(function(data) {
        res.render('index', {
          inventory: data,
          reviewer: req.cookies.reviewer
        });
      });
    }
  }
});

/**
 * Take user id and render user_review page.
 * @param {string} _id
 */
router.get('/review/:id', (req, res) => {
  Inventory.findOne({
    _id: req.params.id
  }).then(inventory => {
    console.log(inventory);
    res.render('review/user_review', {
      inventory: inventory,
      reviewer: req.cookies.reviewer
    });
  });
});

/**
 * Update inventory with user review
 * @param {string} _id
 */
router.put('/review/update/:id', (req, res) => {
  console.log('user review update');
  console.log(req.body);
  const review = {
    reviewer: req.cookies.reviewer,
    rate: req.body.userRate,
    content: req.body.userReview,
    date: Date.now()
  };
  Inventory.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { itemReview: review } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.redirect('/inventory');
      }
    }
  );
});

/**
 * @author Maryam
 * @description get search whit link for homepage
 * @returns Array of inventory selected lists
 */
router.get('/special/:choosen', function(req, res) {
  var choosen = String(req.params.choosen);
  let myparams = JSON.parse(choosen);
  Inventory.find({ itemDepartment: myparams.ref }).then(function(data, err) {
    if (err)
      res.render('error', { noRoute: true, reviewer: req.cookies.reviewer });
    else if (myparams.category) {
      let dataArray = [];
      data.forEach(e => {
        e.itemName.toLowerCase().includes(myparams.category.toLowerCase())
          ? dataArray.push(e)
          : e.itemDepartment
              .toLowerCase()
              .includes(myparams.category.toLowerCase())
            ? dataArray.push(e)
            : e.itemDescription
                .toLowerCase()
                .includes(myparams.category.toLowerCase())
              ? dataArray.push(e)
              : e.itemSeller
                  .toLowerCase()
                  .includes(myparams.category.toLowerCase())
                ? dataArray.push(e)
                : 0;
      });
      
      res.render('index', {
        inventory: dataArray,
        reviewer: req.cookies.reviewer
      });
    } else {
      res.render('index', { inventory: data, reviewer: req.cookies.reviewer });
    }
  });
});

module.exports = router;
