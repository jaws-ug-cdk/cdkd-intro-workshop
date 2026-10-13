+++
title = "3 つ同時にデプロイする"
weight = 200
+++

## 手順

3 つのターミナルに、それぞれ次のコマンドを入力します。**Enter はまだ押さずに**、3 つとも入力し終わってから、なるべく同時に Enter を押してください。

左のターミナル:

```bash
time npx cdk deploy CdkStack --output cdk.out/cdk --yes
```

真ん中のターミナル:

```bash
time npx cdk deploy CdkExpressStack --express --output cdk.out/express --yes
```

右のターミナル:

```bash
time cdkd deploy CdkdStack --output cdk.out/cdkd --yes
```

{{% notice info %}}
**`time` とは**: コマンドの前に `time` を付けると、そのコマンドが終わったときに、実行にかかった時間が表示されます。3 つの方法を同じ物差しで比べるために、このワークショップではデプロイや削除のコマンドにいつも `time` を付けます。
{{% /notice %}}

{{% notice info %}}
**`--yes` とは**: CDK と cdkd は、IAM の権限を作ったり変えたりするデプロイや、スタックの削除の前に「続けてよいか」を確認してきます。`--yes` を付けると、この確認に自動で「はい」と答えて進みます。CDK では比較的最近追加されたオプションです。
{{% /notice %}}

## 出力を見てみよう

### cdk deploy

CDK のコードが CloudFormation テンプレートに変換され、CloudFormation がデプロイしている間は `deploying...` のまま待ちます。完了すると、かかった時間と、作られた API の URL（`ApiUrl`）が表示されます。

```
✅  CdkStack

✨  Deployment time: 57.75s

Outputs:
CdkStack.ApiUrl = https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com
...
✨  Total time: 68.35s
```

{{% notice note %}}
デプロイの前に、IAM の権限の変更が表として表示されます。これは `--yes` で自動的に承認されます（`(auto-confirmed)` と表示されます）。`1 feature flags are not configured.` というメッセージも表示されますが、ワークショップの進行には影響しないので無視してかまいません。
{{% /notice %}}

### cdk deploy --express

出力は通常の `cdk deploy` とほぼ同じですが、完了したところで次のような注意が表示されます。

```
⚠️  Stack deployed using Express Mode. Resources still stabilizing: ItemsApi3788C05C, ...
```

「デプロイは完了したが、まだ準備中のリソースがある」という意味です。Express モードは、リソースが使える状態になるのを待たずに完了します。

### cdkd deploy

cdkd は、リソースを 1 つずつ作った様子が表示されます。依存関係のないリソースは、並行して作られます。

```
Deploying stack: CdkdStack
Changes: 12 to create, 0 to update, 0 to delete
Deploying 12 resource(s) (DAG: 5 levels, max parallel: 10)
[1/12] ✓ ItemsHandlerLogGroupC31B979E (AWS::Logs::LogGroup) created
[2/12] ✓ ItemsApi3788C05C (AWS::ApiGatewayV2::Api) created
...
Deployment Summary:
  Stack: CdkdStack
  Created: 12
  ...
  Duration: 13.94s

Outputs:
  CdkdStack.ApiUrl = https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com

✓ Deployment completed successfully
```

## かかった時間を比べよう

どの順番で終わったでしょうか。3 つのターミナルとも、出力のいちばん最後に `time` による時間が表示されています。

```
real    1m8.350s
user    0m12.104s
sys     0m1.872s
```

`real` が、コマンドを実行してから終わるまでに実際にかかった時間です（この例では 1 分 8 秒）。3 つのターミナルの `real` を比べてみましょう。`user` と `sys` はコンピューターの計算に使った時間なので、ここでは気にしなくてかまいません。

{{% notice note %}}
CDK の出力の `Total time` や、cdkd の出力の `Duration` も時間を表していますが、測っている範囲がそれぞれ少し違います（たとえば cdkd の `Duration` には、CDK のコードをテンプレートに変換する時間が含まれません）。`time` の `real` なら、どの方法でも「コマンド全体にかかった時間」を同じように比べられます。
{{% /notice %}}

## 確認

AWS マネジメントコンソールで CloudFormation のページを開き、スタックの一覧を見てみましょう。

`CdkStack` と `CdkExpressStack` はありますが、`CdkdStack` はありません。cdkd は CloudFormation を使わずにリソースを作るためです。

cdkd がデプロイしたスタックは、次のコマンドで確認できます（右のターミナルで実行します）。

```bash
cdkd state list
```

`CdkdStack` が表示されれば、cdkd が状態（state）を S3 バケットに保存できています。
