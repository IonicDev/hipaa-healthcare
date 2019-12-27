/**
 * (c) 2019 Ionic Security Inc.  All rights reserved.
 * By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
 * and the License Agreement (https://dev.ionic.com/license).
 */

import React from "react";
import { DataStore } from "../models/DataStore";
import { observer } from "mobx-react";
import { Button } from "react-bootstrap";
import { IPatientDeviceProps } from "../PatientDevice";
import { Store, Device } from "../Store";
import ReplyForm from "./ReplyForm";

export interface IDataProviderProps {
    store: Store;
    model: DataStore;
}

export function WithDataProvider(
    Component: React.ComponentType<IPatientDeviceProps>,
    device: Device
) {
    class DataProvider extends React.Component<IDataProviderProps> {
        renderBody() {
            const deviceModel = this.props.model;
            if (!deviceModel.isActive) {
                return (
                    <Button size="lg" onClick={deviceModel.startUsingDevice}>
                        Activate
                    </Button>
                );
            }

            if (deviceModel.isAuthenticating) {
                return (
                    <p>
                        Authenticate as <b>{deviceModel.email}</b> in Ionic Auth
                        popup. If popup doesn't shown{" "}
                        <a href={deviceModel.authUrl} target="_blank">
                            you can authenticate here
                        </a>
                    </p>
                );
            }

            if (
                !deviceModel.hasUser &&
                !deviceModel.isAuthenticating &&
                !deviceModel.state
            ) {
                return (
                    <ReplyForm
                        value={deviceModel.email}
                        onFormSubmit={deviceModel.registerDevice}
                    >
                        <p>
                            Enter valid {device} email. (You can use service
                            like{" "}
                            <a
                                href="https://www.mailinator.com/"
                                target="_blank"
                            >
                                Mailinator
                            </a>
                            ).
                        </p>
                        <p>Emails should be different.</p>
                        <p>
                            We create user with that email on backend, assign it
                            to {device} group. You need to authenticate this
                            user in Ionic Auth.
                        </p>
                    </ReplyForm>
                );
            }

            if (deviceModel.state) {
                return (
                    <Component data={deviceModel.state} model={deviceModel} />
                );
            }

            return "Loading profile and data";
        }
        render() {
            return (
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {this.renderBody()}
                </div>
            );
        }
    }

    return observer(DataProvider);
}
