import * as cdk from 'aws-cdk-lib/core';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as path from 'path';

export class ItemsApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.TableV2(this, 'ItemsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      // ワークショップ後に削除できるよう、スタック削除時にテーブルも消す
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const handler = new lambda.Function(this, 'ItemsHandler', {
      runtime: lambda.Runtime.NODEJS_24_X,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      handler: 'items.handler',
      logGroup: new logs.LogGroup(this, 'ItemsHandlerLogGroup', {
        retention: logs.RetentionDays.ONE_WEEK,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(handler);

    const api = new apigwv2.HttpApi(this, 'ItemsApi');
    const integration = new HttpLambdaIntegration('ItemsIntegration', handler);
    api.addRoutes({
      path: '/items',
      methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.POST],
      integration,
    });

    // [更新体験 ②] 下の 5 行のコメントを外して GET /items/{id} を追加する
    // api.addRoutes({
    //   path: '/items/{id}',
    //   methods: [apigwv2.HttpMethod.GET],
    //   integration,
    // });

    new cdk.CfnOutput(this, 'ApiUrl', { value: api.apiEndpoint });
  }
}
