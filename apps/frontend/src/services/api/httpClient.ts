export const URL = "http://localhost:3000";

type RequestArgs = {
  path: string;
  options?: RequestInit;
};
export function request({ path, options }: RequestArgs) {
  const apiUrl = URL;

  return fetch(`${apiUrl}${path}`, {
    ...options,
  });
}
