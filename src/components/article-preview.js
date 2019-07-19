import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    {/* <Img alt="" fluid={article.heroImage.fluid} /> */}
    <h3 className={styles.previewTitle}>
      <Link to={`/post/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.date}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.content,
      }}
    />
  </div>
)
