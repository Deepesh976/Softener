const bcrypt = require('bcryptjs');
const Device = require('../models/Device');

// Register a new device
const registerDevice = async (req, res) => {
  try {
    const { deviceId, user, phoneNo, password, confirmPassword } = req.body;

    if (!deviceId || !user || !phoneNo || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await Device.findOne({ deviceId });
    if (existing) {
      return res.status(400).json({ message: 'Device already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const device = new Device({
      deviceId,
      user,
      phoneNo,
      password: hashedPassword,
      registeredAt: new Date(),
    });

    await device.save();
    res.status(201).json({ message: 'Device registered successfully', data: device });
  } catch (error) {
    res.status(500).json({ message: 'Error registering device', error: error.message });
  }
};

// Login device
const loginDevice = async (req, res) => {
  const { phoneNo, password } = req.body;

  try {
    const device = await Device.findOne({ phoneNo });
    if (!device) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, device.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    res.status(200).json({ message: 'Login successful', deviceId: device.deviceId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all registered devices
const getRegisteredDevices = async (req, res) => {
  try {
    const devices = await Device.find().sort({ createdAt: -1 });
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error: error.message });
  }
};

// Update device details
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, phoneNo, password } = req.body;

    const updateFields = {};
    if (user) updateFields.user = user;
    if (phoneNo) updateFields.phoneNo = phoneNo;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedDevice = await Device.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({ message: 'Device updated successfully', device: updatedDevice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating device', error: error.message });
  }
};

// Delete device
const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error while deleting device', error: error.message });
  }
};

module.exports = {
  registerDevice,
  loginDevice,
  getRegisteredDevices,
  updateDevice,
  deleteDevice,
};
