import * as cache from '@actions/cache'
import * as core from '@actions/core'

/** Restores a previously saved cache entry; returns the matched key, or undefined on a miss. */
export async function restore(
  paths: string[],
  key: string
): Promise<string | undefined> {
  try {
    return await cache.restoreCache(paths, key)
  } catch (error) {
    core.warning(`failed to restore cache: ${(error as Error).message}`)
    return undefined
  }
}

/** Saves a cache entry, tolerating cases where the key already exists. */
export async function save(paths: string[], key: string): Promise<void> {
  try {
    await cache.saveCache(paths, key)
  } catch (error) {
    if (error instanceof cache.ReserveCacheError) {
      core.info(`cache key already exists, skipping save: ${error.message}`)
      return
    }
    core.warning(`failed to save cache: ${(error as Error).message}`)
  }
}
