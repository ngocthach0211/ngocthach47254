const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const lopValidation = require('../../validations/class.validation');
const lopController = require('../../controllers/class.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(lopValidation.createUser), lopController.createUser)
  .get(validate(lopValidation.getUsers), lopController.getUsers);

router
  .route('/:userId')
  .get(validate(lopValidation.getUser), lopController.getUser)
  .patch(validate(lopValidation.updateUser), lopController.updateUser)
  .delete(validate(lopValidation.deleteUser), lopController.deleteUser);

module.exports = router;