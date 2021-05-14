import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestingComponent, DialogData } from '../testing.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BotServiceService } from 'src/app/bot-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  answer: any;
  question: any;
  // aswerForm : FormGroup
  edit: boolean = false;
  datafromtest = []
  uid: any;

  QuestionForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TestingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private botService: BotServiceService, private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
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

  addQna() {
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
        if(response.type=='S'){
        this.toastr.success('Succesfully Updated');}
        else{
          this.toastr.error(response.message);
        }
        // if(response.st)

        // })
      })
    }
    else {
      this.botService.addQna(obj).subscribe((response: any) => {
        debugger;
        console.log("response", response)
        if(response.type=='S'){
        this.toastr.success('Succesfully Added');}
        else{
          this.toastr.error(response.message);
        }

        // if(response.st)

        // })
      })
    }
  }

  closeModel() {
    this.dialogRef.close();
  }
}
