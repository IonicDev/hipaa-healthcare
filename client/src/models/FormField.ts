/**
* (c) 2019 Ionic Security Inc.  All rights reserved.
* By using this code, I agree to the Privacy Policy (https://www.ionic.com/privacy-notice/),
* and the License Agreement (https://dev.ionic.com/license).
*/

import { observable, action, computed } from 'mobx';
import React from 'react';

export interface IFormField<T = string> {
    value: T;
    inputValue: T;
    defaultValue: T;
    handleChange(value: any): void;
    invalidate(error: string): void;
    submit(): void;
    clear(): void;
    reset(): void;
}

export default class FormField implements IFormField {
    @observable inputValue: string = '';
    @observable error: string | null = null;
    ref = React.createRef<any>()

	constructor(public defaultValue: string = '') {
		this.inputValue = defaultValue;
	}

	@computed
	get value() {
		return this.inputValue.trim();
    }

	@action.bound
	handleChange(value: string) {
		this.inputValue = value;
	}

	@action.bound
	reset() {
		this.inputValue = this.defaultValue;
	}

	@action.bound
	submit() {
		this.defaultValue = this.value;
	}

	@action.bound
	clear() {
		this.inputValue = '';
    }

    invalidate(error: string | null) {
       this.error = error;
    }
}
