// Models
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: 'active' },
    include: [
      { model: User, attributes: ['username', 'email'] },
    ],
  });

  res.status(200).json({ products });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({ product });
});

const createProduct = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { lotNumber,name, quantity, price } = req.body;

  const newProduct = await Product.create({
    lotNumber,
    name,
    quantity,
    price,
    userId: sessionUser.id,
  });

  res.status(201).json({ newProduct });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { lotNumber,name, quantity, price } = req.body;

  await product.update({ lotNumber,name, quantity, price });

  res.status(200).json({ status: 'success' });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'removed' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};