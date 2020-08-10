import { build } from 'gluegun'

async function run(argv) {
  const cli = build()
    .brand('cli-configurator')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'cli-configurator-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .checkForUpdates(5)
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
