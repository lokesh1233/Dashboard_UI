import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeComponent, DialogData } from '../employee.component';
import { FormGroup, FormBuilder } from '@angular/forms'
import { BotServiceService } from 'src/app/bot-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Empadd',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class EmpAddComponent implements OnInit {

  // aswerForm : FormGroup
  edit: boolean = false;
  newData: boolean = false;
  datafromtest = []
  employeeData = {
    "empid":null,
    "bandcode":null,
    "banddescription":null,
    "businessunitname":null,
    "dateofbirth":null,
    "dateofjoining":null,
    "dateofwedding":null,
    "department":null,
    "email":null,
    "employeebandid":null,
    "employeefullname":null,
    "firstname":null,
    "gender":null,
    "lastname":null,
    "location":null,
    "middlename":null,
    "mobileno":null,
    "username":null,
    "managerid":null,
    "managername":null,
    "isactive":null}



  constructor(
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private botService: BotServiceService, private toastr: ToastrService
  ) {
    console.log("data new", data)
    this.datafromtest.push(data)
    this.bindeditData(data);
  }


  bindeditData(data) {
    // debugger;
    data['newData'] = data['newData'] == true;
    this.newData = !data['newData'];
    // if(typeof(data.dateofjoining)  == "number"){
    //   let d = new Date(data.dateofjoining*1000)
    //   data.dateofjoining =  d.getDate() +"-"+d.getMonth()  + "-" + d.getFullYear();
    // }
    // .dateofjoining
    if (data.isEdit == true) {
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.employeeData = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

  sendToTable() {
    // this.dialogRef.close({ answer: this.answer, question: this.question });
    //call api here and close dialog

  }

  addQna() {
    this.closeModel();
    let active = this.employeeData['isactive'];
    delete this.employeeData['isactive'];
    let emp = Object.assign({}, this.employeeData)
    delete emp['isEdit'];
    delete emp['newData'];
    this.employeeData['isactive'] = active;
    emp['isactive'] = active == true ? '1' : '0';
    debugger
    if(emp.employeefullname!='' && emp.empid!='' &&  emp.email !=''){
      if(this.employeeData['newData'] == true){
        console.log(emp,'employeedata');
        this.botService.addEmployee(emp).subscribe((response: any) => {
              this.handleResponse(response);
            })
      }else{
        this.botService.updateEmployee(emp).subscribe((response: any) => {
              this.handleResponse(response);
            })
      }
    }else{
      
      this.toastr.error('Please enter valid values...');
    }
    




    // if (this.edit == true) {
    //   this.botService.editQna(obj, this.uid).subscribe((response: any) => {
    //     debugger;
    //     console.log("response", response)
    //     if(response.type=='S'){
    //     this.toastr.success('Succesfully Updated');}
    //     else{
    //       this.toastr.error(response.message);
    //     }
    //     // if(response.st)
    //     // })
    //   })
    // }
    // else {
    //   this.botService.addQna(obj).subscribe((response: any) => {
    //     debugger;
    //     console.log("response", response)
    //     if(response.type=='S'){
    //     this.toastr.success('Succesfully Added');}
    //     else{
    //       this.toastr.error(response.message);
    //     }
    //     // if(response.st)
    //     // })
    //   })
    // }
  }

  handleResponse(response){
    if(response.type=='S'){
    this.toastr.success('Succesfully Updated');}
    else{
      // this.toastr.error(response.message);
      this.toastr.error('Please fill all the details...');
    }
  }

  closeModel() {

    // let data = this.employeeData;

    // if(typeof(data.dateofjoining)  == "string"){
    //   let d = new Date(data.dateofjoining)
    //   data.dateofjoining =  d.getTime()/1000;
    // }
    this.dialogRef.close();
  }
}
