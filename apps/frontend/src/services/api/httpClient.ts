export const URL = import.meta.env.VITE_API_URL;

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
