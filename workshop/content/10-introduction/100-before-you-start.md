+++
title = "はじめる前に"
weight = 100
+++

## 手順

このワークショップでは [GitHub Codespaces](https://github.co.jp/features/codespaces) を使って進めます。起動に数分かかるので、最初に立ち上げておきましょう。

{{% notice info %}}
**GitHub Codespaces とは**: ブラウザの中で使える開発環境です。VS Code と同じ画面で、ファイルの編集やターミナルでのコマンド実行ができます。自分のパソコンに何もインストールしなくても、ワークショップに必要なツールがそろった環境がすぐに使えます。
{{% /notice %}}

### 1. GitHub Codespaces を起動する

以下のリンクを開きます。

[https://github.com/jaws-ug-cdk/{{< reponame >}}](https://github.com/jaws-ug-cdk/{{< reponame >}})

`Code` ボタンから `Codespaces` タブを開き、`Create codespace on main` ボタンを押します。

画面が切り替わり、Codespace の作成が始まります。起動を待っている間に、次のページを読み進めてください。

画面下部に `TERMINAL` パネルが表示され、ターミナルに次のようなプロンプトが出たら起動完了です。

```
@<GitHub のユーザー名> ➜ /workspaces/{{< reponame >}} (main) $
```

以降の手順では、このターミナルにコマンドを入力していきます。

{{% notice note %}}
起動のときに、ワークショップで使う Node.js と AWS CLI のインストール、CDK のコードが使うパッケージのインストール（`npm ci`）まで自動で行われます。
{{% /notice %}}

{{% notice warning %}}
**GitHub Codespaces の利用料について**: 個人の GitHub アカウントには、毎月の無料枠（Free プランで 120 コア時間、ストレージ 15 GB）があります。このワークショップで使う範囲は無料枠に収まりますが、Codespace は残っている間ストレージを消費し続けます。ワークショップが終わったら、[後片付け]({{< ref "/50-cleanup" >}})の手順で Codespace を削除してください。
{{% /notice %}}

{{% notice tip %}}
コマンドが動かなくなった場合は、[トラブルシューティング]({{< ref "/95-troubleshooting" >}})を確認してください。
{{% /notice %}}
