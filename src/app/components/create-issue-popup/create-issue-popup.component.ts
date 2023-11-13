import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-create-issue-popup',
  templateUrl: './create-issue-popup.component.html',
  styleUrls: ['./create-issue-popup.component.css']
})
export class CreateIssuePopupComponent {
  constructor(public dialogRef: MatDialogRef<CreateIssuePopupComponent>) {}

  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
