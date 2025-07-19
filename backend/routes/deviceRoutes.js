const express = require('express');
const router = express.Router();
const {
  registerDevice,
  loginDevice,
  getRegisteredDevices, // ✅ Corrected function name
  updateDevice,
  deleteDevice
} = require('../controllers/deviceController');

// Register a new device
router.post('/registered', registerDevice);

// Login device
router.post('/registered/login', loginDevice);

// Get all registered devices
router.get('/registered', getRegisteredDevices); // ✅ Correct function used

// Update device details
router.put('/registered/:id', updateDevice);

// Delete a device
router.delete('/registered/:id', deleteDevice);

module.exports = router;
