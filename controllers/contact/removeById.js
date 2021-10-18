const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const removeById = async (req, res) => {
  const { contactId } = req.params
  const owner = req.user._id
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner
  })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, { message: 'Contact deleted' })
}

module.exports = removeById
