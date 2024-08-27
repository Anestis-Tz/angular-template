import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField, IDynamicOptions, IDynamicDialogParams } from '../../../Interfaces/dynamicInput.model';
import { InputsService } from '../../../Services/inputs.service';
import { SharedModule } from '../../../Modules/shared.module';
import { FormsModule } from '../../../Modules/forms.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [SharedModule, FormsModule, MatSlideToggleModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.less'
})
export class DynamicDialogComponent {
  dialogConfig: any;
  formGroup!: UntypedFormGroup;
  formFields!: FormField[];
  options!: IDynamicOptions[];
  selectedOption!: IDynamicOptions | null;

  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: UntypedFormBuilder, private inputsService: InputsService) {
    this.setupDialog();
  }

  setupDialog() {
    const configs = this.inputsService.getDynamicForm(this.data.type, this.data.args);
    console.log(configs);
    this.dialogConfig = configs?.dialogConfig;
    this.formGroup = configs?.form;
    this.formFields = configs?.fields;
    this.options = configs?.options;

    if (this.options?.length) {
      this.selectedOption = this.options.find((option: IDynamicOptions) => option?.checked) || null;
    }
  }

  // Close - Cancel Dialog
  close() {
    this.dialogRef.close();
  }

  /** Close / Confirm dialog */
  confirm() {
    let response: any = {};
  
    // Setup the form group response
    this.formFields?.map((obj: any) => {
      response[obj.id] = this.formGroup?.controls[obj?.id].value;
    });
  
    // If the dialog has toggle return the current value
    if (this.data?.args?.toggle) {
      response["toggle"] = this.data?.args?.toggle.value;
    }
  
    if (this.selectedOption) {
      response["selectedOption"] = this.selectedOption;
    }
  
    // Return the values
    this.dialogRef.close(response);
  };

  /** Change toggle value */
  switchToggle(event: any) {
    this.data.args.toggle.value = event.checked;
    this.setupDialog();
  }
}
