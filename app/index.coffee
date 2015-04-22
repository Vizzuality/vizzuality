express = require 'express'
bodyParser = require 'body-parser'
path = require 'path'
root = process.cwd()
file = require root + '/app/lib/file'

# App
app = express()

app.set 'views', './app/views'
app.set 'view engine', 'jade'

app.use bodyParser.json()
app.use bodyParser.urlencoded({ extended: false })
app.use express.static(path.join(root, 'public'))
app.use '/bower_components', express.static(path.join(root, 'bower_components'))

# Errors
pageNotFound = (req, res)->
  res.render 'errors/404'

# Router
app.get '/', (req, res)->
  projectsPath = root + '/content/projects'
  file.getFiles projectsPath, (err, data)->
    if err then return pageNotFound(req, res)
    res.render 'projects/index', projects: data

app.get '/projects', (req, res)->
  res.redirect '/'

app.get '/projects/:project', (req, res)->
  filePath = './content/projects/' + req.params.project + '.md'
  file.getData filePath, (err, result, html)->
    if err then return pageNotFound(req, res)
    res.render 'projects/show',
      data: result.data
      content: html

app.get '/about', (req, res)->
  teamPath = root + '/content/team'
  file.getFiles teamPath, (err, data)->
    if err then return pageNotFound(req, res)
    res.render 'team/index', team: data

app.get '/about/:member', (req, res)->
  filePath = './content/team/' + req.params.member + '.md'
  file.getData filePath, (err, result, html)->
    if err then return pageNotFound(req, res)
    res.render 'team/show',
      data: result.data
      content: html

module.exports = app
