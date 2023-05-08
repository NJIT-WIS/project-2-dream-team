import Social from '@components/Social'
import config from '@config/config.json'
import menu from '@config/menu.json'
import social from '@config/social.json'
import { markdownify } from '@lib/utils/textConverter'
import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const MAILCHIMP_FORM_ACTION = 'https://github.us13.list-manage.com/subscribe/post?u=aaea64cc1ee1331667d23188f&id=59759678dc&f_id=001cafe2f0'

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
        <form action={MAILCHIMP_FORM_ACTION} method='POST' className='mb-8'>
          <input type='hidden' name='u' value='aaea64cc1ee1331667d23188f' />
          <input type='hidden' name='id' value='59759678dc' />
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <div className='flex'>
            <input
              type='email'
              name='EMAIL'
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
