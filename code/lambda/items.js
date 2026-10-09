const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  if (event.requestContext.http.method === 'POST') {
    // HTTP API は Content-Type によってボディを Base64 で渡してくる
    const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
    const body = JSON.parse(raw ?? '{}');
    const item = { id: randomUUID(), name: body.name ?? 'no name', createdAt: new Date().toISOString() };
    await client.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    return { statusCode: 201, body: JSON.stringify(item) };
  }

  // GET /items/{id}（ルートは更新体験 ② で追加する）
  const id = event.pathParameters?.id;
  if (id) {
    const { Item } = await client.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return Item ? { statusCode: 200, body: JSON.stringify(Item) } : { statusCode: 404, body: JSON.stringify({ message: 'not found' }) };
  }

  const { Items } = await client.send(new ScanCommand({ TableName: TABLE_NAME }));
  // [更新体験 ①] message の文字列を好きなものに書き換える
  const message = 'Hello from items API';
  return { statusCode: 200, body: JSON.stringify({ message, items: Items }) };
};
