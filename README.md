# shadez95-website

Shadez95 website uses Gatsby, NetlifyCMS, and TypeScript. It's based off of this [repo](https://github.com/otanu/gatsby-starter-netlify-cms) that uses the original [gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms) template, but with TypeScript.

shadez95 website is being hosted at [shadez95.dev](https://shadez95.dev).

## Features

- [bulma](https://bulma.io/) CSS framework
- [fontawesome](https://fontawesome.com) for icons
- [style-components](https://www.styled-components.com/) to make reusable bulma styled components
- [ESLint](https://eslint.org/)-[Prettier](https://prettier.io/)-[VSCode](https://code.visualstudio.com/) integration so that code is automatically refactored. Currently, it's configured to use eslint-config-airbnb.

## Development

`npm start` will run both the Netlify AWS lambda functions and gatsby site in a development environment.

`npm develop` will only run gatsby site in development environment.

If you plan on not using AWS lambda functions with Netlify, don't install netlify-lambda and reconfigure the scripts portion of package.json to suit your needs. Happy coding :)
