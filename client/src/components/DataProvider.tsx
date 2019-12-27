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
                        Authenticate as <b>{deviceModel.email}</b> in the Ionic
                        Auth popup. If the popup doesn't show, you can
                        <a href={deviceModel.authUrl} target="_blank">
                            authenticate here
                        </a>
                        .
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
                            Enter valid e-mail for a {device}. (You can use
                            services like
                            <a
                                href="https://www.mailinator.com/"
                                target="_blank"
                            >
                                Mailinator
                            </a>
                            ).
                        </p>
                        <p>Each device should have a different e-mail.</p>
                        <p>
                            On the backend, we create a user with this e-mail
                            address and assign it to the {device} group. You'll
                            need to enter this e-mail later in the Ionic Auth to
                            authenticate this user.
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
