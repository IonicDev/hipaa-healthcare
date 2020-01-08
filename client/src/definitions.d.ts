/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

declare module 'ionic-js-sdk' {
    export interface IProfileInfo {
        appId: string;
        userId: string;
        userAuth: string;
        enrollmentUrl: string;
        deviceId?: string;
    }

    export interface ISdkResponse {
        sdkResponseCode: number;
        redirect: string;
        notifier: Promise<void>;
    }

    export interface IChunkCipherInput {
        stringData: string;
        cipher?: 'v1'|'v2';
        attributes?: { [key: string]: string };
        mutableAttributes?: { [key: string]: string|string[] };
    }

    export interface IChunkCipherOutput {
        stringChunk: string;
    }

    export class ISAgent {
        constructor(sourceUrl?: string);
        enrollUser(profileInfo: IProfileInfo): Promise<ISdkResponse>;
        enrollUserWithSamlAssertion(profileInfo: IProfileInfoWithSamlAssertion): Promise<ISdkResponse>;
        loadUser(profileInfo: IProfileInfo): Promise<ISdkResponse & { profiles: ({ deviceId: string})[] }>;
        createDevice(ionicAssertion: object): Promise<ISdkResponse>;
        encryptStringChunkCipher(input: IChunkCipherInput): Promise<IChunkCipherOutput>;
        decryptStringChunkCipher(input: IChunkCipherInput): Promise<IChunkCipherOutput>;
        setActiveProfile(profileInfo): Promise<ISdkResponse>;
    }
}
