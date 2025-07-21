const Device = require('../models/Device');
const User = require('../models/User');

// Register Device
const registerDevice = async (req, res) => {
  try {
    const { deviceId, user, phoneNo } = req.body;

    if (!deviceId || !user || !phoneNo) {
      return res.status(400).json({ message: 'Device ID, user, and phone number are required' });
    }

    const existingDevice = await Device.findOne({ deviceId });
    if (existingDevice) {
      return res.status(409).json({ message: 'Device ID already exists' });
    }

    const existingUser = await User.findOne({ user, phoneNo });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found with this name and phone number' });
    }

    const newDevice = new Device({
      deviceId,
      user: existingUser.user,
      phoneNo: existingUser.phoneNo,
    });

    await newDevice.save();

    res.status(201).json({
      message: 'Device registered successfully',
      data: newDevice,
    });
  } catch (error) {
    console.error('Device registration error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login Device
const loginDevice = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required' });
    }

    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({
      message: 'Login successful',
      data: device,
    });
  } catch (error) {
    console.error('Device login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all Registered Devices
const getRegisteredDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    console.error('Fetch devices error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update Device Details
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { deviceId, user, phoneNo } = req.body;

    if (!deviceId || !user || !phoneNo) {
      return res.status(400).json({ message: 'Device ID, user, and phone number are required' });
    }

    const existingUser = await User.findOne({ user, phoneNo });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found with this name and phone number' });
    }

    const updatedFields = {
      deviceId,
      user: existingUser.user,
      phoneNo: existingUser.phoneNo,
    };

    const updatedDevice = await Device.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({
      message: 'Device updated successfully',
      data: updatedDevice,
    });
  } catch (error) {
    console.error('Update device error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete Device
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDevice = await Device.findByIdAndDelete(id);
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('Delete device error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  registerDevice,
  loginDevice,
  getRegisteredDevices,
  updateDevice,
  deleteDevice,
};
