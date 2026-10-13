+++
title = "「is currently synthing to cdk.out」エラー"
weight = 350
+++

## 症状

3 つのターミナルで同時にコマンドを実行すると、どれかのターミナルで次のようなエラーになります。

```
Another CLI (PID=12345) is currently synthing to cdk.out. Invoke the CLI in sequence, or use '--output' to synth into different directories.
```

これは、コマンドの `--output` が抜けていたり、ほかのターミナルと同じ書き出し先になっていたりして、複数のコマンドが同じディレクトリに同時に書き出そうとしたためです。

## 対処法

ターミナルに合った `--output` を付けて、もう一度実行してください。

| ターミナル | `--output` |
|---|---|
| 左 | `--output cdk.out/cdk` |
| 真ん中 | `--output cdk.out/express` |
| 右 | `--output cdk.out/cdkd` |

{{% notice note %}}
スタック名を付けずに `npx cdk deploy` を実行すると、「スタックが複数あるので、どれをデプロイするか指定してください」というエラーになります。コマンドは、手順に書かれたとおりにスタック名を付けて実行してください。
{{% /notice %}}
