/* eslint-disable @typescript-eslint/camelcase */
const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'shadez95 website',
    description:
      'shadez95 is a developer, PC gamer, and automotive enthusiast',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        openAnalyzer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'shadez95 website',
        short_name: 'shadez95 website',
        start_url: '/',
        background_color: '#162b35',
        theme_color: '#162b35',
        icons: [
          { src: 'static/assets/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
          { src: 'static/assets/android-icon-48x48.png', sizes: '48x48', type: 'image/png' },
          { src: 'static/assets/android-icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: 'static/assets/android-icon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: 'static/assets/android-icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: 'static/assets/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'static/assets/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
          { src: 'static/assets/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
          { src: 'static/assets/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: 'static/assets/apple-icon-72x72.png', sizes: '76x76', type: 'image/png' },
          { src: 'static/assets/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
          { src: 'static/assets/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
          { src: 'static/assets/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
          { src: 'static/assets/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: 'static/assets/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { src: 'static/assets/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
          { src: 'static/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { src: 'static/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          { src: 'static/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'static/assets/shadez.png', // This path is relative to the root of the site.
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    );
  },
};
