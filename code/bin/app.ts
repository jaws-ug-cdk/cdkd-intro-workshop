#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ItemsApiStack } from '../lib/items-api-stack';

// 同じスタックを 3 つの名前で作り、デプロイの方法ごとに 1 つずつデプロイする
const app = new cdk.App();
new ItemsApiStack(app, 'CdkStack'); //        npx cdk deploy CdkStack --output cdk.out/cdk
new ItemsApiStack(app, 'CdkExpressStack'); // npx cdk deploy CdkExpressStack --express --output cdk.out/express
new ItemsApiStack(app, 'CdkdStack'); //       cdkd deploy CdkdStack --output cdk.out/cdkd
