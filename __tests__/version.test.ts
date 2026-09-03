import { describe, expect, it } from '@jest/globals'
import { isSemverPrerelease } from '../src/version'

describe('isSemverPrerelease', () => {
  it('detects a prerelease semver with a v prefix', () => {
    expect(isSemverPrerelease('v2.0.0-beta')).toBe(true)
  })

  it('detects a prerelease semver without a v prefix', () => {
    expect(isSemverPrerelease('2.0.0-rc.1')).toBe(true)
  })

  it('returns false for a stable release', () => {
    expect(isSemverPrerelease('v2.0.0')).toBe(false)
  })

  it('returns false for a non-semver tag', () => {
    expect(isSemverPrerelease('not-a-version')).toBe(false)
  })
})
