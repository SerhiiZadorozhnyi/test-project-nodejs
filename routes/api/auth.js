const express = require('express')

const { validation, controllerWrapper, authenticate } = require('../../middlewares')
const { joiSchema, joiSchemaSub } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.current))

router.get('/', controllerWrapper(authenticate), validation(joiSchemaSub), controllerWrapper(ctrl.subscription))

module.exports = router
