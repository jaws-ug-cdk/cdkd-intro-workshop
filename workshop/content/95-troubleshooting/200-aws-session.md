+++
title = "「Unable to resolve AWS account」エラー"
weight = 200
+++

## 症状

しばらく操作せずにいると、AWS へのログインのセッションが切れることがあります。その状態で `cdk deploy` や `cdkd deploy` を実行すると、次のような認証のエラーになります。

```
Unable to resolve AWS account to use. It must be either configured when you define your CDK Stack, or through the environment
```

## 対処法

次のコマンドを実行して、もう一度ログインします。

```bash
aws login --remote
```

あとは [AWS にログインする]({{< ref "/20-getting-started/100-aws-login" >}})の手順と同じです。

IAM Identity Center（AWS SSO）でログインしている場合は、`aws sso login --use-device-code` を実行します（[「aws login」でエラーになる]({{< ref "/95-troubleshooting/100-aws-login" >}})を参照）。
