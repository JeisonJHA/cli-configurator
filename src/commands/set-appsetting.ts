import { GluegunToolbox } from 'gluegun'
import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'

interface Config {
  bases: string[]
}

module.exports = {
  name: 'set:appsettings',
  description: 'Set the appsettings of the base and project selected.',
  alias: ['s:app'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { error },
      prompt,
      filesystem
    } = toolbox

    if (!process.env.CONFIG_HOME) {
      error('Configure the environment variable CONFIG_HOME')
      return
    }
    const pathHome = process.env.CONFIG_HOME

    async function getProjetName(): Promise<string> {
      const getDirectories = (source: string) =>
        readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      const projetos = getDirectories(pathHome)
      const projeto = await prompt.ask([
        {
          type: 'select',
          name: 'projeto',
          message: 'Choose a project',
          choices: projetos
        }
      ])
      return projeto.projeto
    }

    async function getBaseName(): Promise<string> {
      const configJson = join(pathHome, 'config.json')
      let obj = JSON.parse(readFileSync(configJson, 'utf8')) as Config
      const base = await prompt.ask([
        {
          type: 'select',
          name: 'base',
          message: 'Choose a dbConfig',
          choices: obj.bases
        }
      ])
      return base.base
    }

    function getAppSettingsPath(projeto: string): string {
      const settingsPath = join(pathHome, projeto, 'project-config.json')
      let projectConfig = JSON.parse(readFileSync(settingsPath, 'utf8'))
      return projectConfig.path
    }

    function getAppSettings(projeto: string, base: string): Buffer {
      const appSettingsPath = join(pathHome, projeto, `${base}.json`)
      return readFileSync(appSettingsPath)
    }

    function saveAppSettings(file: Buffer, where: string) {
      const destination = join(filesystem.path(), where, 'appsettings.json')
      filesystem.write(destination, file)
    }

    const projectName = await getProjetName()
    const baseName = await getBaseName()
    const appSettings = getAppSettings(projectName, baseName)
    const appSettingsPath = getAppSettingsPath(projectName)
    saveAppSettings(appSettings, appSettingsPath)
  }
}
