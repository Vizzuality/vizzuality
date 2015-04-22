fs        = require 'fs'
path      = require 'path'
matter    = require 'gray-matter'
Showdown  = require('showdown')
converter = new Showdown.converter()

module.exports =

  getData: (filePath, next)->
    fs.readFile filePath, 'utf8', (err, file)->
      if err or !file
        return next({ error: 'file not found' })
      result = matter(file)
      html = converter.makeHtml(result.content)
      next(null, result, html)

  getFiles: (dir, next)->
    data = []
    files = fs.readdirSync dir
      .filter (file) ->
        file.indexOf('.') != 0 and path.extname(file) == '.md'
    for file in files
      filePath = path.join dir, file
      element = matter(fs.readFileSync(filePath, 'utf8')).data
      element.slug = file.split('.md')[0]
      data.push element
    next(null, data)
