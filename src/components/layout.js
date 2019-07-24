import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fab,
  faGithubAlt,
  faGoogle,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faFacebook)

class Template extends React.Component {
  render() {
    const { location, children, data } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation logo={data.logo} site={data.site} />
        {children}
      </Container>
    )
  }
}

export default function LayoutWithSiteData(props) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              menuLinks {
                name
                link
              }
            }
          }
          logo: file(relativePath: { eq: "images/Madison-Heights-Logo.png" }) {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => <Template data={data} {...props} />}
    />
  )
}
