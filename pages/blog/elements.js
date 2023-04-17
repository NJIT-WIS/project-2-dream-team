import Layout from '@/components/Layout'
import PageHeaderBlock from '@/components/PageHeader'
import useScripts from '@/components/Scripts'
import { getSinglePage } from '@/libs/getSinglePage'
import { marked } from 'marked'

export default function Elements ({ elements: { frontMatter, content } }) {
  return (
    <Layout metaTitle={frontMatter.title}>
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div
                className='content'
                dangerouslySetInnerHTML={{
                  __html: marked.parse(content)
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {useScripts('/js/lightense/lightense.min.js', 'body', true)}
    </Layout>
  )
}

export async function getStaticProps () {
  return {
    props: {
      elements: getSinglePage('content/elements.md')
    }
  }
}
