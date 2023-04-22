import Social from '@components/Social'
import config from '@config/config.json'
import menu from '@config/menu.json'
import social from '@config/social.json'
import { markdownify } from '@lib/utils/textConverter'
import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    const data = await response.json()
    setStatus(data.status)
    setEmail('')
  }

  const { copyright } = config.params
  return (
    <footer className='section bg-theme-dark'>
      <div className='container text-center'>
        {/* footer menu */}
        <ul className='mb-8 space-x-4'>
          {menu.footer.map((menu) => (
            <li className='inline-block' key={menu.name}>
              <Link href={menu.url} className='p-4 text-light hover:text-white'>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* subscription form */}
        <form onSubmit={handleSubmit} className='mb-8'>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <div className='flex'>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email'
              className='w-full px-4 py-2 mr-2 text-dark bg-white rounded-md'
              required
            />
            <button
              type='submit'
              className='inline-block px-4 py-2 font-bold text-white bg-primary rounded-md hover:bg-primary-dark'
            >
              Subscribe
            </button>
          </div>
          {status && (
            <p className='mt-2 text-sm text-white'>
              {status === 'success'
                ? 'Thank you for subscribing!'
                : 'Oops! Something went wrong. Please try again.'}
            </p>
          )}
        </form>
        {/* social icons */}
        <Social source={social} className='social-icons mb-8' />
        {/* copyright */}
        {markdownify(copyright, 'p', 'text-light')}
      </div>
    </footer>
  )
}

export default Footer
