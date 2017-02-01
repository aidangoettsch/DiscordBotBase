const EventEmitter = require('events')

/**
 * A class representing a command.
 *
 * @exports ./command
 */
class Command extends EventEmitter {
  /**
   * Create a new command.
   * @param internalName
   */
  constructor (internalName, description) {
    super()
    this.internalname = internalName
    this.description = description
  }
}

module.exports = Command
