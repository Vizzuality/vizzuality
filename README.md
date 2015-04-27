# Vizzuality website

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.

## How to install

Requirements:

* Node 0.12+ [https://nodejs.org/download](instructions to install)


Install global dependencies:

    npm install -g grunt-cli bower nodemon

Install project dependencies:

    npm install

At develop environment:
    
    npm install && bower install
    grunt serve

To deploy:

    heroku git:remote -a vizzuality // Only use this command the first time
    grunt deploy
