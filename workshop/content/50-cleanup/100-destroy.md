+++
title = "3 つ同時に削除する"
weight = 100
+++

## 手順

3 つのターミナルにそれぞれ次のコマンドを入力し、3 つとも入力し終わってから、なるべく同時に Enter を押します。

左のターミナル（`code/cdk`）:

```bash
npx cdk destroy --yes
```

真ん中のターミナル（`code/express`）:

```bash
npx cdk destroy --express --yes
```

右のターミナル（`code/cdkd`）:

```bash
cdkd destroy --yes
```

{{% notice note %}}
削除のコマンドでも `--yes` を付けると、「本当に削除してよいか」の確認に自動で「はい」と答えます。普段の開発では、間違えて削除しないように `--yes` を付けずに実行して、確認画面でスタック名を確かめるのがおすすめです。
{{% /notice %}}

## 出力を見てみよう

`cdk destroy --express` は、デプロイのときと同じく、削除しきるのを待たずに完了します。

```
✅  CdkExpressStack: destroyed
⚠️  Stack deleted using Express Mode. Resources still tearing down: ...
```

`cdkd destroy` は、削除するリソースの一覧を表示してから、依存関係の順番に削除していきます。

```
Resources to be deleted (14):
  - ItemsHandlerLogGroupC31B979E (AWS::Logs::LogGroup)
  ...
  ✓ ItemsApiGETitems9DF0F922 (AWS::ApiGatewayV2::Route) deleted
  ...
✓ Stack CdkdStack destroyed (14 deleted, 0 errors)
```

時間を比べたい場合は、コマンドの前に `time` を付けて実行しましょう（例: `time cdkd destroy --yes`）。

## 確認

AWS マネジメントコンソールで CloudFormation のページを開きます。

スタックの一覧に `CDKToolkit` 以外のスタックが残っていないことを確認します。`CdkStack` と `CdkExpressStack` が表示されていなければ、削除は完了です。

cdkd のスタックは、右のターミナルで次のコマンドを実行して確認します。

```bash
cdkd state list
```

`CdkdStack` が表示されなければ、削除は完了です。
