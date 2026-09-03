# xget-action

A GitHub Action that installs [xget](https://github.com/camalot/xget) (caching
the binary between runs) and uses it to download and install a pre-built
binary from a GitHub release.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/camalot/xget-action/blob/main/LICENSE)

## What it does

1. Resolves the requested `xget` version (or the latest release) and
   downloads the matching binary for the runner's OS/architecture.
2. Caches the downloaded `xget` binary using `actions/cache`, so subsequent
   runs (and jobs) restore it instead of re-downloading.
3. Adds `xget` to `PATH` and runs it with the given `package` and options to
   install the target binary to `/usr/local/bin`.

## Usage

```yaml
- name: Install a tool with xget
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf
```

### Pin a specific xget version

```yaml
- name: Install a tool with xget
  uses: camalot/xget-action@v1
  with:
    xget-version: v2.0.0
    package: BurntSushi/ripgrep
```

### Install a specific tag / prerelease

```yaml
- name: Install a tagged release
  uses: camalot/xget-action@v1
  with:
    package: zyedidia/micro
    tag: nightly
```

```yaml
- name: Install including prereleases
  uses: camalot/xget-action@v1
  with:
    package: ogham/exa
    prerelease: true
```

### Filter or ignore assets

`asset-filters` and `ignore` accept one matcher per line (they map directly to
xget's `--asset` and `--ignore` flags, so the same matcher syntax applies,
including `~`/`re:` regex prefixes and `^`/`not:` negation prefixes):

```yaml
- name: Install a musl build
  uses: camalot/xget-action@v1
  with:
    package: ogham/exa
    asset-filters: |
      ^musl

- name: Install while ignoring checksum/sbom assets
  uses: camalot/xget-action@v1
  with:
    package: tacocontent/ironstate
    asset-filters: |
      ~\.zip$
    ignore: |
      ~\.zip\.sbom\.json$
```

### Skip verification

By default, downloaded assets are verified. Set `skip-verify: true` to
disable verification:

```yaml
- name: Install without verification
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf
    skip-verify: true
```

### Use a custom GitHub token

By default the workflow's `GITHUB_TOKEN` is used to authenticate requests to
the GitHub API (useful for avoiding rate limits or accessing private
repositories). Supply a different token if needed:

```yaml
- name: Install with a custom token
  uses: camalot/xget-action@v1
  with:
    package: camalot/xget
    token: ${{ secrets.MY_PAT }}
```

### Use the installed version output

```yaml
- name: Install a tool with xget
  id: xget
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf

- name: Print the installed xget version
  run: echo "Installed xget ${{ steps.xget.outputs.xget-version }}"
```

## Inputs

| Name            | Required | Default            | Description                                                                                                    |
| --------------- | -------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `xget-version`  | no       | `latest`             | Version of `xget` to install, e.g. `v2.0.0`.                                                                       |
| `token`         | no       | `${{ github.token }}` | GitHub token used for authentication when resolving/downloading releases.                                          |
| `package`       | yes      |                      | Package to install with `xget`, e.g. `owner/repo`.                                                                 |
| `tag`           | no       | `` (latest)          | Tagged release of the package to install.                                                                          |
| `prerelease`    | no       | `false`              | Whether to include prerelease versions of the package.                                                             |
| `asset-filters` | no       | `` (none)            | Filters to apply to package assets; one matcher per line, may be specified multiple times.                         |
| `ignore`        | no       | `` (none)            | Patterns of assets to ignore; one matcher per line, may be specified multiple times.                               |
| `skip-verify`   | no       | `false`              | Whether to skip verification of the downloaded package. Verification is performed by default.                      |

## Outputs

| Name           | Description                            |
| -------------- | --------------------------------------- |
| `xget-version` | The version of `xget` that was installed. |

## License

[MIT](LICENSE)
