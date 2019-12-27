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

export enum Device {
    Patient = 'patient',
    Physician = 'physician',
    Insurer = 'insurer'
}

export class Store {
    @observable activeDevice: Device | null = null;

    connection = new Connection();

    patientData = new DataStore(this, Device.Patient, {
        username: "test_patient",
        password: "password123",
        firstName: "Test",
        groupName: "patients",
        lastName: "Patient"
    });
    physicianData = new DataStore(this, Device.Physician, {
        username: "test_physician",
        password: "password123",
        groupName: "physicians",
        firstName: "Test",
        lastName: "Physician"
    });

    insurerData = new DataStore(this, Device.Insurer, {
        username: "test_insurer",
        password: "password123",
        groupName: "insurers",
        firstName: "Test",
        lastName: "Insurer"
    });

    @action.bound
    setActiveDevice(device: Device) {
        this.activeDevice = device;
    }

    reset = () => {
        localStorage.clear();
        this.connection.reset().then(() => document.location.reload());
    };
}
