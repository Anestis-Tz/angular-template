import { Injectable } from '@angular/core';
import { DynamicDialogComponent } from '../Components/Dialogs/dynamic-dialog/dynamic-dialog.component';
import { IDynamicDialogParams } from '../Interfaces/dynamicInput.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDynamicDialog(data: IDynamicDialogParams) {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      data: data,
      autoFocus: false,
      panelClass: "generic-dialog",
    });
    return dialogRef.afterClosed();
  }

  openTestDialog(data) {
    return this.openDynamicDialog({
      type: "testDialogConfig",
      args: {
        dialogConfig: data,
        options: data.options
      }
    });
  }
}
