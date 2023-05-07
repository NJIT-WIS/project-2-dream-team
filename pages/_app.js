import config from '@config/config.json'
import theme from '@config/theme.json'
import { JsonContext } from 'context/state'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import { CookieConsent } from 'react-cookie-consent'
import 'styles/style.scss'

const App = ({ Component, pageProps }) => {
  // import google font css
  const pf = theme.fonts.font_family.primary
  const sf = theme.fonts.font_family.secondary
  const [fontcss, setFontcss] = useState()
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? '&family=' + sf : ''
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)))
  }, [pf, sf])

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id
  }
  useEffect(() => {
    setTimeout(() => {
      config.params.tag_manager_id && TagManager.initialize(tagManagerArgs)
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <JsonContext>
      <Head>
        <meta property='og:title' content='MyWebClass' />
        <meta property='og:description' content='Revolutionize Education: Empower your classroom with Easy Daily Management' />
        {/* google font css */}
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`
          }}
        />
        {/* responsive meta */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-R0VLZYGTMT' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R0VLZYGTMT');
            `
          }}
        />
      </Head>
      <CookieConsent
        location='bottom'
        buttonText='I accept'
        cookieName='myWebClassCookieConsent'
        style={{ background: '#000', opacity: 0.9, color: '#fff' }}
        buttonStyle={{ color: '#000', background: '#fff', borderRadius: '5px' }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.{' '}
        <a
          href='https://cookiesandyou.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn More
        </a>
      </CookieConsent>
      <Component {...pageProps} />
    </JsonContext>
  )
}

export default App
