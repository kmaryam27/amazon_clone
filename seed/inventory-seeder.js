/**
 * This is a standalone app to seed data to DB.
 * Must not be included in production.
 * @param none
 * @returns {object}
 */

const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://admin:myjs123@ds347917.mlab.com:47917/heroku_35dqr981',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

const inventory = [
  new Inventory({
    itemName: 'Simpsons',
    itemDepartment: 'Movie',
    itemPrice: 25,
    itemDescription: 'Funny comic',
    itemSeller: 'Fox',
    itemCount: 200,
    itemImgPath: '/images/simpsons.png',
    itemTag: ['movie', 'cartoon', 'simpsons', 'dvd'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Dog and Cat',
    itemDepartment: 'Toy',
    itemPrice: 15,
    itemDescription: 'Dog and cot lovers must have',
    itemSeller: 'Dog,cat and US',
    itemCount: 2000,
    itemImgPath: '/images/dog_cat.png',
    itemTag: ['toy', 'cat', 'dog'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Adidas running shoes',
    itemDepartment: 'Clothing',
    itemPrice: 120,
    itemDescription: 'Adidas running shoes, best comfort for long running',
    itemSeller: 'Adidas',
    itemCount: 2000,
    itemImgPath: '/images/adidas.jpg',
    itemTag: ['sports', 'adidas', 'running'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'We Are Anonymous',
    itemDepartment: 'Book',
    itemPrice: 19,
    itemDescription: 'Story about the Hecker group Anonymous ',
    itemSeller: 'Random House',
    itemCount: 200000,
    itemImgPath: '/images/anonymous.png',
    itemTag: ['book', 'hecker', 'computer'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Cheddar cheese biscuit',
    itemDepartment: 'Food',
    itemPrice: 7,
    itemDescription:
      'Chedar cheese topped biscuit with incredible blackberry dipping',
    itemSeller: 'Farm & Flavor',
    itemCount: 200,
    itemImgPath: '/images/cheese-bis-1.jpeg',
    itemTag: ['food', 'cheddar', 'biscuit', 'snack'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Chromebook',
    itemDepartment: 'Electronics',
    itemPrice: 700,
    itemDescription:
      'Chromebook, 3lbs light, Chrome OS, 1TB Google Cloud for 3 years',
    itemSeller: 'Google',
    itemCount: 2000,
    itemImgPath: '/images/chromebook-1.jpeg',
    itemTag: ['computer', 'chrome', 'google', 'laptop'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: '100 Dice',
    itemDepartment: 'Toy',
    itemPrice: 10,
    itemDescription: '100 dice in a bag. Fantastic quality.',
    itemSeller: 'Toy for the world',
    itemCount: 20000,
    itemImgPath: '/images/dice-toy-1.jpeg',
    itemTag: ['toy', 'dice', 'play'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Euphoria Board Game',
    itemDepartment: 'Toy',
    itemPrice: 25,
    itemDescription: 'Euphoria Board Game Deluxe',
    itemSeller: 'Toys World',
    itemCount: 2000,
    itemImgPath: '/images/euphoria-game-1.jpeg',
    itemTag: ['board game', 'toy', 'euphoria'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Acoustic Guitar Set',
    itemDepartment: 'Music',
    itemPrice: 250,
    itemDescription: 'Fender Guitar Set, carrying bag included.',
    itemSeller: 'Music of my life',
    itemCount: 200,
    itemImgPath: '/images/guitar-1.jpeg',
    itemTag: ['guitar', 'music', 'acoustic'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Full Cover Headphones',
    itemDepartment: 'Music',
    itemPrice: 350,
    itemDescription: 'Incredible sound, noise canceling, 3D sound effect ',
    itemSeller: 'Best Music',
    itemCount: 20,
    itemImgPath: '/images/headphones-1.jpeg',
    itemTag: ['music', 'headphones', 'noise'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Streamline Bicycle Helmet',
    itemDepartment: 'Sports',
    itemPrice: 299,
    itemDescription:
      'The Helmet from the future, the most comfortable and light weight helmet',
    itemSeller: 'Sports Center',
    itemCount: 200,
    itemImgPath: '/images/helmet-1.jpeg',
    itemTag: ['sports', 'bicycle', 'helmet'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'KeyPos Bike Helment',
    itemDepartment: 'Sports',
    itemPrice: 1999,
    itemDescription: 'OHP, voice command ready motor bike helmet. ',
    itemSeller: 'Auto Center',
    itemCount: 200,
    itemImgPath: '/images/helmet-2.jpeg',
    itemTag: ['sports', 'motor bike', 'helmet'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Incredibles 2',
    itemDepartment: 'Movie',
    itemPrice: 17,
    itemDescription: 'Incredibles 2, box office 4 weeks No 1. ',
    itemSeller: 'Disney/Pixar',
    itemCount: 2000,
    itemImgPath: '/images/incredibles-2.jpeg',
    itemTag: ['movie', 'incredibles', 'disney'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Led Zeppelin',
    itemDepartment: 'Music',
    itemPrice: 24,
    itemDescription: 'Led Zeppelin, including legendary Stair Way to Heaven ',
    itemSeller: 'Amazon',
    itemCount: 2000,
    itemImgPath: '/images/led-z-1.jpeg',
    itemTag: ['music', 'led zeppelin', 'stair way to heaven'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Mario Badge',
    itemDepartment: 'Toy',
    itemPrice: 5,
    itemDescription: 'Mario Badge, collection item',
    itemSeller: 'Nintendo',
    itemCount: 2000,
    itemImgPath: '/images/mario-1.jpeg',
    itemTag: ['mario', 'nintendo', 'badge'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Xiaomi Mi8',
    itemDepartment: 'Electronics',
    itemPrice: 500,
    itemDescription: 'Xiaomi Mi8 the latest Xiaomi phone',
    itemSeller: 'Xiaomi',
    itemCount: 200,
    itemImgPath: '/images/phone-1.jpeg',
    itemTag: ['xiaomi', 'mi8', 'phone'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Google Pixel',
    itemDepartment: 'Electronics',
    itemPrice: 600,
    itemDescription: 'Google Pixel phone, Android',
    itemSeller: 'Google',
    itemCount: 2000,
    itemImgPath: '/images/phone-2.jpeg',
    itemTag: ['google', 'android', 'phone'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'US map',
    itemDepartment: 'Book',
    itemPrice: 10,
    itemDescription: 'US map, 5 different types of maps',
    itemSeller: 'Amazon',
    itemCount: 1000,
    itemImgPath: '/images/us-map-1.jpeg',
    itemTag: ['map', 'us', 'america'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Sonoma Springs Chardonnay Wine',
    itemDepartment: 'Food',
    itemPrice: 25,
    itemDescription: 'Chardonnay 2005, Sonoma Springs, CA',
    itemSeller: 'Amazon',
    itemCount: 100,
    itemImgPath: '/images/wine-1.jpeg',
    itemTag: ['wine', 'white', 'chardonnay'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName:
      'HERSHEYS KISSES Halloween Spooky Milk Chocolates, Perfect for Halloween Decorations, 36 Ounce Bulk Candy',
    itemDepartment: 'Food',
    itemPrice: 9.4,
    itemDescription: 'Trick-or-treaters love KISSES Milk Chocolates.',
    itemSeller: 'Amazon',
    itemCount: 150,
    itemImgPath: '/images/hersheys_spooky_kisses.jpg',
    itemTag: ['candy', 'sweet', 'chocolate', 'hersheys', 'halloween', 'food'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Quaker Instant Oatmeal Variety Pack, Breakfast Cereal, 48 Count',
    itemDepartment: 'Food',
    itemPrice: 8.63,
    itemDescription:
      'For energy to help take on your morning try a wholesome...',
    itemSeller: 'Amazon',
    itemCount: 1000,
    itemImgPath: '/images/quaker_instant_oatmeal.jpg',
    itemTag: ['oatmeal', 'breakfast', 'cereal', 'food'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName:
      'Jack Link’s Beef Jerky Variety Bag Original, Teriyaki 9ct 1.25oz Single-serve Bags',
    itemDepartment: 'Food',
    itemPrice: 14.24,
    itemDescription:
      'About the product. Nine 1.25-ounce bags of beef jerky snack packs, ..',
    itemSeller: 'Amazon',
    itemCount: 99,
    itemImgPath: '/images/jack_links_beef_jerky.jpg',
    itemTag: ['meat', 'beef', 'jerky', 'food'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Jennie-O, Lean Ground Turkey, 16 oz',
    itemDepartment: 'Food',
    itemPrice: 4.69,
    itemDescription:
      'JENNIE-O All Natural Lean Ground Turkey is a nutritious choice to cook..',
    itemSeller: 'Amazon',
    itemCount: 50,
    itemImgPath: '/images/Jennie_ground_turkey.jpg',
    itemTag: ['food', 'turkey', 'meat', 'fresh'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName:
      'Prego Ready Meals, Creamy Three Cheese Alfredo Rotini, 9 oz (Pack of 6)',
    itemDepartment: 'Food',
    itemPrice: 11.06,
    itemDescription:
      'With flavorful ingredients you can see and taste—and no added preservatives or ...',
    itemSeller: 'Amazon',
    itemCount: 30,
    itemImgPath: '/images/prego_ready_meals.jpg',
    itemTag: ['food', 'alfredo', 'italian', 'lunch', 'packaged'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName:
      'Barilla Italian-Style Entrees, Tomato & Basil Penne, 9 Ounce (Pack of 6)',
    itemDepartment: 'Food',
    itemPrice: 11.4,
    itemDescription:
      'Flavor: Tomato and Basil Penne For more than 135 years, Barilla has been committed to ..',
    itemSeller: 'Amazon',
    itemCount: 120,
    itemImgPath: '/images/Barilla_pasta.jpg',
    itemTag: ['food', 'italian', 'lunch', 'dinner', 'packaged'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName:
      'DiGiorno Frozen Pizza Pepperoni, Original Rising Crust, 27.5 oz (Frozen)',
    itemDepartment: 'Food',
    itemPrice: 5.49,
    itemDescription:
      'The DIGIORNO Rising Crust Pepperoni pizza is made with only the very best: ..',
    itemSeller: 'Amazon',
    itemCount: 120,
    itemImgPath: '/images/digiorno_pizza.jpg',
    itemTag: ['food', 'pizza', 'lunch', 'dinner', 'packaged'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Tyson, Applewood Smoked Bacon, 1 lb',
    itemDepartment: 'Food',
    itemPrice: 5.66,
    itemDescription:
      'Everything tastes better with bacon! Tyson Applewood Smoked Bacon is cured and smoked ..',
    itemSeller: 'Amazon',
    itemCount: 120,
    itemImgPath: '/images/tyson_bacon.jpg',
    itemTag: ['food', 'bacon', 'meat', 'breakfast'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Whole Foods Market, Organic Sweet Baby Lettuces, 5 oz',
    itemDepartment: 'Food',
    itemPrice: 3.49,
    itemDescription: 'Organic sweet baby lettuces',
    itemSeller: 'Amazon',
    itemCount: 49,
    itemImgPath: '/images/whole_foods_lettuce.jpg',
    itemTag: ['food', 'vegetable', 'veggie', 'lettuce', 'salad'],
    itemInCart: false,
    itemSold: 0
  }),
  new Inventory({
    itemName: 'Organic Bananas, 1 bunch (min. 5 ct.)',
    itemDepartment: 'Food',
    itemPrice: 1.99,
    itemDescription:
      'Characterized by their bright yellow color and sweet taste, bananas are the ..',
    itemSeller: 'Amazon',
    itemCount: 30,
    itemImgPath: '/images/banana.jpg',
    itemTag: ['food', 'fruit', 'banana', 'organic', 'fresh', 'healthy'],
    itemInCart: false,
    itemSold: 0
  })
];

let done = 0;
for (let i = 0; i < inventory.length; i++) {
  inventory[i].save((err, result) => {
    done++;
    if (done === inventory.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
