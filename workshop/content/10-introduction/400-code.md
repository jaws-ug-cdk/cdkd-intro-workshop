+++
title = "コードの構成"
weight = 400
+++

ワークショップで使う CDK のコードは、リポジトリの `code` ディレクトリにあります。

```
code/
├── cdk.json                # CDK アプリの設定ファイル
├── bin/app.ts              # CdkStack / CdkExpressStack / CdkdStack を作る
├── lib/items-api-stack.ts  # 3 つのスタックで共通のスタックの中身
└── lambda/items.js         # 3 つのスタックで共通の Lambda 関数のコード
```

1 つの CDK アプリの中に、同じ中身のスタックを 3 つの名前で作っています。デプロイするときに、どのスタックをどの方法でデプロイするかをコマンドで指定します。

| ファイル | 役割 |
|---|---|
| `cdk.json` | CDK アプリの設定ファイル。`cdk` や `cdkd` のコマンドは、このファイルがあるディレクトリで実行する |
| `bin/app.ts` | CDK アプリの入り口。どの名前でスタックを作るかを書く |
| `lib/items-api-stack.ts` | スタックの中身。どんなリソースを作るかを書く |

## スタックのコードを見てみよう

`code/lib/items-api-stack.ts` を開きます。ターミナルで次のコマンドを実行します。

```bash
code "$(git rev-parse --show-toplevel)/code/lib/items-api-stack.ts"
```

主な部分を抜き出すと、次のようになっています。

```typescript
// DynamoDB テーブル
const table = new dynamodb.TableV2(this, 'ItemsTable', {
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});

// Lambda 関数（コードは code/lambda/items.js）
const handler = new lambda.Function(this, 'ItemsHandler', {
  runtime: lambda.Runtime.NODEJS_24_X,
  code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
  handler: 'items.handler',
  environment: {
    TABLE_NAME: table.tableName,
  },
});

// Lambda 関数にテーブルの読み書きを許可する
table.grants.readWriteData(handler);

// API Gateway（HTTP API）と、GET /items・POST /items のルート
const api = new apigwv2.HttpApi(this, 'ItemsApi');
const integration = new HttpLambdaIntegration('ItemsIntegration', handler);
api.addRoutes({
  path: '/items',
  methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.POST],
  integration,
});
```

`new dynamodb.TableV2(...)` のように、作りたいリソースを `new` で書いていくのが CDK の基本です。

`table.grants.readWriteData(handler)` の 1 行で、「Lambda 関数がテーブルを読み書きしてよい」という IAM の権限が作られます。権限の細かい設定を自分で書かなくてよいのも CDK の便利なところです。

## アプリの入り口を見てみよう

`code/bin/app.ts` を開きます。

```bash
code "$(git rev-parse --show-toplevel)/code/bin/app.ts"
```

```typescript
const app = new cdk.App();
new ItemsApiStack(app, 'CdkStack');
new ItemsApiStack(app, 'CdkExpressStack');
new ItemsApiStack(app, 'CdkdStack');
```

`lib/items-api-stack.ts` で定義したスタックを、`CdkStack`、`CdkExpressStack`、`CdkdStack` の 3 つの名前で作っています。3 つとも中身はまったく同じです。cdkd のために CDK のコードを書き換える必要はありません。
