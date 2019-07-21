import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './post.module.css'
import LayoutWithSiteData from '../components/layout'
import ArticlePreview from '../components/article-preview'

class ArticleIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allWordpressPost.edges')

    return (
      <LayoutWithSiteData location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}></div>
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
      </LayoutWithSiteData>
    )
  }
}

export default ArticleIndex

export const pageQuery = graphql`
  query ArticleIndexQuery {
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
          excerpt
        }
      }
    }
  }
`
