const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { addSubscriber } = require('./mailchimp')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
const listId = process.env.MAILCHIMP_LIST_ID

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body

  try {
    await mailchimp.post(`/lists/${listId}/members`, {
      email_address: email,
      status: 'subscribed'
    })

    res.status(200).json({ message: 'Successfully subscribed!' })
  } catch (error) {
    res.status(400).json({ message: 'Subscription failed.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
