import { backup } from './backup.service';
import { promises } from 'fs';
import { join } from 'path';

const BASE_PATH = __dirname + '/../../fixtures/wiki';
const FILE_NAME = 'MariaDB.md';

describe('backup', () => {
  afterEach(async () => {
    const backupPath = join(BASE_PATH, 'backup');
    const files = await promises.readdir(backupPath);

    await Promise.all(files.map(i => promises.unlink(join(backupPath, i))));
    await promises.rmdir(backupPath);
  });

  it('creates backup file', async () => {
    const newfilePath = await backup(BASE_PATH, FILE_NAME);
    
    const content = await promises.readFile(`${BASE_PATH}/${FILE_NAME}`);
    const backupContent = await promises.readFile(newfilePath);
    
    expect(content).toEqual(backupContent);
  });
});
