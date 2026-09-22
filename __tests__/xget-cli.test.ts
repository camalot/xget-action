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
        allFiles: false,
        provider: '',
        to: '',
        args: []
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--verify',
      '--non-interactive',
      '--untracked',
    ])
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
        allFiles: false,
        to: '',
        provider: '',
        args: []
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
      '--verify',
      '--non-interactive',
      '--untracked',
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
        allFiles: false,
        to: '',
        provider: '',
        args: []
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
      '--verify',
      '--non-interactive',
      '--untracked',
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
        allFiles: false,
        to: '',
        provider: '',
        args: []
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--verify',
      '--non-interactive',
      '--untracked',
    ])
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
        allFiles: false,
        to: '',
        provider: '',
        args: []
      })
    ).toEqual(['fake/package', '--to', '/usr/local/bin', '--non-interactive', '--untracked'])
  })

  it('uses explicit args without adding automatic input flags', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: 'v1.2.3',
        prerelease: true,
        assetFilters: ['~\\.tar\\.gz'],
        ignore: ['~\\.sbom\\.json$'],
        skipVerify: false,
        fileFilter: 'automatic-file-filter',
        allFiles: true,
        to: '/custom/bin',
        provider: '',
        args: ['--tag', 'v9.9.9', '--to', '/explicit/bin']
      })
    ).toEqual(['fake/package', '--tag', 'v9.9.9', '--to', '/explicit/bin'])
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
        allFiles: false,
        provider: '',
        args: []
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--file',
      'some-file.txt',
      '--verify',
      '--non-interactive',
      '--untracked',
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
        allFiles: true,
        provider: '',
        args: []
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--all',
      '--verify',
      '--non-interactive',
      '--untracked',
    ])
  })

  it('includes --provider when specified', () => {
    expect(
      buildXgetArgs({
        package: 'fake/package',
        tag: '',
        prerelease: false,
        assetFilters: [],
        ignore: [],
        skipVerify: false,
        fileFilter: '',
        allFiles: false,
        provider: 'custom-provider',
        args: []
      })
    ).toEqual([
      'fake/package',
      '--to',
      '/usr/local/bin',
      '--provider',
      'custom-provider',
      '--verify',
      '--non-interactive',
      '--untracked',
    ])
  })
})
