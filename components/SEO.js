import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const SEO = ({
  title = 'MyWebClass | Minimal NextJS Blog Template',
  description = 'MyWebClass - a minimal nextjs blog template',
  image = '/images/favicon.png',
  url = 'https://localhost:3000',
}) => {
  const siteName = 'MyWebClass | Minimal NextJS Blog Template';

  const titleTemplate = `%s | ${siteName}`;

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          images: [
            {
              url: `${url}${image}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          url: url,
        }}
        twitter={{
          handle: '@mywebclass',
          site: siteName,
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:image" content={`${url}${image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@handle" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${url}${image}`} />
      </Head>
    </>
  );
};

export default SEO;
