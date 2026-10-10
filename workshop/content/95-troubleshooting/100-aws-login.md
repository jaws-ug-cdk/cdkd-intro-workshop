+++
title = "「aws login」でエラーになる"
weight = 100
+++

## 症状 1: 権限が足りないと言われる

`aws login --remote` で検証コードを貼り付けたあと、次のようなエラーになります。

```
aws: [ERROR]: Unable to create or refresh login credentials due to insufficient permissions. You may be missing permission for the 'signin:CreateOAuth2Token' action.
```

### 対処法

`aws login` を使うには、サインインしている IAM ユーザーやロールに、ログイン用の権限が必要です。AWS アカウントの管理者に、AWS 管理ポリシー `SignInLocalDevelopmentAccess` をアタッチしてもらってください。

ルートユーザー（AWS アカウントを作ったときのメールアドレス）でサインインしている場合は、この権限は不要です。

## 症状 2: IAM Identity Center（AWS SSO）でサインインしている

会社の AWS アカウントなどで、AWS アクセスポータル（`https://xxxx.awsapps.com/start` のような URL）からサインインしている場合、`aws login` は使えません。代わりに次の手順でログインします。

### 対処法

次のコマンドを実行します。

```bash
aws configure sso --use-device-code
```

質問に順番に答えます。

| 質問 | 入力する値 |
|---|---|
| `SSO session name` | 好きな名前（例: `workshop`） |
| `SSO start URL` | AWS アクセスポータルの URL（`https://xxxx.awsapps.com/start`） |
| `SSO region` | IAM Identity Center のリージョン（わからなければ管理者に確認） |
| `SSO registration scopes` | 何も入力せずに Enter |

URL とコードが表示されるので、ブラウザで URL を開いてコードを確認し、アクセスを許可します。

続けて、使う AWS アカウントとロールを選び、残りの質問に答えます。

| 質問 | 入力する値 |
|---|---|
| `Default client Region` | `ap-northeast-1` |
| `CLI default output format` | 何も入力せずに Enter |
| `Profile name` | `default` |

{{% notice note %}}
`Profile name` を `default` にしておくと、`AWS_PROFILE` などの設定をしなくても、CDK や cdkd がこのログインを使います。
{{% /notice %}}

ログインが切れたときは、次のコマンドでログインし直します。

```bash
aws sso login --use-device-code
```
