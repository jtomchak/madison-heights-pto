const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const WPPostTemplate = path.resolve('./src/templates/wp-post.js')
    const PageTemplate = path.resolve('./src/templates/Page.js')
    resolve(
      graphql(
        `
          {
            allWordpressPage {
              edges {
                node {
                  slug
                  wordpress_id
                }
              }
            }
            allWordpressPost {
              edges {
                node {
                  slug
                  wordpress_id
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const Posts = result.data.allWordpressPost.edges
        Posts.forEach(post => {
          createPage({
            path: `/post/${post.node.slug}`,
            component: WPPostTemplate,
            context: {
              id: post.node.wordpress_id,
            },
          })
        })

        const Pages = result.data.allWordpressPage.edges
        Pages.forEach(page => {
          createPage({
            path: `/${page.node.slug}`,
            component: PageTemplate,
            context: {
              id: page.node.wordpress_id,
            },
          })
        })
      })
    )
  })
}
