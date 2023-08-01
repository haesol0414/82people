const mongoose = require('mongoose');
const { CategorySchema } = require('../schemas');

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
