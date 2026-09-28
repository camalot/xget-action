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
3. If a `package` input is given, runs `xget` with it and the other options to
  install the target binary to `/usr/local/bin`. If `package` is omitted,
  `xget` is installed and left on `PATH` without being run.

## Usage

```yaml
- name: Install a tool with xget
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf
```

### Setup only (no package)

Omit `package` to only install `xget` and add it to `PATH`. This is useful
when you want to run `xget` yourself in later steps, e.g. to install multiple
packages:

```yaml
- name: Setup xget
  uses: camalot/xget-action@v1

- name: Install multiple tools
  shell: bash
  run: |
    xget some-org/some-app --asset '~\.tar\.gz$'
    xget some-org2/another-app --asset '~\.tar\.gz$'
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

### Select files to extract

```yaml
- name: Extract a specific file
  uses: camalot/xget-action@v1
  with:
    package: neovim/neovim
    file-filter: 'nvim'

- name: Extract all files
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf
    all-files: true
```

### Rename the installed binary

```yaml
- name: Install and rename
  uses: camalot/xget-action@v1
  with:
    package: BurntSushi/ripgrep
    binary: rg2
```

### Use a different provider

```yaml
- name: Install from GitLab
  uses: camalot/xget-action@v1
  with:
    package: gitlab-org/cli
    provider: gitlab
```

### Pass raw arguments

`args` takes one argument per line and replaces all automatically added flags,
so include anything you still need (e.g. `--non-interactive`):

```yaml
- name: Install with custom arguments
  uses: camalot/xget-action@v1
  with:
    package: junegunn/fzf
    args: |
      --to
      ./bin
      --non-interactive
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

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `xget-version` | no | `latest` | Version of `xget` to install, e.g. `v2.0.0`. |
| `token` | no | `${{ github.token }}` | GitHub token used for authentication when resolving/downloading releases. |
| `package` | no | `` (none) | Package to install with `xget`, e.g. `owner/repo`. If omitted, only setup (install + `PATH`) is performed. |
| `tag` | no | `` (latest) | Tagged release of the package to install. Maps to `--tag`. |
| `binary` | no | `` (none) | Rename a single extracted file to this name, keeping its extension. Ignored when multiple files are extracted. Maps to `--binary`. |
| `prerelease` | no | `false` | Whether to include prerelease versions of the package. Maps to `--pre-release`. |
| `asset-filters` | no | `` (none) | Filters to apply to package assets; one matcher per line. Each line maps to `--asset`. |
| `file-filter` | no | `` (none) | Glob selecting which files to extract from the archive. Maps to `--file`. |
| `all-files` | no | `false` | Extract all candidate files from the archive. Maps to `--all`. |
| `ignore` | no | `` (none) | Patterns of assets to ignore; one matcher per line. Each line maps to `--ignore`. |
| `skip-verify` | no | `false` | Whether to skip verification of the downloaded package. Verification (`--verify`) is performed by default. |
| `provider` | no | `` (GitHub) | Release source profile to use: `github`, `gitlab`, or a named profile from the xget config. Maps to `--provider`. |
| `args` | no | `` (none) | Arguments to pass to `xget` after the package, one per line. When set, **no other flags are added automatically**. |

Unless `args` is set, the action always runs `xget` with `--to /usr/local/bin`,
`--non-interactive`, and `--untracked`.

## Outputs

| Name | Description |
| --- | --- |
| `xget-version` | The version of `xget` that was installed. |

## License

[MIT](LICENSE)
