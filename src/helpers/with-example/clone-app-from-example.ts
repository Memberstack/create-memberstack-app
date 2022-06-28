import retry from 'async-retry';
import chalk from 'chalk';
import { downloadAndExtractExample, downloadAndExtractRepo, RepoInfo } from '../examples';

export class DownloadError extends Error {}

function isErrorLike(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    typeof (err as { message?: unknown }).message === 'string'
  );
}

export default async function cloneAppFromExample({
  repoInfo,
  example,
  root,
}: {
  repoInfo: RepoInfo | undefined;
  example: string;
  root: string;
}) {
  try {
    if (repoInfo) {
      const repoInfo2 = repoInfo;
      console.log(`Downloading files from repo ${chalk.cyan(example)}. This might take a moment.`);
      console.log();
      await retry(() => downloadAndExtractRepo(root, repoInfo2), {
        retries: 3,
      } as object);
    } else {
      console.log(
        `Downloading files for example ${chalk.cyan(example)}. This might take a moment.`
      );
      console.log();
      await retry(() => downloadAndExtractExample(root, example), {
        retries: 3,
      } as object);
    }
  } catch (reason) {
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + '');
  }
}
