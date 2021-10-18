const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegexp = /^[a-z ,.'-]+$/i
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
    match: nameRegexp
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
    match: emailRegexp
  },
  phone: {
    type: String,
    required: [true, 'Set phone-number for contact'],
    match: phoneRegexp
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  Contact
}
