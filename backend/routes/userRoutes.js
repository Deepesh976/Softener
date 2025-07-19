const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAlluser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// USER ROUTES - All prefixed with /api/user

// Register a new user
router.post('/register', registerUser);

// Login with phone number and password
router.post('/login', loginUser);

// Get all registered user
router.get('/all', getAlluser);

// Get a single user by ID
router.get('/:id', getSingleUser);

// Update a user by ID
router.put('/update/:id', updateUser);

// Delete a user by ID
router.delete('/delete/:id', deleteUser);

module.exports = router;
