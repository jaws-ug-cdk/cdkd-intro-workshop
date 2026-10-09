# ワークショップ用 CDK コード

同じ構成（HTTP API + Lambda + DynamoDB）を、3 つのデプロイ方法で同時にデプロイして速さを比べるためのコードです。

```
code/
├── lambda/items.js         # 3 つのアプリで共通の Lambda のコード
├── cdk/                    # cdk deploy            → CdkStack
│   ├── bin/cdk.ts
│   └── lib/items-api-stack.ts
├── express/                # cdk deploy --express  → CdkExpressStack
│   ├── bin/express.ts
│   └── lib/items-api-stack.ts
└── cdkd/                   # cdkd deploy           → CdkdStack
    ├── bin/cdkd.ts
    └── lib/items-api-stack.ts
```

ディレクトリごとに CDK アプリが分かれているので、ターミナルを 3 つ開いて同時に実行できます。
3 つの `lib/items-api-stack.ts` は同じ内容です（`npm test` で同じテンプレートになることを確かめています）。

## 準備

```bash
npm ci
export AWS_PROFILE=<プロファイル名>
export AWS_REGION=ap-northeast-1   # cdkd はプロファイルの region を読まないため必須
```

## デプロイ

```bash
cd cdk     && npx cdk deploy
cd express && npx cdk deploy --express
cd cdkd    && npx cdkd deploy
```

## 更新

編集したら、3 つのターミナルで同じコマンドをもう一度実行します。

- 更新体験 ①: `lambda/items.js` の `message` を書き換える（1 か所で 3 つに反映される。`cdk/` では `npx cdk deploy --hotswap` も試す）
- 更新体験 ②: 3 つの `lib/items-api-stack.ts` それぞれで、`GET /items/{id}` ルートのコメントを外す

## 削除

```bash
cd cdk     && npx cdk destroy
cd express && npx cdk destroy --express
cd cdkd    && npx cdkd destroy
```

## テスト

```bash
npm test
```
