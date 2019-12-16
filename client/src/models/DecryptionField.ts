/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import { observable, action } from "mobx";
import { IonicAgent } from "./IonicAgent";

export class DecryptionFieldModel {
    @observable state: "Waiting" | "Decrypting" | "Ready" | "Unable To Decrypt" = "Waiting";
    @observable value?: string;

    constructor(private sdk: IonicAgent, data?: string) {
        if (data) this.decrypt(data);
    }

    @action
    decrypt(encryptedMessage: string) {
        this.state = "Decrypting";
        this.sdk.decryptText(encryptedMessage).then(message => {
            this.state = "Ready";
            this.value = message;
        }).catch((e) => {
            console.log(e)
            this.state = "Unable To Decrypt";
        });
    }

}
