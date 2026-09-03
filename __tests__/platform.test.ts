import { describe, expect, it } from '@jest/globals'
import { getPlatformInfo } from '../src/platform'

describe('getPlatformInfo', () => {
  it('returns platform info for the current runner', () => {
    const info = getPlatformInfo()
    expect(['linux', 'darwin', 'windows']).toContain(info.os)
    expect(['amd64', 'arm64']).toContain(info.arch)
    expect(['tar.gz', 'zip']).toContain(info.ext)
  })
})
