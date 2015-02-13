Sonos Suit Prototyping Kit
==========================

Requirements:

1. [Node.js](http://nodejs.org)
2. Sass: install by running `gem install sass` from the terminal window.
3. Make sure the `grunt-cli` npm is installed. You can do so by running `npm install -g grunt-cli`. If you have
permission problems, try running `sudo npm install -g grunt-cli`. You'll need to enter your password.

This is the Sonos Suit prototyping kit. To install, clone the repo or download the zip file to your computer.
Run `npm install` and the project will install all of the appropriate dependencies. If you want to host your pages on
Github, be sure to update "homepage" url in the `package.json` file with your Github pages url or whatever url
you desire.

After installing your dependencies, you can run the `grunt` command to start the local server.

To enable LiveReload, in a separate terminal window, run `grunt watch`.

To generate HTML for a static upload to a server or GitHub pages, run `grunt deploy`.