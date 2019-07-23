import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './articles.module.css'
import LayoutWithSiteData from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class ArticleIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allWordpressPost.edges')
    const heroData = get(this, 'props.data.image.childImageSharp')

    return (
      <LayoutWithSiteData location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <Hero
              data={{
                ...heroData,
                title: 'Recent Articles',
                details: '',
              }}
            />
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
    image: file(name: { eq: "welcomeback" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
