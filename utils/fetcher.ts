export function fetcher<T>(url: string): Promise<T> {
  return fetch(url, {
    headers: {
      'X-API-KEY': 'gklUh923FqQSgrTDgD5RHhejM1cG26eZ90XylOiH',
    },
  }).then(async (r) => r.json())
}
