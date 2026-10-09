#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ItemsApiStack } from '../shared/items-api-stack';

// `cdk deploy` でデプロイするアプリ
const app = new cdk.App();
new ItemsApiStack(app, 'CdkStack');
