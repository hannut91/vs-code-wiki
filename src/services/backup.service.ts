import { promises } from 'fs';
import { join } from 'path';
import * as moment from 'moment';

export const backup = async (
  basepath: string,
  filename: string,
): Promise<string> => {
  const backupDir = join(basepath, 'backup');
  try {
    await promises.mkdir(backupDir);
  } catch (err) {
    // Do nothing
  }

  const originFile = join(basepath, filename);
  const date = moment().format('YYYY-MM-DD_HH-mm-ss_');
  const backupFile = join(backupDir, date + filename);
  await promises.copyFile(originFile, backupFile);

  return backupFile;
};
