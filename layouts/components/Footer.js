import config from '@config/config.json'

const Footer = () => {
  const { subscription } = config

  if (!subscription || !subscription.title) {
    return null
  }

  return (
    <footer>
      <div className='container'>
        <div className='section'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-xl-6 col-lg-8 col-md-10'>
              <div className='newsletter-block'>
                <h2 className='section-title text-center mb-4'>
                  {subscription.title}
                </h2>

                <MailchimpSubscribe
                  url='https://github.us13.list-manage.com/subscribe/post?u=aaea64cc1ee1331667d23188f&amp;id=59759678dc'
                  render={({ subscribe, status, message }) => (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault()
                        const formData = new FormData(event.target)
                        subscribe({
                          EMAIL: formData.get('EMAIL')
                        })
                      }}
                    >
                      <div className='mc-field-group'>
                        <label htmlFor='mce-EMAIL'>
                          Email Address <span className='asterisk'>*</span>
                        </label>
                        <input
                          type='email'
                          name='EMAIL'
                          className='required email'
                          id='mce-EMAIL'
                          required
                        />
                      </div>
                      <div id='mce-responses' className='clear'>
                        <div
                          className='response'
                          id='mce-error-response'
                          style={{ display: status === 'error' ? 'block' : 'none' }}
                        >
                          {message}
                        </div>
                        <div
                          className='response'
                          id='mce-success-response'
                          style={{ display: status === 'success' ? 'block' : 'none' }}
                        >
                          Thank you for subscribing!
                        </div>
                      </div>
                      <div style={{ position: 'absolute', left: '-5000px' }}>
                        <input
                          type='text'
                          name='b_aaea64cc1ee1331667d23188f_59759678dc'
                          tabIndex='-1'
                          defaultValue=''
                        />
                      </div>
                      <div className='input-group-append d-flex d-sm-inline-block mt-2 mt-sm-0 ms-0 w-auto'>
                        <button
                          type='submit'
                          name='subscribe'
                          id='mc-embedded-subscribe'
                          className='input-group-text w-100 justify-content-center'
                          aria-label='Subscription Button'
                        >
                          {subscription.formButtonLabel}
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='pb-5'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <p className='mb-0 copyright-text content'>
                {config.site.title} &copy; {new Date().getFullYear()} All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
