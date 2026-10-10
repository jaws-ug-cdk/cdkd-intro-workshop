+++
title = "API を呼んでみる"
weight = 300
+++

デプロイした API が動いているか、実際に呼んで確かめます。3 つのターミナルで、それぞれ自分のスタックの API を呼びます。

## 手順

### 1. API の URL を変数に入れる

各ターミナルで、デプロイの出力に表示された `ApiUrl` の URL をコピーし、次のように `API_URL` という変数に入れます。

```bash
API_URL=https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com
```

`https://xxxxxxxxxx...` の部分は、自分の出力の URL に置き換えてください。3 つのスタックは URL が違うので、ターミナルごとに、そのターミナルの出力の URL を使います。

{{% notice info %}}
**変数とは**: `API_URL=...` と入力すると、そのターミナルの中で `$API_URL` と書いた部分が URL に置き換わるようになります。長い URL を何度も貼り付けなくて済みます。ターミナルを閉じると消えるので、閉じてしまった場合はもう一度設定してください。
{{% /notice %}}

### 2. アイテムを登録する

次のコマンドで、`POST /items` にアイテムを登録します。

```bash
curl -X POST "$API_URL/items" -H 'Content-Type: application/json' -d '{"name": "cdkd"}'
```

{{% notice info %}}
**curl とは**: ターミナルから HTTP のリクエストを送るコマンドです。`-X POST` でメソッドを、`-H` でヘッダーを、`-d` で送るデータを指定しています。
{{% /notice %}}

登録したアイテムが返ってきます。`id` は自動で振られます。

```json
{"id":"0b3c...","name":"cdkd","createdAt":"2026-..."}
```

### 3. アイテムの一覧を取得する

次のコマンドで、`GET /items` からアイテムの一覧を取得します。

```bash
curl "$API_URL/items"
```

メッセージと、登録したアイテムの一覧が返ってきます。

```json
{"message":"Hello from items API","items":[{"id":"0b3c...","name":"cdkd","createdAt":"2026-..."}]}
```

3 つのターミナルで同じ結果が返ってくれば、どの方法でも同じ構成がデプロイできています。

{{% notice note %}}
Express モードでデプロイした API で `{"message":"Service Unavailable"}` などのエラーが返ってくる場合は、まだ準備中のリソースがあります。少し待ってから、もう一度実行してください。
{{% /notice %}}
