const express = require('express');
const router = express.Router();
const certificatesController = require('../controllers/certificatesController');

// Routes for certificates
router.post('/', certificatesController.createCertificate);
router.get('/', certificatesController.getCertificates);
router.get('/:id', certificatesController.getCertificateById);
router.put('/:id', certificatesController.updateCertificate);
router.delete('/:id', certificatesController.deleteCertificate);

module.exports = router;
