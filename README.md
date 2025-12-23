track-changes-tmp
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/track-changes-tmp.svg)](https://npmjs.org/package/track-changes-tmp)
[![Downloads/week](https://img.shields.io/npm/dw/track-changes-tmp.svg)](https://npmjs.org/package/track-changes-tmp)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g track-changes-tmp
$ track-changes-tmp COMMAND
running command...
$ track-changes-tmp (--version)
track-changes-tmp/0.0.0 win32-x64 node-v24.12.0
$ track-changes-tmp --help [COMMAND]
USAGE
  $ track-changes-tmp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`track-changes-tmp hello PERSON`](#track-changes-tmp-hello-person)
* [`track-changes-tmp hello world`](#track-changes-tmp-hello-world)
* [`track-changes-tmp help [COMMAND]`](#track-changes-tmp-help-command)
* [`track-changes-tmp plugins`](#track-changes-tmp-plugins)
* [`track-changes-tmp plugins add PLUGIN`](#track-changes-tmp-plugins-add-plugin)
* [`track-changes-tmp plugins:inspect PLUGIN...`](#track-changes-tmp-pluginsinspect-plugin)
* [`track-changes-tmp plugins install PLUGIN`](#track-changes-tmp-plugins-install-plugin)
* [`track-changes-tmp plugins link PATH`](#track-changes-tmp-plugins-link-path)
* [`track-changes-tmp plugins remove [PLUGIN]`](#track-changes-tmp-plugins-remove-plugin)
* [`track-changes-tmp plugins reset`](#track-changes-tmp-plugins-reset)
* [`track-changes-tmp plugins uninstall [PLUGIN]`](#track-changes-tmp-plugins-uninstall-plugin)
* [`track-changes-tmp plugins unlink [PLUGIN]`](#track-changes-tmp-plugins-unlink-plugin)
* [`track-changes-tmp plugins update`](#track-changes-tmp-plugins-update)

## `track-changes-tmp hello PERSON`

Say hello

```
USAGE
  $ track-changes-tmp hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ track-changes-tmp hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/advanced-salesforce-tooling/track-changes-tmp/blob/v0.0.0/src/commands/hello/index.ts)_

## `track-changes-tmp hello world`

Say hello world

```
USAGE
  $ track-changes-tmp hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ track-changes-tmp hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/advanced-salesforce-tooling/track-changes-tmp/blob/v0.0.0/src/commands/hello/world.ts)_

## `track-changes-tmp help [COMMAND]`

Display help for track-changes-tmp.

```
USAGE
  $ track-changes-tmp help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for track-changes-tmp.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.36/src/commands/help.ts)_

## `track-changes-tmp plugins`

List installed plugins.

```
USAGE
  $ track-changes-tmp plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ track-changes-tmp plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/index.ts)_

## `track-changes-tmp plugins add PLUGIN`

Installs a plugin into track-changes-tmp.

```
USAGE
  $ track-changes-tmp plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into track-changes-tmp.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TRACK_CHANGES_TMP_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TRACK_CHANGES_TMP_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ track-changes-tmp plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ track-changes-tmp plugins add myplugin

  Install a plugin from a github url.

    $ track-changes-tmp plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ track-changes-tmp plugins add someuser/someplugin
```

## `track-changes-tmp plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ track-changes-tmp plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ track-changes-tmp plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/inspect.ts)_

## `track-changes-tmp plugins install PLUGIN`

Installs a plugin into track-changes-tmp.

```
USAGE
  $ track-changes-tmp plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into track-changes-tmp.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TRACK_CHANGES_TMP_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TRACK_CHANGES_TMP_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ track-changes-tmp plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ track-changes-tmp plugins install myplugin

  Install a plugin from a github url.

    $ track-changes-tmp plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ track-changes-tmp plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/install.ts)_

## `track-changes-tmp plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ track-changes-tmp plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ track-changes-tmp plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/link.ts)_

## `track-changes-tmp plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes-tmp plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes-tmp plugins unlink
  $ track-changes-tmp plugins remove

EXAMPLES
  $ track-changes-tmp plugins remove myplugin
```

## `track-changes-tmp plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ track-changes-tmp plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/reset.ts)_

## `track-changes-tmp plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes-tmp plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes-tmp plugins unlink
  $ track-changes-tmp plugins remove

EXAMPLES
  $ track-changes-tmp plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/uninstall.ts)_

## `track-changes-tmp plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes-tmp plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes-tmp plugins unlink
  $ track-changes-tmp plugins remove

EXAMPLES
  $ track-changes-tmp plugins unlink myplugin
```

## `track-changes-tmp plugins update`

Update installed plugins.

```
USAGE
  $ track-changes-tmp plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/update.ts)_
<!-- commandsstop -->
