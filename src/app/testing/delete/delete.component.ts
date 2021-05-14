import { Component, OnInit, Inject } from '@angular/core';
import { TestingComponent, DialogData } from '../testing.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BotServiceService } from 'src/app/bot-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Ok"
  cancelButtonText = "Cancel"
  uid: any;
  constructor(public dialogRef: MatDialogRef<TestingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private toastr: ToastrService,
    private botService: BotServiceService) {
      if (data) {
        this.message = data.message || this.message;
        this.uid=data.sid
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }

  ngOnInit() {
  }
  onConfirmClick() {
    // alert("ga")
    this.botService.delQna(this.uid).subscribe((res) => {
      debugger;
      console.log("response", res)
      if(res.type=='S'){
      this.toastr.success('Succesfully Deleted');}
      else{
        this.toastr.error(res.message);
      }
    });
  }
}
