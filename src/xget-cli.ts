export interface XgetCliInputs {
  package: string
  tag: string
  prerelease: boolean
  assetFilters: string[]
  ignore: string[]
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

  return args
}
