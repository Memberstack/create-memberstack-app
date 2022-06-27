import chalk from 'chalk';
import { getRepoInfo, existsInRepo, hasRepo, RepoInfo } from '../examples';

export async function validateRepoUrl(repoUrl: URL | undefined, example: string) {
  try {
    repoUrl = new URL(example);
  } catch (error: any) {
    if (error.code !== 'ERR_INVALID_URL') {
      console.error(error);
      process.exit(1);
    }
  }
  if (repoUrl) {
    if (repoUrl.origin !== 'https://github.com') {
      console.error(
        `Invalid URL: ${chalk.red(
          `"${example}"`
        )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`
      );
      process.exit(1);
    }
  }
  return repoUrl;
}

export async function checkIfRepoExists(repoInfo: RepoInfo | undefined, example: string) {
  if (!repoInfo) {
    console.error(
      `Found invalid GitHub URL: ${chalk.red(`"${example}"`)}. Please fix the URL and try again.`
    );
    process.exit(1);
  }

  const found = await hasRepo(repoInfo);
  if (!found) {
    console.error(
      `Could not locate the repository for ${chalk.red(
        `"${example}"`
      )}. Please check that the repository exists and try again.`
    );
    process.exit(1);
  }
}

export async function handleExampleValidation({
  example,
  examplePath,
  repoInfo,
}: {
  example: string;
  examplePath?: string;
  repoInfo: RepoInfo | undefined;
}) {
  let repoUrl: URL | undefined;

  repoUrl = await validateRepoUrl(repoUrl, example);

  if (repoUrl) {
    repoInfo = await getRepoInfo(repoUrl, examplePath);
    await checkIfRepoExists(repoInfo, example);
  } else if (example !== '__internal-testing-retry') {
    const found = await existsInRepo(example);

    if (!found) {
      console.error(
        `Could not locate an example named ${chalk.red(
          `"${example}"`
        )}. It could be due to the following:\n`,
        `1. Your spelling of example ${chalk.red(`"${example}"`)} might be incorrect.\n`,
        `2. You might not be connected to the internet or you are behind a proxy.`
      );
      process.exit(1);
    }
  }
  return repoInfo;
}
