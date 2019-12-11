import mongoose from 'mongoose';
import Shop from './models/shop.js';

mongoose.connect('mongodb://localhost/shops', { useNewUrlParser: true });

function create(data) {
  const shop = new Shop();

  shop.name = data.name;
  shop.address = data.address;

  return shop.save();
}

function read(shopId) {
  if (typeof shopId === 'undefined') {
    return Shop.find().exec();
  }
  return Shop.findOne({ _id: shopId }).exec();
}

function update(shopId, data) {
  read(shopId).then((shop) => {
    const updatedShop = shop;
    updatedShop.name = data.name || updatedShop.name;
    updatedShop.address = data.address || updatedShop.address;

    return updatedShop.save();
  });
}

function remove(shopId) {
  Shop.remove({ _id: shopId }).exec();
}

export default {
  create,
  read,
  update,
  remove,
};
