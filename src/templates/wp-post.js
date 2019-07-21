import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const WPPostTemplate = ({ data }) => (
  <Layout>
    <h1
      dangerouslySetInnerHTML={{
        __html: data.wordpressPost.title,
      }}
    ></h1>

    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
    />
  </Layout>
)
export default WPPostTemplate

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
