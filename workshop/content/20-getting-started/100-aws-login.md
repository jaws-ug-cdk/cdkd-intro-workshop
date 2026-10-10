+++
title = "AWS にログインする"
weight = 100
+++

## 手順

ブラウザから AWS アカウントにサインインします。

https://console.aws.amazon.com/

画面右上のリージョンが「東京」（`ap-northeast-1`）になっていることを確認します。違うリージョンになっている場合は、リージョンの一覧から「東京」を選択してください。

![select region](../images/20-getting-started/select-region.png)

{{% notice info %}}
**リージョンとは**: AWS のデータセンターがある地域のことです。このワークショップでは、すべてのリソースを東京リージョン（`ap-northeast-1`）に作ります。
{{% /notice %}}

続いて、GitHub Codespaces のターミナルで次のコマンドを実行します。

```bash
aws login --remote
```

{{% notice note %}}
ターミナルに初めて貼り付けをするとき、ブラウザからクリップボードへのアクセスの許可を求められることがあります。その場合は `Allow` を押してください。
{{% /notice %}}

リージョンを聞かれたら `ap-northeast-1` を入力します。

```
AWS Region [us-east-1]: ap-northeast-1
```

ターミナルに URL が表示されるので、コピーしてブラウザに貼り付けて開きます。

ブラウザに表示された `検証コードをコピー` ボタンでコードをコピーし、ターミナルに貼り付けてログインを完了します。

{{% notice info %}}
**`aws login` とは**: ブラウザで AWS にサインインしたときの権限を、ターミナルのコマンド（AWS CLI や CDK、cdkd）でも使えるようにするコマンドです。アクセスキーを発行して貼り付ける必要がなく、安全にログインできます。
{{% /notice %}}

## 確認

次のコマンドを実行します。

```bash
aws sts get-caller-identity
```

ログインしている AWS アカウントの ID（`Account`）が表示されれば完了です。

```json
{
    "UserId": "...",
    "Account": "123456789012",
    "Arn": "arn:aws:..."
}
```

{{% notice tip %}}
`aws login` でエラーになった場合や、会社の AWS アカウントで IAM Identity Center（AWS SSO）を使ってサインインしている場合は、[「aws login」でエラーになる]({{< ref "/95-troubleshooting/100-aws-login" >}})を確認してください。
{{% /notice %}}
