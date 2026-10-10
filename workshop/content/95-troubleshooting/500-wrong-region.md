+++
title = "cdkd のスタックが東京リージョンに見当たらない"
weight = 500
+++

## 症状

`cdkd deploy` は成功したのに、AWS マネジメントコンソールの東京リージョンで、Lambda 関数や DynamoDB テーブルが見当たりません。`ApiUrl` の URL に `us-east-1` が含まれています。

```
CdkdStack.ApiUrl = https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
```

cdkd は、`aws login` で設定したリージョンを読まず、環境変数 `AWS_REGION` が設定されていないとバージニア北部リージョン（`us-east-1`）にデプロイします（[go-to-k/cdkd#2100](https://github.com/go-to-k/cdkd/issues/2100)）。

このワークショップの Codespace では、起動時に `AWS_REGION=ap-northeast-1` を設定しているので、通常はこの問題は起きません。

## 対処法

次のコマンドで、`AWS_REGION` が設定されているか確認します。

```bash
echo $AWS_REGION
```

何も表示されない場合は、次のコマンドで設定します。

```bash
export AWS_REGION=ap-northeast-1
```

`us-east-1` にデプロイしてしまったスタックは、右のターミナル（`code/cdkd`）で次のコマンドを実行して削除してから、デプロイし直してください。

```bash
cdkd destroy --region us-east-1 --yes
```
