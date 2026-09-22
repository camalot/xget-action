export interface XgetCliInputs {
  package: string
  tag: string
  prerelease: boolean
  assetFilters: string[]
  ignore: string[]
  skipVerify: boolean
  to?: string
  args: string[]
  fileFilter: string
  allFiles: boolean
  provider: string
}

/** Builds the argument list for `xget <target> [flags]` from the action inputs. */
export function buildXgetArgs(inputs: XgetCliInputs): string[] {
  const args: string[] = [inputs.package]

  // if args is used, no other flags are added automatically
  if (inputs.args.length > 0) {
    args.push(...inputs.args)
    return args
  }

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
  // if inputs.to is set, use that, otherwise, use /usr/local/bin
  if (inputs.to) {
    args.push('--to', inputs.to)
  } else {
    args.push('--to', '/usr/local/bin')
  }

  if (inputs.fileFilter) {
    args.push('--file', inputs.fileFilter)
  }
  if (inputs.allFiles) {
    args.push('--all')
  }
  if (inputs.provider) {
    args.push('--provider', inputs.provider)
  }

  if (!inputs.skipVerify) {
    args.push('--verify')
  }

  args.push('--non-interactive')
  args.push('--untracked')

  return args
}
