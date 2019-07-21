import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={data.title} fluid={data.fluid} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.title}</h3>
      <p className={styles.heroTitle}>{data.details}</p>
    </div>
  </div>
)
