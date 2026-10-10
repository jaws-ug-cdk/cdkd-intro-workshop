+++
title = "コードの構成"
weight = 400
+++

ワークショップで使う CDK のコードは、リポジトリの `code` ディレクトリにあります。

```
code/
├── lambda/items.js         # 3 つのアプリで共通の Lambda 関数のコード
├── cdk/                    # cdk deploy            → CdkStack
│   ├── bin/cdk.ts
│   ├── lib/items-api-stack.ts
│   └── cdk.json
├── express/                # cdk deploy --express  → CdkExpressStack
│   ├── bin/express.ts
│   ├── lib/items-api-stack.ts
│   └── cdk.json
└── cdkd/                   # cdkd deploy           → CdkdStack
    ├── bin/cdkd.ts
    ├── lib/items-api-stack.ts
    └── cdk.json
```

デプロイの方法ごとにディレクトリを分けています。3 つのターミナルからそれぞれのディレクトリでコマンドを実行すると、3 つのデプロイを同時に走らせられます。

どのディレクトリも、中身は同じ形をしています。

| ファイル | 役割 |
|---|---|
| `cdk.json` | CDK アプリの設定ファイル。`cdk` や `cdkd` のコマンドは、このファイルがあるディレクトリで実行する |
| `bin/*.ts` | CDK アプリの入り口。どの名前でスタックを作るかを書く |
| `lib/items-api-stack.ts` | スタックの中身。どんなリソースを作るかを書く |

## スタックのコードを見てみよう

`code/cdk/lib/items-api-stack.ts` を開きます。ターミナルで次のコマンドを実行します。

```bash
code "$(git rev-parse --show-toplevel)/code/cdk/lib/items-api-stack.ts"
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
  code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda')),
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

{{% notice note %}}
`code/express/lib/items-api-stack.ts` と `code/cdkd/lib/items-api-stack.ts` も、まったく同じ内容です。cdkd のために CDK のコードを書き換える必要はありません。
{{% /notice %}}

## アプリの入り口を見てみよう

`code/cdkd/bin/cdkd.ts` を開きます。

```bash
code "$(git rev-parse --show-toplevel)/code/cdkd/bin/cdkd.ts"
```

```typescript
const app = new cdk.App();
new ItemsApiStack(app, 'CdkdStack');
```

`lib/items-api-stack.ts` で定義したスタックを、`CdkdStack` という名前で作っています。`code/cdk/bin/cdk.ts` では `CdkStack`、`code/express/bin/express.ts` では `CdkExpressStack` という名前です。
