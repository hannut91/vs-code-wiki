import { exec } from 'child_process';
import * as util from 'util';

export const findText = async (path: string, text: string) => {
  const result = await util.promisify(exec)(
    `(cd ${path};ag -i ${text})`);

  if (result.stderr) {
    throw new Error(result.stderr);
  }

  return result.stdout.split('\n');
};
