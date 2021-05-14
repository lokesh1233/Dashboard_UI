import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestingComponent, DialogData } from '../testing.component';
import { BotServiceService } from 'src/app/bot-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-indox',
  templateUrl: './indox.component.html',
  styleUrls: ['./indox.component.css']
})
export class IndoxComponent implements OnInit {
  answer: any;
  question: any;
  // aswerForm : FormGroup
  edit: boolean = false;
  datafromtest = []
  uid: any;
  QuestionForm : FormGroup
  constructor(public dialogRef: MatDialogRef<TestingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private botService: BotServiceService, private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    console.log("data new", data)
    this.datafromtest.push(data)
    this.bindeditData(data);
  }
  bindeditData(data) {
    debugger;
    this.answer = data.answer
    this.question = data.question
    this.uid = data.sid
    if (data.sid == null) {
      this.edit = false
    }
    else {
      this.edit = true
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.QuestionForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
     
  });

  }
  sendToTable() {
    this.dialogRef.close({ answer: this.answer, question: this.question });
    //call api here and close dialog

  }
  addQnaInbox() {
    console.log(this.QuestionForm.value);
    
    const obj = {
      "question": this.QuestionForm.value.question,
      "answer": this.QuestionForm.value.answer
    }
    // const obj = {
    //   "question": this.question,
    //   "answer": this.answer
    // }
    this.closeModel()
    console.log("obj", obj)
    debugger
    if (this.edit == true) {

      this.botService.editQna(obj, this.uid).subscribe((response: any) => {
        debugger;
        console.log("response", response)
        this.toastr.success('Succesfully Updated');
        // if(response.st)

        // })
      })
    }
    else {
      this.botService.addQnaInbox(obj).subscribe((response: any) => {
        debugger;
        console.log("response", response)
        this.toastr.success('Succesfully Added');

        // if(response.st)

        // })
      })
    }

  }
  closeModel() {
    this.dialogRef.close();
  }

}
