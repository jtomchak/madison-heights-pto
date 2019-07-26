import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.css'
import LayoutWithSiteData from '../components/layout'
import ArticlePreview from '../components/article-preview'
import MailChimpSubscribe from '../components/mailchimp-subscribe'
import Hero from '../components/hero'

class RootIndex extends React.Component {
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
                title: 'Heights PTO',
                details: 'supporting students, teachers, and parents',
              }}
            />
            <MailChimpSubscribe />
            {/* <h2 className="section-headline">Upcoming Events</h2> */}
            <div className={styles.btnArea}>
              <a
                href="https://sites.google.com/view/mhpto-volunteer-opps/home"
                target="_blank"
                rel="noopener norefferer"
              >
                Volunteer Opportunities
              </a>
              <a
                href="https://www.facebook.com/heightspto/"
                title="Facebook"
                className={styles.btnFacebook}
              >
                <FontAwesomeIcon
                  icon={['fab', 'facebook-f']}
                  style={{ marginRight: '5px' }}
                />
                Join Us on Facebook
              </a>
            </div>

            <h2 className="section-headline">Articles</h2>
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
    image: file(relativePath: { eq: "images/madison_heights_building.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
