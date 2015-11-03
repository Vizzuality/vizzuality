# Vizzuality's website

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Installation

Requirements:

* Node 0.12+ [https://nodejs.org/download](instructions to install)

Install global dependencies:

    npm install -g grunt-cli bower nodemon

Install project dependencies:

    npm install


## Usage

At develop environment, to start:

    grunt serve

To deploy we use Heroku Toolbet [https://toolbelt.heroku.com](instructions to install):

    heroku git:remote -a [project-name] // Only use this command the first time
    grunt deploy


## Content. Markdown references

* **title:** Name of the project. It will be shown big on the main page and little on detail page. _(Global Forest Watch)_
* **short_title:** Short version, if needed, for using on the little boxes of the homepage. Write the same than tittle if there isn’t short version _(GFW)_
* **image:** Obvious representation of the project for homepage “cards” _(Screenshot of vizzualization)_
* **cover:** Symbolic image for using on the detail page _(A football player)_
* **summary:** Short explanation of the project. It will be used as subtitle on the big cards on the homepage and as a big title on the detail pages _(Half a million people watching forest change)_
* **fb_title** Title to display when the page is shared on Facebook
* **fb_description** Description of the project to display when the page is shared on Facebook
* **link** full URL for the site
* **link_short** remove http etc, this is for the text
* **client** who was it for
* **client_logo** no more than 200x200 and .png, add to app/images/client. can also add **svg_logo** where it exists
* **post_url** and **post_title** for latest blog entry
* **release_date** is the month/ year it was launched
* ** logoWidth** specifies the width (in px) of the logo(i.e.: logoWidth: 125). This attribute is mandatory.

## Order of Projects

When you add a new project it would be great if you could consult and [update this table](https://docs.google.com/spreadsheets/d/171t8Nkwt80hM3bK_sBKNMjOcrw53c8_n2CecwZL-2OE/edit#gid=0). It'll help make sure we're putting the most important projects in the right places!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The MIT License (MIT)

Copyright (c) 2015 Vizzuality

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
