import * as core from '@actions/core'

export interface ActionInputs {
  xgetVersion: string
  token: string
  package: string
  tag: string
  prerelease: boolean
  assetFilters: string[]
  ignore: string[]
  skipVerify: boolean
}

export function getInputs(): ActionInputs {
  return {
    xgetVersion: core.getInput('xget-version') || 'latest',
    token: core.getInput('token'),
    package: core.getInput('package'),
    tag: core.getInput('tag'),
    prerelease: core.getBooleanInput('prerelease'),
    assetFilters: core.getMultilineInput('asset-filters'),
    ignore: core.getMultilineInput('ignore'),
    skipVerify: core.getBooleanInput('skip-verify')
  }
}
