import { addSubscriber } from '../../../../../../mailchimp'

export default async function subscribe (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const result = await addSubscriber(email)

  if (result) {
    return res.status(200).json({ success: true })
  } else {
    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' })
  }
}
