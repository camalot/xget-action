import { describe, expect, it } from '@jest/globals'
import { buildXgetArgs } from '../src/xget-cli'

describe('buildXgetArgs', () => {
  it('builds the minimal args with just the package', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: false
      })
    ).toEqual(['fake/package', '--to', '/usr/local/bin', '--non-interactive', '--verify'])
  })

  it('includes tag, prerelease, asset filters, and ignore', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: 'v1.2.3',
        prerelease: true,
        assetFilters: ['~\\.tar\\.gz'],
        ignore: ['~\\.sbom\\.json$'],
        skipVerify: false
      })
    ).toEqual([
      'fake/package',
      '--tag',
      'v1.2.3',
      '--pre-release',
      '--asset',
      '~\\.tar\\.gz',
      '--ignore',
      '~\\.sbom\\.json$',
      '--to',
      '/usr/local/bin',
      '--non-interactive',
      '--verify'
    ])
  })

  it('repeats --asset and --ignore for each entry', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: ['~\\.tar\\.gz', '~\\.zip$'],
        ignore: ['~\\.sbom\\.json$', '~\\.sig$'],
        skipVerify: false
      })
    ).toEqual([
      'fake/package',
      '--asset',
      '~\\.tar\\.gz',
      '--asset',
      '~\\.zip$',
      '--ignore',
      '~\\.sbom\\.json$',
      '--ignore',
      '~\\.sig$',
      '--to',
      '/usr/local/bin',
      '--non-interactive',
      '--verify'
    ])
  })

  it('omits --tag when tag is "latest"', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: 'latest',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: false
      })
    ).toEqual(['fake/package', '--to', '/usr/local/bin', '--non-interactive', '--verify'])
  })

  it('omits --verify when skipVerify is true', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: true
      })
    ).toEqual(['fake/package', '--to', '/usr/local/bin', '--non-interactive'])
  })
})
