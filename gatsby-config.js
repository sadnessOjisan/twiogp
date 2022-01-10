module.exports = {
  siteMetadata: {
    siteUrl: "https://twiogp.ojisan.dev",
    title: "twiogp",
    author: `@sadnessOjisan`,
  },
  plugins: [
    "gatsby-plugin-typegen",
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/resources/`,
      },
    },
  ],
};
