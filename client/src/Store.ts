/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import { observable, action } from "mobx";
import { Connection } from "./Connection";
import { IonicAgent } from "./models/IonicAgent";
import { DataStore } from "./models/DataStore";

export interface IStoreProps {
    store?: Store;
}

const ENROLLMENT_URL = process.env.REACT_APP_IONIC_ENROLLMENT_ENDPOINT;

export enum Device {
    Patient,
    Physician,
    Insurer
}

export class Store {
    @observable activeDevice: Device | null = null;

    connection = new Connection();

    patientSdk = new IonicAgent({
        username: "test_patient",
        password: "password123",
        enrollmentUrl: ENROLLMENT_URL,
        fetchSamlAssertion: () =>
            this.connection.registerUser({
                email: "test_patient@healthcaredemo.com",
                groupName: "patients",
                firstName: "Test",
                lastName: "Patient"
            })
    });

    physician = new IonicAgent({
        username: "test_physician",
        password: "password123",
        enrollmentUrl: ENROLLMENT_URL,
        fetchSamlAssertion: () =>
            this.connection.registerUser({
                email: "test_physician@healthcaredemo.com",
                groupName: "physicians",
                firstName: "Test",
                lastName: "Physician"
            })
    });

    insurer = new IonicAgent({
        username: "test_insurer",
        password: "password123",
        enrollmentUrl: ENROLLMENT_URL,
        fetchSamlAssertion: () =>
            this.connection.registerUser({
                email: "test_insurer@healthcaredemo.com",
                groupName: "insurers",
                firstName: "Test",
                lastName: "Insurer"
            })
    });

    patientData = new DataStore(this, this.patientSdk, Device.Patient);
    physicianData = new DataStore(this, this.physician, Device.Physician);
    insurerData = new DataStore(this, this.insurer, Device.Insurer);

    @action.bound
    setActiveDevice(device: Device) {
        this.activeDevice = device;
    }

    reset = () => {
        this.connection.reset().then(() => document.location.reload());
    };
}
