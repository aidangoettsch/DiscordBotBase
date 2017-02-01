/**
 * Class which handles logging to a channel and console.
 * @exports core/logger
 */
class Logger {
  /**
   * Create a new Logger.
   * @param bot
   * @param logChannels
   */
  constructor (bot) {
    this.bot = bot
  }

  /**
   * Log a message to the console and designated channels
   * @param level
   * @param msg
   * @param logChannels
   */
  log (level, msg, logChannels, command) {
    const date = new Date()
    if (logChannels) {
      for (const logChannel in logChannels) {
        logChannels[logChannel].createMessage('**' + level.toUpperCase() + ' //** ' + msg).then()
      }
    }
    if (!command) console.log(date.toLocaleTimeString() + ' // ' + level.toUpperCase() + ' // ' + msg)
  }
}

module.exports = Logger
