const Configuration = require('./configuration')
const fs = require('fs')

/**
 * Class representing a JSON file as a configuration source.
 * @exports config/fileconfiguration
 * */
class FileConfiguration extends Configuration {
  /**
   * Create a new FileConfiguration
   * @param src
   */
  constructor (src) {
    super(src)
    this.src = src
    this.config = JSON.parse(fs.readFileSync(src))
  }

  /**
   * Sync the config between memory and disk.
   */
  update () {
    const disk = JSON.parse(fs.readSync(this.src))
    this.config = Object.assign(disk, this.config)
    fs.writeFile(this.src, JSON.stringify(this.config), {flag: 'w'}, (err) => {
      if (err) throw err
    })
  }
}

module.exports = FileConfiguration
