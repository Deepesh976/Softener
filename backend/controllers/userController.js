const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  console.log("Register request body:", req.body);
  try {
    const { user, phoneNo, location, password, confirmPassword } = req.body;

    if (!user?.trim() || !phoneNo?.trim() || !location?.trim() || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user: user.trim(),
      phoneNo: phoneNo.trim(),
      location: location.trim(),
      password: hashedPassword,
      registeredAt: new Date()
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        user: newUser.user,
        phoneNo: newUser.phoneNo,
        location: newUser.location,
        registeredAt: newUser.registeredAt
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { phoneNo, password } = req.body;

  if (!phoneNo?.trim() || !password) {
    return res.status(400).json({ message: 'Phone number and password are required' });
  }

  try {
    const user = await User.findOne({ phoneNo: phoneNo.trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        user: user.user,
        phoneNo: user.phoneNo,
        location: user.location,
        registeredAt: user.registeredAt
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, "-password -confirmPassword");
    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch user Error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Get single user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, phoneNo, location, password } = req.body;

    const updateData = {};
    if (user?.trim()) updateData.user = user.trim();
    if (phoneNo?.trim()) updateData.phoneNo = phoneNo.trim();
    if (location?.trim()) updateData.location = location.trim();
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        user: updatedUser.user,
        phoneNo: updatedUser.phoneNo,
        location: updatedUser.location,
        registeredAt: updatedUser.registeredAt
      }
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,         // ✅ FIXED: now included and correctly named
  getSingleUser,
  updateUser,
  deleteUser
};
