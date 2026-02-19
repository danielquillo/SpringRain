export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path) return path;
  if (path.startsWith("http")) return path; // external URLs untouched
  if (!path.startsWith("/")) path = `/${path}`;
  return `${basePath}${path}`;
}
