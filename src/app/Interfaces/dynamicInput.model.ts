import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

export interface IDynamicInputErrors {
    id: string,
    label: string
}

export interface IDynamicInputFields {
    id: string,
    type: string,
    showPwd?: boolean,
    label: string,
    placeholder: string,
    errors?: IDynamicInputErrors[]
}

export interface IDynamicOptions {
    id: string,
    title: string,
    checked?: boolean,
    icon?: string
}

export interface IDynamicInputDialogConfig {
    confirm?: string,
    cancel?: string,
    icon?: string,
    avatar?: string,
    title?: string,
    message?: string,
    extraMessage?: string
}

export interface IDynamicInput {
    dialogConfig: IDynamicInputDialogConfig,
    options?: IDynamicOptions[],
    fields?: IDynamicInputFields[],
    form?: UntypedFormGroup
}

export interface IDynamicDialogParams {
    type: string,
    args?: {
        toggle?: {
            value: boolean,
            label: string
        },
        profile?: any,
        adminPassword?: any,
        newPin?: any,
        confirmPin?: any,
        options?: IDynamicOptions[],
        dialogConfig?: IDynamicInputDialogConfig
    }
}

export interface FormField {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    showPwd?: boolean;
    errors?: { id: string; label: string }[];
  }