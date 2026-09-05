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
        skipVerify: false,
        fileFilter: '',
        allFiles: false
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
        skipVerify: false,
        fileFilter: '',
        allFiles: false
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
        skipVerify: false,
        fileFilter: '',
        allFiles: false
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
        skipVerify: false,
        fileFilter: '',
        allFiles: false
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
        skipVerify: true,
        fileFilter: '',
        allFiles: false
      })
    ).toEqual(['fake/package', '--to', '/usr/local/bin', '--non-interactive'])
  })

  it('includes --file when specified', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: false,
        fileFilter: 'some-file.txt',
        allFiles: false
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--non-interactive',
      '--file',
      'some-file.txt',
      '--verify'
    ])
  })
  
  it('includes --all when allFiles is true', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: false,
        fileFilter: '',
        allFiles: true
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--non-interactive',
      '--all',
      '--verify'
    ])
  })
})
