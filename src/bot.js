const Eris = require('eris')
const FileConfiguration = require('./config/FileConfiguration.js')
const Command = require('./core/Command.js')
const Logger = require('./core/Logger.js')
const path = require('path')

// WARNING: DO NOT EDIT THIS SECTION
// =================================

/**
 * A class representing the bot client.
 */
class Bot {
  /**
   * Create a new bot
   */
  constructor () {
    this.config = new FileConfiguration(path.join('cfg', 'config.json'))
    this.packageJSON = new FileConfiguration(path.join('cfg', 'config.json'))
    this.activeGuilds = {}
    this.commands = {}
    this.logger = new Logger(this)
    this.meta = {
      description: this.packageJSON.config.description,
      owner: this.packageJSON.config.author,
      version: this.packageJSON.config.version
    }

    this.client = new Eris(this.config.config.bot.token, {})

    this.client.connect()

    this.activeGuilds = this.config.config.behavior.guilds

    this.client.on('ready', () => {
      bot.logger.log('info', 'Ready!')
    })

    this.client.on('messageCreate', (msg) => {
      if (msg.content.startsWith(this.activeGuilds[msg.guild.id].commands.prefix)) {
        for (const commandName in this.commands) {
          if (msg.content.startsWith(this.activeGuilds[msg.guild.id].commands.prefix + this.activeGuilds[msg.guild.id].commands[commandName].usageName)) {
            let args = msg.content.split(' ')
            args.splice(0, 1)
            this.commands[commandName].emit('commandRun', msg, args)
          }
        }
      }
    })

    this.registerCommand(new Command('help', 'Show this help message.')).on('commandRun', (msg) => {
      let helpString = 'Help for // **GENERAL** //\n'
      for (const command in this.commands) {
        helpString += '**' + this.activeGuilds[msg.guild.id].commands.prefix + this.activeGuilds[msg.guild.id].commands[command].usageName +
          '** - ' + this.commands[command].description + '\n'
      }
      this.logger.log('help', helpString, [msg.channel])
    })
  }
  /**
   * Register a command.
   *
   * @param command
   * @returns {Command}
   */
  registerCommand (command) {
    this.commands[command.internalname] = command
    return command
  }
}

const bot = new Bot()

// DO NOT EDIT ABOVE THIS LINE
// ===========================
// Bot code should go here
