#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ItemsApiStack } from '../shared/items-api-stack';

// `cdkd deploy` でデプロイするアプリ
const app = new cdk.App();
new ItemsApiStack(app, 'CdkdStack');
