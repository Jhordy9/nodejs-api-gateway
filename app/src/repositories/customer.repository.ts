import {
  ConditionalCheckFailedException,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Customer } from './customer.interface';

export class CustomerRepository {
  private tableName: string;
  private dynamoDbClient: DynamoDBDocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.dynamoDbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: process.env.AWS_REGION })
    );
  }

  async setCustomer(customer: Customer): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Item: customer,
      };
      await this.dynamoDbClient.send(new PutCommand(params));
    } catch (err) {
      throw err;
    }
  }

  async getCustomer(id: string): Promise<Customer | null> {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
      };

      const result = await this.dynamoDbClient.send(new GetCommand(params));
      return result.Item ? (result.Item as Customer) : null;
    } catch (err) {
      throw err;
    }
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<void> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    for (const [key, value] of Object.entries(updates)) {
      const attributeKey = `#${key}`;
      const valueKey = `:${key}`;
      updateExpressions.push(`${attributeKey} = ${valueKey}`);
      expressionAttributeValues[valueKey] = value;
      expressionAttributeNames[attributeKey] = key;
    }

    expressionAttributeValues[':id'] = id;

    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    };

    try {
      await this.dynamoDbClient.send(new UpdateCommand(params));
    } catch (err) {
      if (
        err instanceof ConditionalCheckFailedException &&
        err.name === 'ConditionalCheckFailedException'
      ) {
        throw new Error(`Customer with ID ${id} does not exist.`);
      }
      throw err;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
      };
      await this.dynamoDbClient.send(new DeleteCommand(params));
    } catch (err) {
      throw err;
    }
  }
}
