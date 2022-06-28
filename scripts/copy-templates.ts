import cpy from 'cpy';
import fs from 'fs';
import path from 'path';
import task from 'tasuku';

const root: string = process.env.PWD || '';
const templatesDir = path.join(root, 'templates');
const destination = path.join(root, 'dist', 'templates');

const templates = [
  {
    name: 'default',
    copyPattern: ['**', '!package.json', '!.env', '!node_modules', '!.next', '!yarn.lock', '!.swc'],
    destination: path.join(destination, 'default'),
    cwd: path.join(root, 'templates', 'default'),
  },
  {
    name: 'widget',
    copyPattern: ['**', '!package.json', '!.env', '!node_modules', '!yarn.lock'],
    destination: path.join(destination, 'widget'),
    cwd: path.join(root, 'templates', 'widget'),
  },
];

async function copyTemplates(): Promise<void> {
  const api = await task.group(
    task => {
      return templates.map(template => {
        return task(`Copying ${template.name}... `, async ({ setTitle }) => {
          await cpy(template.copyPattern, template.destination, {
            parents: true,
            cwd: template.cwd,
          });

          setTitle(`Copied ${template.name} template to dist`);
        });
      });
    },
    { concurrency: 2 }
  );
  api.clear(); // Clear output
}

if (fs.existsSync(templatesDir)) {
  task('Copying templates to dist folder...', async ({ setTitle }) => {
    await copyTemplates();
    setTitle('Copied templates to dist folder');
  });
}
