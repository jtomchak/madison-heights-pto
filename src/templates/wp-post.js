import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const WPPostTemplate = ({ data }) => (
  <Layout>
    <div style={styles.wrapper}>
      <h1
        dangerouslySetInnerHTML={{
          __html: data.wordpressPost.title,
        }}
      ></h1>

      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
      />
    </div>
  </Layout>
)
export default WPPostTemplate

const styles = {
  wrapper: {
    width: 'calc(100% - 10vmin)',
    margin: '0 auto',
    padding: '5vmin 0',
  },
}

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
