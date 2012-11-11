var model = require('./model')
var api   = require('./logic')
var wrap = require("./wrap")

model.on('create', function (row) {
  //on the first update, set api stuff...
  row.api = api(row)
  row.once('update', function () {
    // console.log('create', row.toJSON())
      // console.log(row)
    var _fn
    row.on('change', function (ch) {
      var fn
      if(ch.source) {
        try {
          fn = wrap(ch.source)(row.api)
        } catch (err) {
          console.error(err, ch.source)
        }
      }
    })

    if(row.get('type') === 'monster') {
      row.set("source", string(init))
    } else if (row.get("type") === "tree") {
      row.set("source", string(tree))
    } else if (row.get("type") === "rock") {
      row.set("source", string(rock))
    }
  })
})

function tree() {
  // I am a tree
}

function rock() {
  // I am a rock
}

//this function is eval'd (the user will enter it as text...)
/*global self*/

//remove indentation, so that it displays property in the text editor
function init () {
self.say('hello')
self.think(function () {
  function r () {
    return (Math.random()*2 - 1)
  }

  var x = r(), y = r()
  var l = Math.sqrt(x*x + y*y)
  x = x / l; y = y / l
  self.move(x*10, y*10)

  if(Math.random() < 0.1)
    self.say('woof')
})

//if another monster speaks nearby...
self.hear(function (words, id) {
  //...
})
}

function string(code) {
  code = code.toString()
  return code.substring(code.indexOf('{') + 1, code.length - 2)
}
