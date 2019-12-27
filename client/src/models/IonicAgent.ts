/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import { Mutex } from 'async-mutex';
import { ISAgent, IProfileInfo } from 'ionic-js-sdk';
import { openCenteredPopup } from '../utils';

export interface IonicAgentParams {
    userId: string;
    userAuth: string;
    enrollmentUrl: string;
}

export type DataClassification = 'Medical History'|'Office Visit Notes'|'Prescription Order'|'Insurance Reply';

const ActiveProfileMutex = new Mutex();

export class IonicAgent {
    profileInfo: IProfileInfo;
    sdk: ISAgent;

    constructor({ userId, userAuth, enrollmentUrl }: IonicAgentParams) {
        this.profileInfo = {
            appId: 'healthcare-demo',
            userId,
            userAuth,
            enrollmentUrl
        };
        this.sdk = new ISAgent(`${process.env.REACT_APP_IONIC_API_BASE_URL}/jssdk/latest/`);
    }

    private loadUser(): Promise<void> {
        return this.sdk.loadUser(this.profileInfo)
        .then(response => {
            console.log('load user responce', response)
            this.profileInfo.deviceId = response.profiles[0].deviceId;
        })
    }

    // This method is necessary because we have 3 different users with
    // 3 different profiles on the same page and Ionic JS SDK's methods,
    // like encryptStringChunkCipher, assume a single "active" profile.
    // When one user enters the data, for example, Patient entering
    // "Medical History", the other two - Physician and Insurer in this case -
    // try to decrypt it at the same time. This helper method ensures that
    // they do so "in turns" with their appropriate profile being active.
    private runWithActiveProfile = (fn: any) => (...args: any[]) => {
        return ActiveProfileMutex.acquire()
        .then(release => {
            return this.sdk.setActiveProfile(this.profileInfo)
            .then((res) => {
                console.log('set active profile', res)
                return fn(...args)
            })
            .then(
                result => {
                    release();
                    return result;
                },
                error => {
                    release();
                    throw error;
                }
            );
        });
    }

    loadProfile() {
        return this.loadUser()
            .catch(err => {
                if (
                    err &&
                    err.sdkResponseCode &&
                    (err.sdkResponseCode === 40022 || err.sdkResponseCode === 40002)
                ) {
                    // No SEP exists for the current user
                    return Promise.reject(err);
                } else {
                    console.error('Unexpected error loading user %o', err);
                    return Promise.reject(err);
                }
            });
    }

    register() {
        return this.sdk.enrollUser(this.profileInfo)
            .then((res) => {
                openCenteredPopup(res.redirect, 'Ionic Client Device Enrollment', 400, 600);
                return res.notifier;
            })
            .then(() => {
                console.log('enroll success');
                return this.loadUser()
            }).catch(err => {
                console.error('enroll error', err);
                return this.loadUser()

            })
    }

    encryptText = this.runWithActiveProfile((plaintext: string, classification: DataClassification) => {
        return this.sdk.encryptStringChunkCipher({
            stringData: plaintext,
            cipher: 'v2',
            mutableAttributes: {
                classification: [classification]
            }
        })
        .then(res => res.stringChunk);
    })

    decryptText = this.runWithActiveProfile((ciphertext: string) => {
        return this.sdk.decryptStringChunkCipher({stringData: ciphertext})
        .then(res => res.stringChunk);
    });
}
