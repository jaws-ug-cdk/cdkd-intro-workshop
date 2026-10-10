+++
title = "bootstrap"
weight = 300
+++

CDK も cdkd も、デプロイする前に AWS アカウントの準備（bootstrap）が必要です。どちらも、1 つの AWS アカウントとリージョンにつき 1 回だけ行います。

## CDK の bootstrap

CDK は、Lambda 関数のコードや CloudFormation テンプレートを S3 バケットにアップロードしてからデプロイします。`cdk bootstrap` は、そのための S3 バケットやデプロイ用の IAM ロールを、`CDKToolkit` という CloudFormation スタックとして作ります。

`code/cdk` ディレクトリに移動して、次のコマンドを実行します。

```bash
cd "$(git rev-parse --show-toplevel)/code/cdk"
npx cdk bootstrap
```

{{% notice note %}}
`cdk deploy` と `cdk deploy --express` は、同じ `CDKToolkit` を使います。`code/express` ディレクトリで bootstrap し直す必要はありません。
{{% /notice %}}

## cdkd の bootstrap

cdkd は CloudFormation を使わないので、`CDKToolkit` スタックの代わりに、自分で使う S3 バケットを作ります。

| バケット | 役割 |
|---|---|
| `cdkd-state-<アカウント ID>` | どのスタックでどのリソースを作ったかという状態（state）を保存する |
| `cdkd-assets-<アカウント ID>-<リージョン>` | Lambda 関数のコードなどをアップロードする |

続けて、次のコマンドを実行します。

```bash
cdkd bootstrap
```

## 確認

AWS マネジメントコンソールの画面上部の検索窓に `CloudFormation` と入力し、表示された `CloudFormation` を選択します。

![search CloudFormation](../images/20-getting-started/search-cloudformation.png)

`CDKToolkit` スタックが `CREATE_COMPLETE` になっていることを確認します。

続いて、検索窓に `S3` と入力して S3 のページを開きます。`cdkd-state-` と `cdkd-assets-` で始まるバケットがあることを確認します。

これで環境準備は完了です。次の章では、いよいよ 3 つの方法でデプロイします。
