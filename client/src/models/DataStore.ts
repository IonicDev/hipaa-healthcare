/**
 * (c) 2019 Ionic Security Inc.  All rights reserved.
 * By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
 * and the License Agreement (https://dev.ionic.com/license).
 */

import { IonicAgent } from "./IonicAgent";
import { IStateResponse, Groups } from "../Connection";
import { observable, action, computed } from "mobx";
import { Store, Device } from "../Store";

type DeviceParameters = {
    username: string;
    password: string;
    groupName: Groups;
    firstName: string;
    lastName: string;
};

const ENROLLMENT_URL = process.env.REACT_APP_IONIC_ENROLLMENT_ENDPOINT;

export class DataStore {
    @observable email?: string;
    @observable state: IStateResponse | null = null;

    sdk = new IonicAgent({
        userId: this.deviceParams.username,
        userAuth: this.deviceParams.password,
        enrollmentUrl: ENROLLMENT_URL
    });

    @computed get isActive() {
        return this.store.activeDevice === this.device;
    }

    constructor(
        private store: Store,
        private device: Device,
        private deviceParams: DeviceParameters
    ) {}

    @action
    activate = (email: string) => {
        this.state = null;

        return this.store.connection
            .registerUser({
                email,
                groupName: this.deviceParams.groupName,
                firstName: this.deviceParams.firstName,
                lastName: this.deviceParams.lastName
            })
            .then(() =>
                Promise.all([
                    this.store.connection.fetchState(),
                    this.sdk.loadProfile()
                ]).then(([state]) => (this.state = state))
            );
    };

    @action
    setActive = (email: string) => {
        this.email = email;
        this.store.setActiveDevice(this.device);
        return this.activate(email);
    };

    @action
    setEmail = (email: string) => {
        this.email = email;
    };

    @action
    sendMedicalHistory = (value: string) => {
        return this.store.connection
            .updateState({ medical_history: value })
            .then(() => {
                if (this.state) this.state.medical_history = value;
            });
    };

    @action
    sendVisitNotes = (value: string) => {
        return this.store.connection
            .updateState({ office_visit_notes: value })
            .then(() => {
                if (this.state) this.state.office_visit_notes = value;
            });
    };

    @action
    sendPrescription = (value: string) => {
        return this.store.connection
            .updateState({ prescription: value })
            .then(() => {
                if (this.state) this.state.prescription = value;
            });
    };

    @action
    sendInsurerReply = (value: string) => {
        return this.store.connection
            .updateState({ insurer_reply: value })
            .then(() => {
                if (this.state) this.state.insurer_reply = value;
            });
    };
}
