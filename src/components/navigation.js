import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './navigation.module.css'

export default ({ logo, site }) => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">
          <Img
            className={styles.logo}
            alt="logo"
            fixed={logo.childImageSharp.fixed}
          />
        </Link>
      </li>
      {site.siteMetadata.menuLinks.map(link => (
        <li key={link.link} className={styles.navigationItem}>
          <Link to={link.link}>{link.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
)
