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
import { Store } from "../Store";
import ReplyForm from './ReplyForm';

export interface IDataProviderProps {
    store: Store;
    model: DataStore;
}

export function WithDataProvider(Component: React.ComponentType<IPatientDeviceProps>) {
    class DataProvider extends React.Component<IDataProviderProps> {
        renderBody() {
            if (!this.props.model.isActive) {
                return (
                    <ReplyForm value={this.props.model.email} onFormSubmit={this.props.model.setActive} />
                );
            } else if (!this.props.model.state) {
                return "Loading profile and data";
            } else if (this.props.model.state) {
                return <Component data={this.props.model.state} model={this.props.model} />;
            }
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
