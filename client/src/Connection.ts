/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

export interface IStateResponse {
    medical_history?: string,
    office_visit_notes?: string,
    prescription?: string,
    insurer_reply?: string
}

export interface IRegisterUserParams {
    email: string;
    groupName: 'patients'|'physicians'|'insurers';
    firstName: string;
    lastName: string;
}

export type Groups = 'patients' | 'physicians' | 'insurers';

export class Connection {
    fetchState = (): Promise<IStateResponse> => {
        return fetch('/state').then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching state: ${response.status}: ${response.statusText}`);
            }
            return response.json();
        });
    }

    updateState = (data: IStateResponse) => {
        return fetch('/state', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Error updating state: ${response.status}: ${response.statusText}`);
                }
                return response.json();
            });
    }

    registerUser = (params: IRegisterUserParams): Promise<string> => {
        return fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error registering user: ${response.status}: ${response.statusText}`);
            }
            return response.json();
        }).then(({ user }) => user);
    }

    reset = () => {
        return fetch('/state', {
            method: 'DELETE'
        })
    }
}
