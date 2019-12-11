import mongoose from 'mongoose';

const ShopSchema = mongoose.Schema({
  name: { type: String, default: 'Coffee Shop' },
  address: { type: String, default: 'Somewhere' },
});

export default mongoose.model('Shop', ShopSchema);
