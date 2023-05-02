const Mailchimp = require('mailchimp-api-v3')
require('dotenv').config()

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
const listId = process.env.MAILCHIMP_LIST_ID

async function addSubscriber (email) {
  try {
    await mailchimp.post(`/lists/${listId}/members`, {
      email_address: email,
      status: 'subscribed'
    })

    return true
  } catch (error) {
    console.error('Subscription failed:', error.message)
    return false
  }
}

module.exports = { addSubscriber }
