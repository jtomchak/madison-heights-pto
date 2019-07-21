import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './post.module.css'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class PostIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allWordpressPost.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Posts</div>
          <div className="wrapper">
            <h2 className="section-headline">Recent Articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostIndex

export const pageQuery = graphql`
  query PostIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          slug
          date(formatString: "MMMM Do, YYYY")
          content
        }
      }
    }
  }
`
