/**
 * Class representing a configuration source.
 *
 * This is not a functional implementation. This class should be extended to build one.
 * @exports ./configuration
 */
class Configuration {
  /**
   * Create a new Configuration
   * @param src
   */
  constructor (src) {
    this.src = src
    this.config = src
  }

  /**
   * Sync the config between memory and the source.
   */
  update () {}
}

module.exports = Configuration
