require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Madison Heights PTO',
    menuLinks: [
      {
        name: 'Articles',
        link: '/articles',
      },
    ],
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://heightspto.us3.list-manage.com/subscribe/post?u=257417558cbb6e604d3109ac9&amp;id=7786023a0f', // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your wordpress source
        baseUrl: `content.elementcasting.com/heightspto`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: true,
      },
      // Set how many simultaneous requests are sent at once.
      concurrentRequests: 10,
      includedRoutes: [
        '**/categories',
        '**/posts',
        '**/pages',
        '**/media',
        '**/tags',
        '**/taxonomies',
        '**/users',
        '**/*/*/menus',
        '**/*/*/menu-locations',
      ],
      excludedRoutes: [],
      normalizer: function({ entities }) {
        return entities
      },
    },
  ],
}
