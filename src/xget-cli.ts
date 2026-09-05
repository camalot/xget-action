export interface XgetCliInputs {
  package: string
  tag: string
  prerelease: boolean
  assetFilters: string[]
  ignore: string[]
  skipVerify: boolean
  fileFilter: string
  allFiles: boolean
}

/** Builds the argument list for `xget <target> [flags]` from the action inputs. */
export function buildXgetArgs(inputs: XgetCliInputs): string[] {
  const args: string[] = [inputs.package]

  if (inputs.tag && inputs.tag !== 'latest') {
    args.push('--tag', inputs.tag)
  }
  if (inputs.prerelease) {
    args.push('--pre-release')
  }
  for (const filter of inputs.assetFilters) {
    args.push('--asset', filter)
  }
  for (const pattern of inputs.ignore) {
    args.push('--ignore', pattern)
  }

  args.push('--to', '/usr/local/bin')
  args.push('--non-interactive')
  if (inputs.fileFilter) {
    args.push('--file', inputs.fileFilter)
  }
  if (inputs.allFiles) {
    args.push('--all')
  }

  if (!inputs.skipVerify) {
    args.push('--verify')
  }

  return args
}
