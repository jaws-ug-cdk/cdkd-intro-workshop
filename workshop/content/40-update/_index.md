+++
title = "更新の体験"
chapter = true
weight = 40
+++

# 更新の体験

インフラは一度作って終わりではなく、開発を進めながら何度も更新していくものです。更新のたびに待たされる時間は、開発の快適さに直結します。

この章では、性質の違う 2 種類の更新を試します。

| 更新 | 変えるもの | 比べる方法 |
|---|---|---|
| ① Lambda 関数のコードを変える | `code/lambda/items.js` | `cdk deploy --hotswap` / `cdk deploy --express` / `cdkd deploy` |
| ② API にルートを追加する | `code/*/lib/items-api-stack.ts` | `cdk deploy` / `cdk deploy --express` / `cdkd deploy` |
