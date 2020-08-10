import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'set:home',
  alias: ['g'],
  description: 'Under construction',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info }
    } = toolbox

    info(process.env)
    if (process.env.CONFIG_HOME) {
      info('Exists!')
    } else {
      info("Doesn't exists")
      process.env.CONFIG_HOME = 'c:teste'
    }
  }
}
