 /**
 * (c) 2019 Ionic Security Inc.  All rights reserved.
 * By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
 * and the License Agreement (https://dev.ionic.com/license).
 */

const { formatNamesList, reportError } = require('./utils');
const { APP_GROUP_NAMES } = require('./app-data');

async function createIonicGroups(client) {
    const existingGroupsResponse = await client.scim.listGroups({
        filter: {
            name: { __any: APP_GROUP_NAMES }
        },
        attributes: ['id', 'displayName']
    });

    let groups = existingGroupsResponse.Resources;
    const existingGroupNames = groups.map(group => group.displayName);
    const missingGroupNames = APP_GROUP_NAMES.filter(name => existingGroupNames.includes(name) === false);

    if (existingGroupNames.length > 0) {
        console.log(`${formatNamesList(existingGroupNames, 'Group', 'Groups')} already exist`);
    }

    if (missingGroupNames.length > 0) {
        console.log(`Creating ${formatNamesList(missingGroupNames, 'group', 'groups')}`);
        const createGroupsResponses = await Promise.all(
            missingGroupNames.map(name => client.scim.createGroup({
                schemas: [
                    client.scim.Schemas.Core,
                    client.scim.Schemas.Ionic
                ],
                displayName: name,
            }))
        );
        groups = groups.concat(createGroupsResponses);
    }

    return groups.reduce((res, group) => ({ ...res, [group.displayName.toLowerCase()]: group.id }), {});
}


module.exports = createIonicGroups;

if (require.main === module) {
    require('dotenv').config();
    const path = require('path');
    const { writeFileSync } = require('fs');
    const { IonicApiClient } = require('ionic-admin-sdk');

    const client = new IonicApiClient({
        baseUrl: process.env.IONIC_API_BASE_URL,
        tenantId: process.env.IONIC_TENANT_ID,
        auth: {
            type: 'bearer',
            secretToken: process.env.IONIC_API_AUTH_TOKEN
        }
    });

    createIonicGroups(client)
    .then((res) => {
        const json = JSON.stringify(res, null, 2);
        writeFileSync(path.join(__dirname, '..', 'server', 'data', 'groups.json'), json);
        console.log(
            'Done! The following was written to server/data/groups.json: %s',
            json
        );
    })
    .catch(reportError);
}
