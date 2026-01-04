track-changes
=================

Salesforce CLI plugin to track metadata changes.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@evan-hyer/track-changes.svg)](https://npmjs.org/package/@evan-hyer/track-changes)
[![Downloads/week](https://img.shields.io/npm/dw/@evan-hyer/track-changes.svg)](https://npmjs.org/package/@evan-hyer/track-changes)

## Quick Start

```bash
# Install globally
npm install -g @evan-hyer/track-changes

# See all metadata changes in your default org
track-changes

# Filter by user
track-changes --user "John Doe"

# Export to JSON (pipe to jq, scripts, etc.)
track-changes --output json

# Generate HTML report
track-changes --output html --out-file changes.html
```

**Output formats:**
| Format | Flag | Use Case |
|--------|------|----------|
| Table | `--output table` (default) | Quick terminal scan |
| JSON | `--output json` | Scripting, CI/CD |
| HTML | `--output html` | Sharing, documentation |

---

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @evan-hyer/track-changes
$ track-changes COMMAND
running command...
$ track-changes (--version)
@evan-hyer/track-changes/0.1.0 win32-x64 node-v24.12.0
$ track-changes --help [COMMAND]
USAGE
  $ track-changes COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`track-changes`](#track-changes)
* [`track-changes help [COMMAND]`](#track-changes-help-command)
* [`track-changes plugins`](#track-changes-plugins)
* [`track-changes plugins add PLUGIN`](#track-changes-plugins-add-plugin)
* [`track-changes plugins:inspect PLUGIN...`](#track-changes-pluginsinspect-plugin)
* [`track-changes plugins install PLUGIN`](#track-changes-plugins-install-plugin)
* [`track-changes plugins link PATH`](#track-changes-plugins-link-path)
* [`track-changes plugins remove [PLUGIN]`](#track-changes-plugins-remove-plugin)
* [`track-changes plugins reset`](#track-changes-plugins-reset)
* [`track-changes plugins uninstall [PLUGIN]`](#track-changes-plugins-uninstall-plugin)
* [`track-changes plugins unlink [PLUGIN]`](#track-changes-plugins-unlink-plugin)
* [`track-changes plugins update`](#track-changes-plugins-update)
* [`track-changes track`](#track-changes-track)

## `track-changes`

Track metadata changes in a Salesforce org. Shows component name, type, who modified it, and when.

```
USAGE
  $ track-changes  [-f <value>] [-o table|json|html] [-t <value>] [-u <value>]

FLAGS
  -f, --out-file=<value>    Output filename for HTML report
  -o, --output=<option>     [default: table] Output format
                            <options: table|json|html>
  -t, --target-org=<value>  The alias or username of the org to track changes in
  -u, --user=<value>        Filter changes by the user who made them

DESCRIPTION
  Track metadata changes in a Salesforce org. Shows component name, type, who modified it, and when.

ALIASES
  $ track-changes 

EXAMPLES
  $ track-changes 

  $ track-changes  --user "John Doe"

  $ track-changes  --output json

  $ track-changes  --output html --out-file report.html

  $ track-changes  -t myOrg -u "Admin User" -o json
```

## `track-changes help [COMMAND]`

Display help for track-changes.

```
USAGE
  $ track-changes help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for track-changes.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.36/src/commands/help.ts)_

## `track-changes plugins`

List installed plugins.

```
USAGE
  $ track-changes plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ track-changes plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/index.ts)_

## `track-changes plugins add PLUGIN`

Installs a plugin into track-changes.

```
USAGE
  $ track-changes plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into track-changes.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TRACK_CHANGES_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TRACK_CHANGES_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ track-changes plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ track-changes plugins add myplugin

  Install a plugin from a github url.

    $ track-changes plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ track-changes plugins add someuser/someplugin
```

## `track-changes plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ track-changes plugins inspect PLUGIN...

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
  $ track-changes plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/inspect.ts)_

## `track-changes plugins install PLUGIN`

Installs a plugin into track-changes.

```
USAGE
  $ track-changes plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into track-changes.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TRACK_CHANGES_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TRACK_CHANGES_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ track-changes plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ track-changes plugins install myplugin

  Install a plugin from a github url.

    $ track-changes plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ track-changes plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/install.ts)_

## `track-changes plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ track-changes plugins link PATH [-h] [--install] [-v]

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
  $ track-changes plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/link.ts)_

## `track-changes plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes plugins unlink
  $ track-changes plugins remove

EXAMPLES
  $ track-changes plugins remove myplugin
```

## `track-changes plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ track-changes plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/reset.ts)_

## `track-changes plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes plugins unlink
  $ track-changes plugins remove

EXAMPLES
  $ track-changes plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/uninstall.ts)_

## `track-changes plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ track-changes plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ track-changes plugins unlink
  $ track-changes plugins remove

EXAMPLES
  $ track-changes plugins unlink myplugin
```

## `track-changes plugins update`

Update installed plugins.

```
USAGE
  $ track-changes plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.54/src/commands/plugins/update.ts)_

## `track-changes track`

Track metadata changes in a Salesforce org. Shows component name, type, who modified it, and when.

```
USAGE
  $ track-changes track [-f <value>] [-o table|json|html] [-t <value>] [-u <value>]

FLAGS
  -f, --out-file=<value>    Output filename for HTML report
  -o, --output=<option>     [default: table] Output format
                            <options: table|json|html>
  -t, --target-org=<value>  The alias or username of the org to track changes in
  -u, --user=<value>        Filter changes by the user who made them

DESCRIPTION
  Track metadata changes in a Salesforce org. Shows component name, type, who modified it, and when.

ALIASES
  $ track-changes 

EXAMPLES
  $ track-changes track

  $ track-changes track --user "John Doe"

  $ track-changes track --output json

  $ track-changes track --output html --out-file report.html

  $ track-changes track -t myOrg -u "Admin User" -o json
```

_See code: [src/commands/track.ts](https://github.com/evan-hyer/track-changes/blob/v0.1.0/src/commands/track.ts)_
<!-- commandsstop -->
