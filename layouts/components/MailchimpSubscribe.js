import React from 'react'
import PropTypes from 'prop-types'
import jsonp from 'jsonp'
import toQueryString from 'to-querystring'

const getAjaxUrl = (url) => url.replace('/post?', '/post-json?')

const MailchimpSubscribe = ({ url }) => {
  const [status, setStatus] = React.useState(null)
  const [message, setMessage] = React.useState(null)
  const emailRef = React.useRef(null)

  const subscribe = (event) => {
    event.preventDefault()

    const email = emailRef.current.value.trim()

    if (email) {
      const data = {
        EMAIL: email
      }

      const params = toQueryString(data)
      const ajaxUrl = getAjaxUrl(url) + '&' + params

      setStatus('sending')
      setMessage(null)

      jsonp(ajaxUrl, { param: 'c' }, (err, data) => {
        if (err) {
          setStatus('error')
          setMessage(err)
        } else if (data.result !== 'success') {
          setStatus('error')
          setMessage(data.msg)
        } else {
          setStatus('success')
          setMessage(data.msg)
        }
      })
    }
  }

  return (
    <div id='mc_embed_signup'>
      <form onSubmit={subscribe}>
        <div className='mc-field-group'>
          <label htmlFor='mce-EMAIL'>Email Address</label>
          <input
            type='email'
            defaultValue=''
            name='EMAIL'
            ref={emailRef}
            className='required email'
            id='mce-EMAIL'
            required
          />
        </div>
        <div style={{ position: 'absolute', left: '-5000px' }}>
          <input
            type='text'
            name='b_aaea64cc1ee1331667d23188f_59759678dc'
            tabIndex='-1'
            defaultValue=''
          />
        </div>
        <button type='submit' name='subscribe' id='mc-embedded-subscribe'>
          Subscribe
        </button>
      </form>

      {status === 'sending' && <p>Sending...</p>}
      {status === 'success' && <p>Thank you for subscribing!</p>}
      {status === 'error' && <p>{message}</p>}
    </div>
  )
}

MailchimpSubscribe.propTypes = {
  url: PropTypes.string.isRequired
}

export default MailchimpSubscribe
