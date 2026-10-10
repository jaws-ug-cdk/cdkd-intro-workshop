+++
title = "今回のアーキテクチャ"
weight = 200
+++

このワークショップでは、アイテムを登録・取得できるシンプルな API を作ります。

{{<mermaid align="left">}}
flowchart LR
  user([あなた<br/>curl]) -->|HTTP| api[API Gateway<br/>HTTP API]
  api --> fn[Lambda 関数]
  fn -->|読み書き| table[(DynamoDB<br/>テーブル)]
{{< /mermaid >}}

| リソース | 役割 |
|---|---|
| API Gateway（HTTP API） | インターネットからのリクエストを受け付ける入り口 |
| Lambda 関数 | リクエストを処理するプログラム。サーバーを用意しなくても動く |
| DynamoDB テーブル | アイテムを保存するデータベース |

API には次のルート（URL とメソッドの組み合わせ）があります。

| ルート | 動き |
|---|---|
| `GET /items` | 登録されているアイテムを一覧で返す |
| `POST /items` | アイテムを登録する |
| `GET /items/{id}` | 指定した ID のアイテムを 1 件返す（[更新の体験]({{< ref "/40-update" >}})で追加する） |

## 同じ構成を 3 つデプロイする

この構成を、3 つの方法で 1 つずつ、合わせて 3 セットデプロイします。中身はまったく同じで、スタックの名前とデプロイの方法だけが違います。

| スタック名 | デプロイの方法 |
|---|---|
| `CdkStack` | `cdk deploy` |
| `CdkExpressStack` | `cdk deploy --express` |
| `CdkdStack` | `cdkd deploy` |

{{% notice info %}}
**スタックとは**: CDK では、一緒にデプロイするリソースのまとまりを「スタック」と呼びます。デプロイ、更新、削除はスタック単位で行います。
{{% /notice %}}
