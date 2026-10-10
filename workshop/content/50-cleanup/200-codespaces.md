+++
title = "Codespace を削除する"
weight = 200
+++

ワークショップが終わったら、Codespace を削除します。Codespace は停止していてもストレージの利用料（無料枠）を消費し続けるためです。

## 手順

{{% notice warning %}}
Codespace を削除すると、Codespace の中で変更したファイルも消えます。残しておきたいものがあれば、先に手元にコピーしてください。
{{% /notice %}}

1. [https://github.com/codespaces](https://github.com/codespaces) を開きます。
2. 一覧から、このワークショップで作った Codespace（リポジトリ名が `jaws-ug-cdk/{{< reponame >}}` のもの）を探します。
3. 右側の `…` ボタンを押し、`Delete` を選びます。

一覧から消えれば、削除は完了です。

## （任意）bootstrap で作ったものを削除する

`cdk bootstrap` で作った `CDKToolkit` スタックと、`cdkd bootstrap` で作った S3 バケットは、置いておくだけならほとんど料金はかかりません。また CDK や cdkd を使うなら、残しておいてかまいません。

完全に片付けたい場合は、次のように削除します。

- `CDKToolkit`: CloudFormation のページでスタックを選び、`削除` を押します。中の S3 バケット（`cdk-` で始まるもの）は、空にしてから削除する必要があります。
- cdkd の S3 バケット: S3 のページで、`cdkd-state-` と `cdkd-assets-` で始まるバケットを、それぞれ空にしてから削除します。

{{% notice warning %}}
同じ AWS アカウントで、ほかにも CDK や cdkd でデプロイしているスタックがある場合は、削除しないでください。デプロイや削除ができなくなります。
{{% /notice %}}

お疲れさまでした！
