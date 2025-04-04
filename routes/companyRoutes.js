const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');

//logging out to home page
router.get('/homepage', (req,res)=>{
    res.render('listings/homepage');
});

router.post('/signup', companyController.validateCompany, companyController.createCompany);
// router.get('/', companyController.getAllCompanies);
// router.get('/:id', companyController.getCompanyById);
// router.put('/:id', companyController.updateCompany);
// router.delete('/:id', companyController.deleteCompany);

module.exports = router;
