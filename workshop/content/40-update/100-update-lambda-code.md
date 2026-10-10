+++
title = "① Lambda 関数のコードを変える"
weight = 100
+++

アプリの開発でいちばんよくあるのは、Lambda 関数のコードだけを直してデプロイし直す、という更新です。

CDK では、このような変更のために `--hotswap` という開発用のオプションが用意されています。左のターミナルでは、通常の `cdk deploy` の代わりに `cdk deploy --hotswap` を使います。

## Lambda 関数のコードを変更する

`code/lambda/items.js` を開きます。ターミナルで次のコマンドを実行します。

```bash
code "$(git rev-parse --show-toplevel)/code/lambda/items.js"
```

`message` の文字列を、好きなものに書き換えます。

```javascript {hl_lines=["2"]}
// [更新体験 ①] message の文字列を好きなものに書き換える
const message = 'Hello from cdkd workshop!';
```

{{% notice note %}}
`code/lambda/items.js` は 3 つのアプリで共通のファイルです。1 か所を書き換えるだけで、3 つのスタックすべてに反映されます。
{{% /notice %}}

## 3 つ同時にデプロイする

3 つのターミナルにそれぞれ次のコマンドを入力し、3 つとも入力し終わってから、なるべく同時に Enter を押します。

左のターミナル（`code/cdk`）:

```bash
npx cdk deploy --hotswap --yes
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

### cdk deploy --hotswap

CloudFormation を通さずに、Lambda 関数のコードを直接書き換えています（`hotswapped!`）。

```
⚠️ The --hotswap and --hotswap-fallback flags deliberately introduce CloudFormation drift to speed up deployments
⚠️ They should only be used for development - never use them for your production Stacks!
...
✨ hotswapping resources:
   ✨ AWS::Lambda::Function 'CdkStack-ItemsHandlerFB09CCF4-xxxxxxxxxxxx'
   ✨ AWS::Lambda::Function 'CdkStack-ItemsHandlerFB09CCF4-xxxxxxxxxxxx' hotswapped!
```

最初の警告は、「CloudFormation が知らないところでリソースを書き換えるので、CloudFormation の記録と実際の状態がずれる（ドリフトする）。本番環境では使わないように」という意味です。

{{% notice note %}}
出力の最後に `Your next non-hotswap deployment ... should include '--revert-drift'` と表示されます。次に通常のデプロイをするときに、ずれを直すオプションを付けるようにという案内です。このワークショップでは、次の通常のデプロイで Lambda 関数のコードも同じ内容に更新されるので、付けなくてかまいません。
{{% /notice %}}

### cdk deploy --express

Express モードでも、CloudFormation が変更点を調べてからデプロイするので、初回のデプロイほどの差は出ません。

### cdkd deploy

cdkd は、前回のデプロイの状態（state）と比べて、変わった Lambda 関数だけを更新しています。

```
Changes: 0 to create, 1 to update, 0 to delete
[1/1] ✓ ItemsHandlerFB09CCF4 (AWS::Lambda::Function) updated
...
  Updated: 1
  Unchanged: 11
```

## 確認

各ターミナルで、次のコマンドを実行します。

```bash
curl "$API_URL/items"
```

`message` が書き換えた文字列になっていれば、更新できています。

{{% notice tip %}}
`curl: (3) URL rejected` のようなエラーになる場合は、`API_URL` 変数が消えています。[API を呼んでみる]({{< ref "/30-deploy/300-try-api" >}})の手順で、もう一度設定してください。
{{% /notice %}}

hotswap は Lambda 関数のコードの変更ではとても速く、cdkd と同じくらいか、それより速いこともあります。では、Lambda 関数のコード以外の変更ではどうでしょうか。次のページで試してみましょう。
