import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import { REPO_NAME, REPO_OWNER, TOOL_NAME } from './constants'
import type { PlatformInfo } from './platform'

/** Builds the release asset filename for the given tag/platform, matching install/xget.sh. */
export function assetName(tag: string, platform: PlatformInfo): string {
  const versionNum = tag.startsWith('v') ? tag.slice(1) : tag
  return `${TOOL_NAME}_${versionNum}_${platform.os}_${platform.arch}.${platform.ext}`
}

export function downloadUrl(tag: string, asset: string): string {
  return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${tag}/${asset}`
}

/** Downloads and extracts the xget release archive, returning the extracted directory. */
export async function downloadAndExtract(
  tag: string,
  platform: PlatformInfo
): Promise<string> {
  const asset = assetName(tag, platform)
  const url = downloadUrl(tag, asset)
  core.info(`Downloading ${asset} (${tag}) from ${url}`)

  const downloadPath = await tc.downloadTool(url)

  const extractedDir =
    platform.ext === 'zip'
      ? await tc.extractZip(downloadPath)
      : await tc.extractTar(downloadPath)

  return extractedDir
}
