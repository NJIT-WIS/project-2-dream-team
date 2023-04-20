const fs = require('fs')

if (!fs.existsSync('./cache/data.js')) {
  fs.writeFileSync('./cache/data.js', '{}')
}
