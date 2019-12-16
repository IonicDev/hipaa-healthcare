 /**
 * (c) 2019 Ionic Security Inc.  All rights reserved.
 * By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
 * and the License Agreement (https://dev.ionic.com/license).
 */

const { reportError, isLocalhost } = require('./utils');
const { DynamoDB, EnvironmentCredentials } = require('aws-sdk');

function createDynamoDbTable() {
    if (!process.env.AWS_DYNAMODB_ENDPOINT) {
        throw new Error('Environment variable AWS_DYNAMODB_ENDPOINT is required but not set.');
    }

    if (!process.env.AWS_DYNAMODB_TABLE_NAME) {
        throw new Error('Environment variable AWS_DYNAMODB_TABLE_NAME is required but not set.')
    }

    const config = {
        apiVersion: '2012-08-10',
        region: 'us-east-1',
        endpoint: process.env.AWS_DYNAMODB_ENDPOINT
    };

    if (!isLocalhost(process.env.AWS_DYNAMODB_ENDPOINT)) {
        config.credentials = new EnvironmentCredentials('AWS');
    }

    const dynamoDb = new DynamoDB(config);

    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
        KeySchema: [ { AttributeName: 'key', KeyType: 'HASH' } ],
        AttributeDefinitions: [ { AttributeName: 'key', AttributeType: 'S' } ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDb.createTable(params, function(err, data) {
            if (err) {
                if (err.code && err.code === 'ResourceInUseException') {
                    console.log(`DynamoDB table "${process.env.AWS_DYNAMODB_TABLE_NAME}" already exists.`);
                    return;
                }
                return reject(err);
            }
            console.log('Created DynamoDB table. Table description JSON: ', JSON.stringify(data, null, 2));
            resolve(data);
        })
    });
}

module.exports = createDynamoDbTable;

if (require.main === module) {
    require('dotenv').config();
    createDynamoDbTable()
    .then(() => console.log('Done!'))
    .catch(reportError);
}
