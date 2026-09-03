import { describe, expect, it } from '@jest/globals'
import { assetName, downloadUrl } from '../src/download'
import type { PlatformInfo } from '../src/platform'

describe('assetName', () => {
  it('builds the linux amd64 asset name', () => {
    const platform: PlatformInfo = {
      os: 'linux',
      arch: 'amd64',
      ext: 'tar.gz',
      binaryName: 'xget'
    }
    expect(assetName('v2.0.0', platform)).toBe('xget_2.0.0_linux_amd64.tar.gz')
  })

  it('builds the windows arm64 asset name', () => {
    const platform: PlatformInfo = {
      os: 'windows',
      arch: 'arm64',
      ext: 'zip',
      binaryName: 'xget.exe'
    }
    expect(assetName('v2.0.0-beta', platform)).toBe(
      'xget_2.0.0-beta_windows_arm64.zip'
    )
  })
})

describe('downloadUrl', () => {
  it('builds the release asset download url', () => {
    const platform: PlatformInfo = {
      os: 'darwin',
      arch: 'arm64',
      ext: 'tar.gz',
      binaryName: 'xget'
    }
    const asset = assetName('v1.0.0', platform)
    expect(downloadUrl('v1.0.0', asset)).toBe(
      'https://github.com/camalot/xget/releases/download/v1.0.0/xget_1.0.0_darwin_arm64.tar.gz'
    )
  })
})
