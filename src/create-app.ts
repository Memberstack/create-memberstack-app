/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import cpy from 'cpy';
import fs from 'fs';
import os from 'os';
import path from 'path';
import cloneAppFromExample from './helpers/with-example/clone-app-from-example';
import { handleExampleValidation } from './helpers/with-example/validate-repo';
import { getProjectDeps, getProjectDevDeps, getProjectJson } from './helpers/get-project-config';
import { RepoInfo } from './helpers/examples';
import { makeDir } from './helpers/make-dir';
import { tryGitInit } from './helpers/git';
import { install } from './helpers/install';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { getOnline } from './helpers/is-online';
import { checkIfPathIsWriteable } from './helpers/is-writeable';
import type { PackageManager } from './helpers/get-pkg-manager';

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  packageManager,
  example,
  examplePath,
  widget,
}: {
  appPath: string;
  packageManager: PackageManager;
  example?: string;
  examplePath?: string;
  widget?: boolean;
}): Promise<void> {
  let repoInfo: RepoInfo | undefined;
  const template = widget ? 'widget' : 'default';
  const root = path.resolve(appPath);

  // checks to make sure the provided example is a valid github repo
  if (example) {
    repoInfo = await handleExampleValidation({ example, examplePath, repoInfo });
  }

  // check to see if the new app path is writeable
  await checkIfPathIsWriteable(path.dirname(root));

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === 'yarn';
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new Memberstack app in ${chalk.green(root)}.`, '\n');
  process.chdir(root);

  const packageJsonPath = path.join(root, 'package.json');
  let hasPackageJson = false;

  if (example) {
    /** If an example repo is provided, clone it. */
    await cloneAppFromExample({ repoInfo, example, root });

    // Copy our default `.gitignore` if the application did not provide one
    const ignorePath = path.join(root, '.gitignore');
    if (!fs.existsSync(ignorePath)) {
      fs.copyFileSync(path.join(__dirname, 'templates', template, 'gitignore'), ignorePath);
    }

    hasPackageJson = fs.existsSync(packageJsonPath);
    if (hasPackageJson) {
      // Change name in package.json too appName
      const packageJson = require(packageJsonPath);
      fs.writeFileSync(packageJsonPath, JSON.stringify({ name: appName, ...packageJson }, null, 2));

      console.log('Installing packages. This might take a couple of minutes.');
      console.log();

      await install(root, null, { packageManager, isOnline });
      console.log();
    }
  } else {
    /**
     * Otherwise, if an example repository is not provided for cloning, proceed
     * by installing from a template.
     */
    console.log(chalk.bold(`Using ${packageManager}.`));

    /** Create a package.json for the new project */
    const packageJson = getProjectJson(template, appName);
    /** Write it to disk. */
    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );

    /** These flags will be passed to `install()`. */
    const installFlags = { packageManager, isOnline };
    const dependencies = getProjectDeps(template);
    const devDependencies = getProjectDevDeps(template);

    async function handleInstall({
      dependencies,
      label,
      installFlags,
    }: {
      dependencies?: string[];
      label?: string;
      installFlags: any;
    }) {
      if (dependencies?.length) {
        console.log();
        console.log(`Installing ${label}:`);
        for (const dependency of dependencies) {
          console.log(`- ${chalk.cyan(dependency)}`);
        }
        console.log();
      }

      await install(root, dependencies, installFlags);
    }

    await handleInstall({ dependencies, label: 'dependencies', installFlags });
    const devInstallFlags = { devDependencies: true, ...installFlags };
    await handleInstall({
      dependencies: devDependencies,
      label: 'devDependencies',
      installFlags: devInstallFlags,
    });

    console.log();
    /**
     * Copy the template files to the target directory.
     */
    await cpy(['**', '!package.json', '!.env', '!node_modules', '!.next', '!yarn.lock'], root, {
      parents: true,
      cwd: path.join(__dirname, 'templates', template),
      rename: name => {
        switch (name) {
          case 'gitignore':
          case 'env': {
            return '.'.concat(name);
          }
          case 'README-template.md': {
            return 'README.md';
          }
          default: {
            return name;
          }
        }
      },
    });
  }

  if (tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}dev`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}build`));
  console.log('    Builds the app for production.');
  console.log();
  console.log(chalk.cyan(`  ${packageManager} start`));
  console.log('    Runs the built app in production mode.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${packageManager} ${useYarn ? '' : 'run '}dev`)}`);
  console.log();
}
