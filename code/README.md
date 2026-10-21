# ワークショップ用 CDK コード

同じ構成（HTTP API + Lambda + DynamoDB）を、3 つのデプロイ方法で同時にデプロイして速さを比べるためのコードです。

```
code/
├── cdk.json
├── bin/app.ts              # CdkStack / CdkExpressStack / CdkdStack を作る
├── lib/items-api-stack.ts  # 3 つのスタックで共通のスタックの中身
└── lambda/items.js         # 3 つのスタックで共通の Lambda のコード
```

1 つの CDK アプリに、同じ中身のスタックを 3 つの名前で作っています。
コマンドごとにスタック名と `--output`（synth の出力先）を分けているので、ターミナルを 3 つ開いて同時に実行できます。
`--output` を分けないと、同じ `cdk.out` を取り合って `Another CLI ... is currently synthing to cdk.out` というエラーになります。

## 準備

```bash
npm ci
npm i -g @go-to-k/cdkd@0.301.15
export AWS_PROFILE=<プロファイル名>
```

## デプロイ

```bash
npx cdk deploy CdkStack --output cdk.out/cdk --yes
npx cdk deploy CdkExpressStack --express --output cdk.out/express --yes
cdkd deploy CdkdStack --output cdk.out/cdkd --yes
```

## 更新

編集したら、3 つのターミナルで同じコマンドをもう一度実行します。

- 更新体験 ①: `lambda/items.js` の `message` を書き換える（`CdkStack` では `npx cdk deploy CdkStack --hotswap --output cdk.out/cdk --yes` も試す）
- 更新体験 ②: `lib/items-api-stack.ts` で、`GET /items/{id}` ルートのコメントを外す

## 削除

```bash
npx cdk destroy CdkStack --output cdk.out/cdk --yes
npx cdk destroy CdkExpressStack --express --output cdk.out/express --yes
cdkd destroy CdkdStack --output cdk.out/cdkd --yes
```

## テスト

```bash
npm test
```
