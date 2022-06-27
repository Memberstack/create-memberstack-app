import fs from 'fs';

export async function isWriteable(directory: string): Promise<boolean> {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export async function checkIfPathIsWriteable(directory: string) {
  if (!(await isWriteable(directory))) {
    let msg = `The application path is not writable, please check folder permissions and try again.
  It is likely you do not have write permissions for this folder.`;
    console.error(msg);
    process.exit(1);
  }
}
