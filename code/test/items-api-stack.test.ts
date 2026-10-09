import * as cdk from 'aws-cdk-lib/core';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { ItemsApiStack } from '../shared/items-api-stack';

const template = Template.fromStack(new ItemsApiStack(new cdk.App(), 'TestStack'));

test('HTTP API に GET /items と POST /items がある', () => {
  template.resourceCountIs('AWS::ApiGatewayV2::Api', 1);
  template.hasResourceProperties('AWS::ApiGatewayV2::Route', { RouteKey: 'GET /items' });
  template.hasResourceProperties('AWS::ApiGatewayV2::Route', { RouteKey: 'POST /items' });
});

test('Lambda にテーブル名が環境変数で渡る', () => {
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs24.x',
    Handler: 'items.handler',
    Environment: { Variables: { TABLE_NAME: Match.anyValue() } },
  });
});

test('スタック削除でテーブルと LogGroup も消える', () => {
  template.hasResource('AWS::DynamoDB::GlobalTable', { DeletionPolicy: 'Delete' });
  template.hasResource('AWS::Logs::LogGroup', { DeletionPolicy: 'Delete' });
});

test('同時にデプロイしても衝突しないよう物理名を固定しない', () => {
  template.hasResourceProperties('AWS::DynamoDB::GlobalTable', { TableName: Match.absent() });
  template.hasResourceProperties('AWS::Lambda::Function', { FunctionName: Match.absent() });
});
