import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import config from '@config/config.json'
import theme from '@config/theme.json'
import { JsonContext } from 'context/state'
import Head from 'next/head'
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

  // Google Analytics
  const router = useRouter()
  useEffect(() => {
    ReactGA.initialize('G-R0VLZYGTMT')
    ReactGA.pageview(window.location.pathname + window.location.search)

    router.events.on('routeChangeComplete', () => {
      ReactGA.pageview(window.location.pathname + window.location.search)
    })
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
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.params.google_analytics_id}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${config.params.google_analytics_id}');
            `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </JsonContext>
  )
}

export default App



