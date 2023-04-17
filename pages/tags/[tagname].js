import Layout from '@/components/Layout'
import PageHeaderTaxo from '@/components/PageHeaderTaxonomy'
import Post from '@/components/Post'
import siteConfig from '@/config/site.config.json'
import { getAuthors } from '@/libs/getAuthors'
import { getPosts } from '@/libs/getPosts'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export default function TagSingle ({ authors, posts, tag }) {
  const flatPosts = posts.flat()
  function getUniquePostsBy (flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()]
  }
  const uniquePosts = getUniquePostsBy(flatPosts, 'slug')

  const postColumns = siteConfig.postColumns

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')
      }`}
    >
      <div className='container'>
        <PageHeaderTaxo title={tag} />

        <div className='row gy-5 gx-4 g-xl-5'>
          {uniquePosts.map((post, i) => (
            <div
              key={i}
              className={postColumns == 3 ? 'col-lg-4 col-md-6' : 'col-lg-6'}
            >
              <Post post={post} authors={authors} postColumns={postColumns} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths () {
  const file = fs.readdirSync(path.join('content/blog'))
  const allTags = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/blog', file),
      'utf-8'
    )
    const { data: frontmatter } = matter(dirFileContents)

    return frontmatter.tags
  })

  const flatTags = allTags.flat()
  const uniqueTags = [...new Set(flatTags)]

  const paths = uniqueTags.map((t) => ({
    params: {
      tagname: t.toString().replace(/ /g, '-').toLowerCase()
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const file = fs.readdirSync(path.join('content/blog'))
  const posts = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/blog', file),
      'utf-8'
    )
    const { data: frontMatter } = matter(dirFileContents)
    const filterFm = frontMatter.tags.filter(
      (c) => c.toLowerCase().replace(/ /g, '-') === params.tagname
    )

    const post = getPosts()
    const data = post.filter((e) => {
      return e.frontMatter.tags.some((a) => {
        return filterFm.indexOf(a) != -1
      })
    })

    return data
  })

  return {
    props: {
      authors: getAuthors(),
      posts,
      tag: params.tagname
    }
  }
}
