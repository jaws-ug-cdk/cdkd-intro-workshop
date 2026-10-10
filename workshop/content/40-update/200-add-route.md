+++
title = "② API にルートを追加する"
weight = 200
+++

次は、インフラの構成を変える更新です。API に `GET /items/{id}`（ID を指定してアイテムを 1 件取得する）ルートを追加します。

hotswap は Lambda 関数のコードなど一部の変更にしか使えないため、左のターミナルでは通常の `cdk deploy` に戻します。

## スタックを変更する

3 つのスタックのコードを、それぞれ同じように変更します。まず `code/cdk/lib/items-api-stack.ts` を開きます。

```bash
code "$(git rev-parse --show-toplevel)/code/cdk/lib/items-api-stack.ts"
```

`[更新体験 ②]` と書かれたコメントの下の 5 行の、先頭の `// ` を消してコメントを外します。

変更前:

```typescript
    // [更新体験 ②] 下の 5 行のコメントを外して GET /items/{id} を追加する
    // api.addRoutes({
    //   path: '/items/{id}',
    //   methods: [apigwv2.HttpMethod.GET],
    //   integration,
    // });
```

変更後:

```typescript {hl_lines=["2-6"]}
    // [更新体験 ②] 下の 5 行のコメントを外して GET /items/{id} を追加する
    api.addRoutes({
      path: '/items/{id}',
      methods: [apigwv2.HttpMethod.GET],
      integration,
    });
```

{{% notice tip %}}
5 行を選択して `Ctrl + /`（Mac は `Cmd + /`）を押すと、まとめてコメントを外せます。
{{% /notice %}}

{{% notice info %}}
**コメントとは**: `//` から行の終わりまでは「コメント」として扱われ、プログラムとしては無視されます。コメントを外すと、その行がプログラムとして動くようになります。
{{% /notice %}}

同じ変更を、残りの 2 つのファイルにも行います。

```bash
code "$(git rev-parse --show-toplevel)/code/express/lib/items-api-stack.ts"
```

```bash
code "$(git rev-parse --show-toplevel)/code/cdkd/lib/items-api-stack.ts"
```

{{% notice note %}}
3 つのファイルとも変更したら、保存されているか確認しましょう。エディタのタブのファイル名の横に `●` が付いていたら、保存されていません。`Ctrl + S`（Mac は `Cmd + S`）で保存してください。
{{% /notice %}}

## 3 つ同時にデプロイする

3 つのターミナルにそれぞれ次のコマンドを入力し、3 つとも入力し終わってから、なるべく同時に Enter を押します。

左のターミナル（`code/cdk`）:

```bash
npx cdk deploy --yes
```

真ん中のターミナル（`code/express`）:

```bash
npx cdk deploy --express --yes
```

右のターミナル（`code/cdkd`）:

```bash
cdkd deploy --yes
```

## 出力を見てみよう

cdkd は、追加されたルートと、API Gateway から Lambda 関数を呼ぶための権限の 2 つだけを作っています。

```
Changes: 2 to create, 0 to update, 0 to delete
[1/2] ✓ ItemsApiGETitemsid4451DC96 (AWS::ApiGatewayV2::Route) created
[2/2] ✓ ItemsApiGETitemsidItemsIntegrationPermissionBD003322 (AWS::Lambda::Permission) created
```

`cdk deploy` と `cdk deploy --express` も、変更するリソースは同じです。それでも、CloudFormation が変更点を調べてから反映するぶん、時間がかかります。

{{% notice note %}}
左のターミナルで `--hotswap` を付けたまま実行すると、ルートの追加は hotswap の対象外なので、`(no changes)` と表示されて何も反映されません。hotswap は Lambda 関数のコードの変更など、決まった種類の変更のためのものです。
{{% /notice %}}

## 確認

各ターミナルで、アイテムの一覧を取得し、表示された `id` をコピーします。

```bash
curl "$API_URL/items"
```

コピーした `id` を指定して、追加したルートを呼びます。

```bash
curl "$API_URL/items/<コピーした id>"
```

指定したアイテムが 1 件だけ返ってくれば、ルートの追加は完了です。

```json
{"id":"0b3c...","name":"cdkd","createdAt":"2026-..."}
```
