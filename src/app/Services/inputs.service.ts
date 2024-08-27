import { Injectable } from '@angular/core';
import { IDynamicInput } from '../Interfaces/dynamicInput.model';
import { ConfirmedValidator } from '../Validators/ConfirmedValidator';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputsService {

  constructor(private formBuilder: UntypedFormBuilder) { }

  getDynamicForm(functionName: any, ...args: any) {
    const func = (this as any)[functionName] as Function;
    if (typeof func === 'function') {
        return func.apply(this, args);
    } else {
        console.error(`Function ${functionName} not found`);
        return null;
    }
  }

  private testDialogConfig(args): IDynamicInput {
    const reqex = "^[0-9]{4}$";
    return {
      dialogConfig: {
        confirm: "gen_save",
        cancel: "gen_cancel",
        icon: 'fas fa-info-circle pb-3',
        title: 'ma_edit_changeParentalPin',
        message: 'gen_profile_pin_allow'
    },
    fields: [{
      id: "adminPassword",
      type: "password",
      showPwd: true,
      label: "ma_edit_adminPassword",
      placeholder: "ma_edit_adminPassword",
      errors: [{
          id: "required",
          label: "ma_edit_required_error"
      }]
  }, {
      id: "newPin",
      type: "password",
      showPwd: true,
      label: "ma_edit_new_parental_pin",
      placeholder: "ma_edit_new_parental_pin",
      errors: [{
          id: "required",
          label: "ma_edit_required_error"
      }, {
          id: "pattern",
          label: "gen_pin_length"
      }, {
          id: "confirmedValidator",
          label: "error_same_password"
      }]
  }, {
      id: "confirmPin",
      type: "password",
      showPwd: true,
      label: "ma_edit_confirm_parental_pin",
      placeholder: "ma_edit_confirm_parental_pin",
      errors: [{
          id: "required",
          label: "ma_edit_required_error"
      }, {
          id: "pattern",
          label: "gen_pin_length"
      }, {
          id: "confirmedValidator",
          label: "error_same_password"
      }]
    }],
    form: this.formBuilder.group({
      adminPassword: ['', [Validators.required]],
      newPin: ['', [Validators.required, Validators.pattern(reqex)]],
      confirmPin: ['', [Validators.required, Validators.pattern(reqex)]]
  }, {
      validator: ConfirmedValidator('newPin', 'confirmPin')
  })
    }
  }
}
