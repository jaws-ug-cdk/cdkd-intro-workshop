+++
title = "「--app is required」エラー"
weight = 300
+++

## 症状

`code` ディレクトリではなく、リポジトリのルートなど別の場所で `npx cdk deploy` や `cdkd deploy` を実行すると、次のようなエラーになります。

```
--app is required either in command-line, in cdk.json or in ~/.cdk.json
```

これは、CDK アプリの設定ファイル `cdk.json` が、`code` ディレクトリの中にしかないためです。

## 対処法

`code` ディレクトリに移動してから、もう一度実行してください。

```bash
cd /workspaces/{{< reponame >}}/code
```

今いるディレクトリは、プロンプトの `➜` の右側か、`pwd` コマンドで確認できます。
