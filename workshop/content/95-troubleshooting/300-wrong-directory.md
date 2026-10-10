+++
title = "「--app is required」エラー"
weight = 300
+++

## 症状

`code/cdk` などのディレクトリではなく、リポジトリのルートなど別の場所で `npx cdk deploy` や `cdkd deploy` を実行すると、次のようなエラーになります。

```
--app is required either in command-line, in cdk.json or in ~/.cdk.json
```

これは、CDK アプリの設定ファイル `cdk.json` が、`code/cdk`、`code/express`、`code/cdkd` の各ディレクトリの中にしかないためです。

## 対処法

ターミナルに合ったディレクトリに移動してから、もう一度実行してください。

```bash
cd "$(git rev-parse --show-toplevel)/code/cdk"      # 左のターミナル
cd "$(git rev-parse --show-toplevel)/code/express"  # 真ん中のターミナル
cd "$(git rev-parse --show-toplevel)/code/cdkd"     # 右のターミナル
```

今いるディレクトリは、プロンプトの `➜` の右側か、`pwd` コマンドで確認できます。
