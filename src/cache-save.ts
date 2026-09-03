import * as core from '@actions/core'
import * as cache from './cache'
import * as state from './state-helper'

async function run(): Promise<void> {
  try {
    if (state.isCacheHit()) {
      core.info('xget was restored from cache; skipping cache save')
      return
    }

    const cacheKey = state.getCacheKey()
    const cachePath = state.getCachePath()
    if (!cacheKey || !cachePath) {
      core.info('no cache entry to save')
      return
    }

    core.info(`Saving xget to cache with key: ${cacheKey}`)
    await cache.save([cachePath], cacheKey)
  } catch (error) {
    core.warning((error as Error).message)
  }
}

run()
