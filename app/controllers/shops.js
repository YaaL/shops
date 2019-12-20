import Shop from '../models/shop.js';

const create = (data) => {
  const shop = new Shop();

  shop.name = data.name;
  shop.address = data.address;

  return shop.save();
};

const read = (shopId) => {
  if (typeof shopId === 'undefined') {
    return Shop.find().exec();
  }
  return Shop.findOne({ _id: shopId }).exec();
};

const update = (shopId, data) => read(shopId).then((shop) => {
  const updatedShop = shop;
  updatedShop.name = data.name || updatedShop.name;
  updatedShop.address = data.address || updatedShop.address;

  return updatedShop.save();
});


const remove = (shopId) => Shop.deleteOne({ _id: shopId }).exec();

export default {
  create,
  read,
  update,
  remove,
};
