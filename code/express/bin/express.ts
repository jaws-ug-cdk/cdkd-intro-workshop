#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ItemsApiStack } from '../lib/items-api-stack';

// `cdk deploy --express` でデプロイするアプリ
const app = new cdk.App();
new ItemsApiStack(app, 'CdkExpressStack');
