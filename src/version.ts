import * as core from '@actions/core'
import { HttpClient } from '@actions/http-client'
import semver from 'semver'
import { REPO_NAME, REPO_OWNER } from './constants'

interface GithubRelease {
  tag_name: string
  prerelease: boolean
}

export interface ResolvedVersion {
  tag: string
  isPrerelease: boolean
}

function authHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json'
  }
  if (token) {
    headers.authorization = `token ${token}`
  }
  return headers
}

/** True when `version` parses as a semver with a prerelease component (e.g. v2.0.0-beta). */
export function isSemverPrerelease(version: string): boolean {
  const cleaned = version.startsWith('v') ? version.slice(1) : version
  const parsed = semver.parse(cleaned)
  return parsed !== null && parsed.prerelease.length > 0
}

/**
 * Resolves the xget-version input to a concrete release tag. "latest" is resolved
 * via the GitHub API (which only returns non-prerelease releases); any other value
 * is treated as an explicit tag and downloaded directly, which works for prereleases too.
 */
export async function resolveXgetVersion(
  requested: string,
  token?: string
): Promise<ResolvedVersion> {
  if (!requested || requested === 'latest') {
    const http = new HttpClient('xget-action')
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`
    const res = await http.getJson<GithubRelease>(url, authHeaders(token))
    if (!res.result?.tag_name) {
      throw new Error(`could not determine the latest ${REPO_NAME} release`)
    }
    return { tag: res.result.tag_name, isPrerelease: res.result.prerelease }
  }

  const tag = requested.startsWith('v') ? requested : `v${requested}`
  const isPrerelease = isSemverPrerelease(tag)
  if (isPrerelease) {
    core.info(`xget-version "${tag}" is a prerelease version`)
  }
  return { tag, isPrerelease }
}
