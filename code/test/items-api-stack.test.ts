import * as cdk from 'aws-cdk-lib/core';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { ItemsApiStack as CdkStack } from '../cdk/lib/items-api-stack';
import { ItemsApiStack as ExpressStack } from '../express/lib/items-api-stack';
import { ItemsApiStack as CdkdStack } from '../cdkd/lib/items-api-stack';

const templates = {
  cdk: Template.fromStack(new CdkStack(new cdk.App(), 'TestStack')),
  express: Template.fromStack(new ExpressStack(new cdk.App(), 'TestStack')),
  cdkd: Template.fromStack(new CdkdStack(new cdk.App(), 'TestStack')),
};

test('3 つのディレクトリのスタックが同じテンプレートになる', () => {
  expect(templates.express.toJSON()).toEqual(templates.cdk.toJSON());
  expect(templates.cdkd.toJSON()).toEqual(templates.cdk.toJSON());
});

describe.each(Object.entries(templates))('%s', (_, template) => {
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
});
