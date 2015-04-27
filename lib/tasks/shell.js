module.exports = {
  options: {
    stderr: false
  },
  deploy: {
    command: 'git push heroku master'
  }
};
