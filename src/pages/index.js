import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './index.module.css'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import Hero from '../components/hero'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allWordpressPost.edges')
    const heroData = get(this, 'props.data.image.childImageSharp')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          {/* <Hero data={data.file} /> */}

          <div className="wrapper">
            <Hero data={{ ...heroData, title: 'Heights PTO' }} />
            <h2 className="section-headline">Recent articles</h2>
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
    image: file(relativePath: { eq: "images/madison_heights.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
