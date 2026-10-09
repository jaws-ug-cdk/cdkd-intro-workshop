# ワークショップ用 CDK コード

同じ構成（HTTP API + Lambda + DynamoDB）を、3 つのデプロイ方法で同時にデプロイして速さを比べるためのコードです。

```
code/
├── shared/                 # 3 つのアプリで共通のスタック定義と Lambda のコード
│   ├── items-api-stack.ts
│   └── lambda/items.js
├── cdk/                    # cdk deploy            → CdkStack
├── express/                # cdk deploy --express  → CdkExpressStack
└── cdkd/                   # cdkd deploy           → CdkdStack
```

ディレクトリごとに CDK アプリが分かれているので、ターミナルを 3 つ開いて同時に実行できます。

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

編集するのは `shared/` だけです。編集したら、3 つのターミナルで同じコマンドをもう一度実行します。

- 更新体験 ①: `shared/lambda/items.js` の `message` を書き換える（`cdk/` では `npx cdk deploy --hotswap` も試す）
- 更新体験 ②: `shared/items-api-stack.ts` の `GET /items/{id}` ルートのコメントを外す

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
