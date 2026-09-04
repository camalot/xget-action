import * as cacheLib from '@actions/cache'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'
import fs from 'fs'
import path from 'path'
import * as cache from './cache'
import { TOOL_NAME } from './constants'
import { getInputs } from './context'
import { downloadAndExtract } from './download'
import { getPlatformInfo } from './platform'
import * as state from './state-helper'
import { resolveXgetVersion } from './version'
import { buildXgetArgs } from './xget-cli'

/** Stable directory a cache entry restores/saves to, independent of the temp dir used per-run. */
function toolInstallDir(tag: string, archKey: string): string {
  const base = process.env.RUNNER_TOOL_CACHE || process.env.RUNNER_TEMP || '.'
  return path.join(base, 'xget-action', tag, archKey)
}

async function installXget(
  xgetVersion: string,
  token: string
): Promise<{ toolPath: string; version: string }> {
  const platform = getPlatformInfo()
  const { tag } = await resolveXgetVersion(xgetVersion, token)
  const archKey = `${platform.os}-${platform.arch}`

  const existing = tc.find(TOOL_NAME, tag, platform.arch)
  if (existing) {
    core.info(`Found cached ${TOOL_NAME} ${tag} at ${existing}`)
    state.setCacheHit(true)
    return { toolPath: existing, version: tag }
  }

  const installDir = toolInstallDir(tag, archKey)
  const binaryPath = path.join(installDir, platform.binaryName)
  const cacheKey = `xget-${archKey}-${tag}`

  if (cacheLib.isFeatureAvailable()) {
    const restoredKey = await cache.restore([installDir], cacheKey)
    if (restoredKey && fs.existsSync(binaryPath)) {
      core.info(`Restored ${TOOL_NAME} ${tag} from cache (key: ${restoredKey})`)
      const cachedDir = await tc.cacheDir(
        installDir,
        TOOL_NAME,
        tag,
        platform.arch
      )
      state.setCacheHit(true)
      return { toolPath: cachedDir, version: tag }
    }
  }

  const extractedDir = await downloadAndExtract(tag, platform)
  fs.mkdirSync(installDir, { recursive: true })
  fs.copyFileSync(path.join(extractedDir, platform.binaryName), binaryPath)
  if (platform.os !== 'windows') {
    fs.chmodSync(binaryPath, 0o755)
  }

  const cachedDir = await tc.cacheDir(installDir, TOOL_NAME, tag, platform.arch)

  if (cacheLib.isFeatureAvailable()) {
    state.setCacheHit(false)
    state.setCacheKey(cacheKey)
    state.setCachePath(installDir)
  }

  return { toolPath: cachedDir, version: tag }
}

async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    const { toolPath, version } = await installXget(
      inputs.xgetVersion,
      inputs.token
    )
    core.addPath(toolPath)
    core.setOutput('xget-version', version)
    core.info(`Using xget ${version}`)

    if (!inputs.package) {
      core.info('No package input provided; xget was installed but will not be run.')
      return
    }

    const args = buildXgetArgs(inputs)
    const env: { [key: string]: string } = {}
    for (const [key, value] of Object.entries(process.env)) {
      if (value !== undefined) {
        env[key] = value
      }
    }
    if (inputs.token) {
      env.GITHUB_TOKEN = inputs.token
    }

    await exec.exec('xget', args, { env })
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
