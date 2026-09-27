import { mkdir, writeFile, access, rename, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { randomUUID } from 'node:crypto'

export async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true })
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export interface WrittenFile {
  fullPath: string
  tempPath?: string
}

export async function writeGeneratedFile(
  basePath: string,
  filePath: string,
  content: string,
): Promise<string> {
  const fullPath = join(basePath, filePath)
  await ensureDir(dirname(fullPath))
  await writeFile(fullPath, content, 'utf-8')
  return fullPath
}

export async function writeGeneratedFileAtomic(
  basePath: string,
  filePath: string,
  content: string,
): Promise<WrittenFile> {
  const fullPath = join(basePath, filePath)
  await ensureDir(dirname(fullPath))

  const tmpName = `.tmp-${randomUUID().slice(0, 8)}-${filePath.replace(/[/\\]/g, '-')}`
  const tempPath = join(basePath, tmpName)
  await writeFile(tempPath, content, 'utf-8')
  await rename(tempPath, fullPath)

  return { fullPath, tempPath }
}

export async function removeFile(filePath: string): Promise<void> {
  try {
    await unlink(filePath)
  } catch {
    // File may not exist — ignore
  }
}

export interface WriteBatch {
  basePath: string
  files: Array<{ path: string; content: string }>
  written: WrittenFile[]
}

export async function writeBatchAtomic(batch: WriteBatch): Promise<WrittenFile[]> {
  const written: WrittenFile[] = []
  for (const file of batch.files) {
    const result = await writeGeneratedFileAtomic(batch.basePath, file.path, file.content)
    written.push(result)
  }
  return written
}

export async function rollbackWrittenFiles(written: WrittenFile[]): Promise<void> {
  for (const w of written) {
    await removeFile(w.fullPath)
  }
}
