const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');

router.post('/', companyController.validateCompany, companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
