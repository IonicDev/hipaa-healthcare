/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import React from "react";
import { FaCloudDownloadAlt, FaLock, FaUserClock, FaUserEdit } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

export function DemoIcon(WrappedComponent: React.ComponentType<any>) {
  return function (props: any) {
      return <WrappedComponent style={{ float: "left", marginRight: '5px' }} size="24px" {...props} />
  }
}

export const SpinnerIcon: React.FC = () => (
    <Spinner style={{ width: '22px', height: '22px', marginRight: '5px' }} animation="border" />
);
export const CloudDownload = DemoIcon(FaCloudDownloadAlt);
export const Lock = DemoIcon(FaLock);
export const WaitingIcon = DemoIcon(FaUserClock);
export const EditIcon = DemoIcon(FaUserEdit);

