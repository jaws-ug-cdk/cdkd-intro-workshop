---
title: "cdkd Intro Workshop"
chapter: true
weight: 1
---

# Welcome!

[cdkd](https://github.com/go-to-k/cdkd) を初めて体験する人向けのハンズオンです。

同じ AWS CDK のコードを、次の 3 つの方法で**同時に**デプロイします。デプロイ、更新、削除の速さの違いを、自分の目で確かめてみましょう。

| 方法 | コマンド |
|---|---|
| 通常の CDK | `cdk deploy` |
| CloudFormation の Express モード | `cdk deploy --express` |
| cdkd | `cdkd deploy` |

CDK のコードはあらかじめ用意してあります。コードをほとんど書かずに進められるので、CDK を触ったことがない方も気軽に参加してください。

## このワークショップで扱うこと

- 3 つの方法で同じ構成をデプロイし、かかる時間を比べる
- Lambda のコードだけを変える更新と、インフラの構成を変える更新を、それぞれ比べる
- 3 つの方法でスタックを削除し、かかる時間を比べる

## 時間の目安

| 章 | 時間 |
|---|---|
| はじめに・環境準備 | 20 分 |
| デプロイ・更新・削除の体験 | 40 分 |

## 事前準備

### GitHub アカウント

持っていない方は作成してください。

{{< linkcard title="GitHub でのアカウントの作成" url="https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github" >}}

### AWS アカウント

新しい AWS アカウントを作って使うことをおすすめします。

{{< linkcard title="AWS アカウント作成の流れ" url="https://aws.amazon.com/jp/register-flow/" >}}

アカウントプランは有料を選択してください。

{{% notice note %}}
会社の AWS アカウントは、組織のルールでワークショップの操作ができないことがあります（[トラブルシューティング]({{< ref "/95-troubleshooting" >}})を参照）。個人で作った AWS アカウントを使うと、つまずかずに進められます。
{{% /notice %}}
