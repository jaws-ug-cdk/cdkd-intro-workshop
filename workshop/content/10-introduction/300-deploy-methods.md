+++
title = "3 つのデプロイ方法"
weight = 300
+++

このワークショップで比べるデプロイ方法を、簡単に紹介します。cdkd の詳しい仕組みは、ワークショップの冒頭のスライドで説明します。

## cdk deploy（通常の CDK）

AWS CDK は、TypeScript などのプログラミング言語でインフラを定義できるツールです。
`cdk deploy` を実行すると、CDK はコードを **CloudFormation テンプレート**（インフラの設計図）に変換し、AWS CloudFormation にデプロイを依頼します。

{{% notice info %}}
**CloudFormation テンプレートの形式**: CloudFormation のテンプレートは、JSON と YAML のどちらでも書けます。手で書くときは読みやすい YAML がよく使われますが、CDK は JSON で出力します（`cdk.out/CdkStack.template.json` など）。`cdk synth` を実行したときに画面に表示されるのは、読みやすいように YAML に変換したものです。
{{% /notice %}}

CloudFormation は、テンプレートのとおりにリソースを作り、すべてのリソースが使える状態になるまで確かめてから完了します。途中で失敗したら、元の状態に戻してくれます（ロールバック）。安全な代わりに、待ち時間が長くなりがちです。

## cdk deploy --express（Express モード）

CloudFormation の **Express モード**を使ったデプロイです。CDK のコードやテンプレートは通常の CDK と同じです。

Express モードでは、リソースの作成を AWS に依頼したところで、使える状態になるのを待たずに完了します。そのぶん速くなりますが、完了した直後はまだ準備中のリソースが残っていることがあります。また、失敗したときのロールバックは既定では行われません。

## cdk deploy --hotswap（ホットスワップ）

[更新の体験]({{< ref "/40-update" >}})で使います。Lambda 関数のコードなど、一部の変更だけを CloudFormation を通さずに直接書き換える、開発用のデプロイ方法です。とても速いですが、インフラの構成の変更（API のルートの追加など）には使えません。

## cdkd deploy

cdkd は、**CloudFormation を使わずに** AWS の API を直接呼んでリソースを作るツールです。今ある CDK のコードを書き換えずに、そのまま使えます。

CloudFormation の代わりに、どのリソースを作ったかという「状態（state）」を、cdkd が自分で S3 バケットに保存して管理します。

## まとめ

| 方法 | CloudFormation | 使える変更 |
|---|---|---|
| `cdk deploy` | 使う | すべて |
| `cdk deploy --express` | 使う（Express モード） | すべて |
| `cdk deploy --hotswap` | 使わない | Lambda のコードなど一部だけ（それ以外の変更は反映されない） |
| `cdkd deploy` | 使わない | すべて |
