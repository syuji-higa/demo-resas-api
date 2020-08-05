export function fetcher<T>(url: string): Promise<T> {
  return fetch(url, {
    headers: {
      // NOTE:
      // 本来なら環境設定ファイルとかに入れるべきかと思うけど
      // 取得しづらかったのでそのまま追加
      'X-API-KEY': 'gklUh923FqQSgrTDgD5RHhejM1cG26eZ90XylOiH',
    },
  }).then(async (r) => r.json())
}
