import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { BotServiceService } from '../bot-service.service';
import { NgContentAst } from '@angular/compiler';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpAddComponent } from './add/add.component';

export interface DialogData {
  sid: any;
  uid: any;
  buttonText: any;
  message: string;
  animal: string;
  name: string;
}

export interface PeriodicElement {
  defaultFullName: string;
  userId: string;
  email: string;
  location: string;
  department: string;
}



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {
  @ViewChild('paginator', {static : false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort: MatSort;
  isLoadingData : Promise<boolean>;
  initalTable = [ ];
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['defaultFullName', 'userId', 'email', 'location', 'actions'];
  dataSource: MatTableDataSource<PeriodicElement>;
  dataSourceSelected = ""


  isAuth : undefined;
  isSelected: undefined;
  defaultDataType="type";
  onToggleSidenav(){
    
  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyMdlFilter(filterValue: string){
    // modelSource = 
  }
  // dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,
    private botService : BotServiceService,
    private spinner : NgxSpinnerService
    ) {
      // this.getQna();
      this.getEmpDetails();
      // this.getModels();
      // this.getConfigFile();
     }





  getEmpDetails(){
    this.spinner.show();
    this.botService.getEmpDetails().subscribe((response : any)=>{
      console.log("-------", response);
      response = this.preprocessResponseData(response)
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide()
      // this.dataSource.filterPredicate = this.customFilterPredicate;
      //this.isLoadingData = Promise.resolve(true);
    })
  }

  preprocessResponseData(res){
    var i = 0, len = res.length;
    while (i < len) {
        // your code
        res[i].isactive = res[i].isactive == "1";
        ++i;
    }
    return res;
  }

  changeModelActivation(data:any){
    this.modelUpdation("put", data.value)
  }

  openewDilaog(){
    this.openeditDilog({"newData":true}, true);
  }

   openeditDilog(data: any, isEdit:boolean) {
    data.isEdit = !isEdit;
    const dialogRef = this.dialog.open(EmpAddComponent, {
      disableClose : true,
      width: '70%',
      height: '90%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.pushToTable(result)
    //  this.getEmpDetails();
    });
  }

  changActivation(ele){
    let obj = {
      "empid":ele.empid,
      "isactive":ele.isactive == true ? "1":"0"
    }
    this.botService.updateEmployee(obj).subscribe((response : any)=>{
      console.log("-------", response);
    })
  }

  deleteModel(data:any){
    this.modelUpdation("delete", data.value)
  }

  modelUpdation(methodType, id="", data=undefined){
    this.spinner.show();
    this.botService.updateModelData(methodType, id, data).subscribe((response : any)=>{
      console.log("-------", response);
      // this.getModels()
      this.spinner.hide();
    })
  }

  ngOnInit() {
    // this.dataSource1.filterPredicate = (data, filter) =>  (data.questions.indexOf(filter) != -1 || data.answers.indexOf(filter) != -1 || data.source_type == this.sourceFilter1 );
    //this.ELEMENT_DATA = this.initalTable;
    //this.dataSource = new MatTableDataSource(this.initalTable);
  }

  saveToData(data){
    const obj = {
      "question": data.question,
      "answer": data.answer
    }
    this.botService.editQna(obj,data.sid).subscribe((response : any)=>{
      console.log("-------", response);
      // this.getQnaInboxWithoutSpinning();
      //this.isLoadingData = Promise.resolve(true);
    })
  }

  // openDialogInbox(): void {
  //   const dialogRef = this.dialog.open(IndoxComponent, {
  //     disableClose : true,
  //     width: '70%',
  //     height: '50%',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // this.pushToTable(result);
  //     // this.getQnaInbox();
  //   });
  // }
 
  // openDelDailog(data:any, isInbox:boolean){
  //   console.log("data", DataTransferItem)
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     disableClose : true,
  //     width: '30%',
  //     height: '30%',
  //     data: data
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //    // this.pushToTable(result)
    
  //      this.getEmpDetails();
      
  //   });
  // }

  // openeditDilog(data: any, isInbox:boolean) {
  //   console.log("data", DataTransferItem)
  //   const dialogRef = this.dialog.open(AddComponent, {
  //     disableClose : true,
  //     width: '70%',
  //     height: '50%',
  //     data: data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //    // this.pushToTable(result)
  //    this.getEmpDetails();
  //   });
  // }

  pushToTable(data) {
    // this.initalTable.push({ questions: data.question, answers: data.answer, createdDate: formatDate(new Date(), 'yyyy-MM-dd', 'en') })
    this.initalTable.splice(0, 0, { question: data.question, answer: data.answer, createdDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), source_type:"portal" })
    this.ELEMENT_DATA = null;
    this.ELEMENT_DATA = this.initalTable;
    this.dataSource = new MatTableDataSource(this.initalTable);
  }

  // fileUploadInbox(eventTarget){

  //   let files = eventTarget.files

  //   this.botService.postFileInbox(files.item(0)).subscribe((response : any)=>{
  //     console.log("-------", response);
  //     this.getQnaInbox();
  //     eventTarget.value="";
  //     //this.isLoadingData = Promise.resolve(true);
  //   })
  // }

  fileEmpUploadData(eventTarget){
    let files = eventTarget.files
    this.botService.postEmpFileData(files.item(0)).subscribe((response : any)=>{
      console.log("-------", response);
       eventTarget.value="";
    })
  }

  downloadTemplate(){
    let url = "/assets/files/Employees.csv"
    window.open(url, "_blank")
  }

  changeFilter(val){
    this.defaultDataType = val;
    this.applyFilter(this.dataSource.filter);
  }

  

  filterValueConcatinate(filter, source){
    return filter.indexOf("$$$$") > -1 ? (filter.split("$$$$")[0]+"$$$$"+source) : filter + "$$$$"+source;
  }


  

  customFilterPredicate(data, filter){

    let filValues = filter.indexOf("$$$$") > -1 ? [filter.split("$$$$")[0], filter.split("$$$$")[1]] : [filter.split("$$$$")[0], "" ];
    filter = filValues[0].trim().toLowerCase(); // Remove whitespace and convert to lowercase
    let source = filValues[1];

    let valFilter, sourceFilter;
    if(filter != ""){
      valFilter = (data.question.trim().toLowerCase().indexOf(filter) != -1 || data.answer.trim().toLowerCase().indexOf(filter) != -1 || data.source_type.trim().toLowerCase().indexOf(filter) != -1)
    }
    if (source != "" && source != 'type'){
      sourceFilter = source == 'portal' ? data.source_type == 'portal' : data.source_type != 'portal';
    }

    if(valFilter == undefined && sourceFilter == undefined){
      return true;
    }else if(valFilter == undefined && sourceFilter == true){
      return true;
    }else if(valFilter == true && sourceFilter == undefined){
      return true;
    }else if(valFilter == true && sourceFilter == true){
      return true;
    }else{
      return false;
    }
  }

}
