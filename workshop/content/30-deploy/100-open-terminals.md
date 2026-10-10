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

### 2. それぞれのディレクトリに移動する

左のターミナルで、次のコマンドを実行します。

```bash
cd "$(git rev-parse --show-toplevel)/code/cdk"
```

真ん中のターミナルで、次のコマンドを実行します。

```bash
cd "$(git rev-parse --show-toplevel)/code/express"
```

右のターミナルで、次のコマンドを実行します。

```bash
cd "$(git rev-parse --show-toplevel)/code/cdkd"
```

以降の手順では、ターミナルを次のように呼びます。

| ターミナル | ディレクトリ | デプロイの方法 |
|---|---|---|
| 左 | `code/cdk` | `cdk deploy` |
| 真ん中 | `code/express` | `cdk deploy --express` |
| 右 | `code/cdkd` | `cdkd deploy` |

{{% notice note %}}
`cdk` や `cdkd` のコマンドは、`cdk.json` があるディレクトリで実行する必要があります。違うディレクトリで実行するとエラーになるので、注意してください（[「--app is required」エラー]({{< ref "/95-troubleshooting/300-wrong-directory" >}})）。
{{% /notice %}}
