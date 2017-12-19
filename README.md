# Hugo-Webpack Boilerplate

**For websites built with Hugo and Webpack**

## Usage (run with Docker)

```bash
# Serve with watch, livereload
make dev

# Serve with static assets
make serve

# Build assets
make release
```

## Usage (run locally)

Be sure that you have the latest node, npm and [Hugo](https://gohugo.io/) installed. If you need to install hugo on OSX, run:

```bash
brew install hugo
```

If you don't use OSX or don't use homebrew, follow the instructions for installation here instead:

http://gohugo.io/overview/installing/

Next, clone this repository and run:

```bash
npm install
npm start
```

Then visit http://localhost:3000/ - BrowserSync will automatically reload CSS or
refresh the page when stylesheets or content changes.

To build your static output to the `/dist` folder, use:

```bash
npm run build
```

## Structure

```
|--dist                // HTML/CSS/JS/Media end up here
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--scss             // main.scss will compile to styles.css
|  |--js               // app.js will be compiled to /app.js with babel
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page there is the one about the available functions:

https://gohugo.io/templates/functions/

For assets that are completely static and don't need to go through the asset pipeline,
use the `site/static` folder. Images, font-files, etc, all go there.

Files in the static folder ends up in the web root. So a file called `site/static/favicon.ico`
will end up being available as `/favicon.ico` and so on...

The `src/js/app.js` file is the entrypoint for webpack and will be built to `/dist/app.js`.

Any SCSS entry points (default `src/scss/main.scss`) must be required both
in `app.js` and in the HTML header.

You can use ES6 and use both relative imports or import libraries from npm.

## Deploying

Any changes to `master` will be deployed automatically to Github Pages. See `.travis.yml` for configuration.
