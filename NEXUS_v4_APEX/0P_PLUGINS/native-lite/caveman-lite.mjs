/** Native-lite encoding placeholder when `caveman` npm CLI is unavailable. */

export async function cavemanCompress(text) {
  return text.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
