export function getFriendlyFileSize(fileSize: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    // eslint-disable-next-line no-param-reassign
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
}
