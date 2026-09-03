import os from 'os'

export type ArchiveExt = 'tar.gz' | 'zip'

export interface PlatformInfo {
  os: string
  arch: string
  ext: ArchiveExt
  binaryName: string
}

/** Maps the runner's OS/arch to the naming convention used by xget release assets. */
export function getPlatformInfo(): PlatformInfo {
  const platform = os.platform()
  const arch = os.arch()

  let xgetOs: string
  let ext: ArchiveExt
  let binaryName = 'xget'

  switch (platform) {
    case 'linux':
      xgetOs = 'linux'
      ext = 'tar.gz'
      break
    case 'darwin':
      xgetOs = 'darwin'
      ext = 'tar.gz'
      break
    case 'win32':
      xgetOs = 'windows'
      ext = 'zip'
      binaryName = 'xget.exe'
      break
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }

  let xgetArch: string
  switch (arch) {
    case 'x64':
      xgetArch = 'amd64'
      break
    case 'arm64':
      xgetArch = 'arm64'
      break
    default:
      throw new Error(`Unsupported architecture: ${arch}`)
  }

  return { os: xgetOs, arch: xgetArch, ext, binaryName }
}
