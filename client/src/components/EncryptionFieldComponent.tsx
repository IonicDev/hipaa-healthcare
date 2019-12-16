/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import React, { CSSProperties } from "react";
import { EncryptionColumnModel } from "../models/EncryptionField";
import ReplyForm from "./ReplyForm";
import { observer } from "mobx-react";
import { WaitingIcon, SpinnerIcon, EditIcon } from "./Icons";

export interface IEncryptionFieldComponentProps {
    title: string;
    model: EncryptionColumnModel;
    waitingFor: string;
    style?: CSSProperties;
}

@observer
export default class EncryptionFieldComponent extends React.Component<
    IEncryptionFieldComponentProps
> {
    render() {
        return (
            <div style={{ ...this.props.style, paddingBottom: 20 }}>
                <b>{this.props.title}</b>
                <div style={{ overflow: "hidden", wordBreak: "break-all" }}>
                    {this.renderBody()}
                </div>
            </div>
        );
    }

    private renderBody = () => {
        const { state, value, send } = this.props.model;

        if (state === "Waiting") {
            return (
                <>
                    <WaitingIcon /> Waiting for {this.props.waitingFor}
                </>
            );
        }
        if (state === "Editing") {
            return <ReplyForm value={value} onFormSubmit={send} />;
        }

        if (state === "Encrypting") {
            return (
                <>
                    <SpinnerIcon /> Encrypting
                </>
            );
        }

        if (state === "Sending") {
            return (
                <>
                    <SpinnerIcon /> Sending
                </>
            );
        }

        if (state === "Decrypting") {
            return (
                <>
                    <SpinnerIcon /> Decrypting
                </>
            );
        }

        if (state === "Ready") {
            return (
                <>
                    <EditIcon />
                    {value}
                </>
            );
        }
    };
}
