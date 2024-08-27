import { Component } from '@angular/core';
import { DialogService } from '../../Services/dialog.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less'
})
export class NavbarComponent {

  constructor(private dialogService: DialogService) { }

  openTest() {
    this.dialogService.openTestDialog({
      type: "testDialogConfig",
      args: {
        profile: 'hi'
      }
    })
  }
}
