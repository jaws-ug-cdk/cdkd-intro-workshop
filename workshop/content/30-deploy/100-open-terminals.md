+++
title = "ターミナルを 3 つ用意する"
weight = 100
+++

3 つのデプロイを同時に走らせるため、ターミナルを 3 つ用意します。

## 手順

### 1. ターミナルを分割する

ターミナルパネルの右上にある `Split Terminal`（四角が縦に 2 つに分かれたアイコン）を 2 回押して、ターミナルを横に 3 つ並べます。

{{% notice tip %}}
アイコンが見つからない場合は、ターミナルを選んだ状態で `Ctrl + Shift + 5`（Mac は `Cmd + \`）を押しても分割できます。
{{% /notice %}}

### 2. code ディレクトリに移動する

3 つのターミナルそれぞれで、次のコマンドを実行します。

```bash
cd /workspaces/{{< reponame >}}/code
```

以降の手順では、ターミナルを次のように呼びます。3 つとも同じ `code` ディレクトリで、デプロイするスタックと方法だけが違います。

| ターミナル | スタック | デプロイの方法 |
|---|---|---|
| 左 | `CdkStack` | `cdk deploy` |
| 真ん中 | `CdkExpressStack` | `cdk deploy --express` |
| 右 | `CdkdStack` | `cdkd deploy` |

{{% notice note %}}
`cdk` や `cdkd` のコマンドは、`cdk.json` があるディレクトリで実行する必要があります。違うディレクトリで実行するとエラーになるので、注意してください（[「--app is required」エラー]({{< ref "/95-troubleshooting/300-wrong-directory" >}})）。
{{% /notice %}}

{{% notice info %}}
**`--output` とは**: 以降のコマンドには、`--output cdk.out/cdk` のように `--output` が付いています。CDK と cdkd は、デプロイの前に CDK のコードを CloudFormation テンプレートに変換（synth）して、`cdk.out` ディレクトリに書き出します。3 つのターミナルが同じ `cdk.out` に同時に書き出そうとするとエラーになるので、ターミナルごとに書き出し先を分けています（[「is currently synthing to cdk.out」エラー]({{< ref "/95-troubleshooting/350-synth-lock" >}})）。
{{% /notice %}}
