const express = require('express');

// Middlewares
const {
  protectToken,
} = require('../middlewares/users.middlewares');

// Controller
const {
  createUser,
  login,
  checkToken,
  getUserProducts,
  getUserOrders,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUser);

router.post('/login', login);

router.use(protectToken);

router.get('/me', getUserProducts);

router.get('/orders', getUserOrders);

router.get('/check-token', checkToken);

module.exports = { usersRouter: router };
