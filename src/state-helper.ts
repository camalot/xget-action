import * as core from '@actions/core'
import { STATE_CACHE_HIT, STATE_CACHE_KEY, STATE_CACHE_PATH } from './constants'

export function setCacheHit(hit: boolean): void {
  core.saveState(STATE_CACHE_HIT, hit ? 'true' : 'false')
}

export function isCacheHit(): boolean {
  return core.getState(STATE_CACHE_HIT) === 'true'
}

export function setCacheKey(key: string): void {
  core.saveState(STATE_CACHE_KEY, key)
}

export function getCacheKey(): string {
  return core.getState(STATE_CACHE_KEY)
}

export function setCachePath(path: string): void {
  core.saveState(STATE_CACHE_PATH, path)
}

export function getCachePath(): string {
  return core.getState(STATE_CACHE_PATH)
}
