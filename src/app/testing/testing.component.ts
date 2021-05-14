import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { BotServiceService } from '../bot-service.service';
import { NgContentAst } from '@angular/compiler';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteComponent } from './delete/delete.component';
import { IndoxComponent } from './indox/indox.component';
import { AddComponent } from './add/add.component';

export interface DialogData {
  sid: any;
  uid: any;
  buttonText: any;
  message: string;
  animal: string;
  name: string;
}

export interface PeriodicElement {
  question: string;
  answer: string;
  createdDate: string;
  source_type: string;
}
export interface PeriodicElement1 {
  question: string;
  answer: string;
  createdDate: string;
  source_type: string;
}
export interface PeriodicElement2 {
  model: string;
  comment: string;
  createdDate: string;
  isActive: boolean;
}


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
  providers: [DatePipe]
})
export class TestingComponent implements OnInit {
  @ViewChild('paginator2', {static : false}) paginator2: MatPaginator;
  @ViewChild('paginator1', {static : false}) paginator1: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort: MatSort;
  isLoadingData : Promise<boolean>;
  initalTable = [ ];
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['questions', 'answers', 'type', 'actions'];
  dataSource: MatTableDataSource<PeriodicElement>;
  dataSourceSelected = ""

  ELEMENT_DATA1: PeriodicElement1[] = [];
  displayedColumns1: string[] = ['questions', 'answers', 'type', 'actions'];
  dataSource1: MatTableDataSource<PeriodicElement1>;
  dataSource1Selected = ""
  
  ELEMENT_DATA2: PeriodicElement2[] = [];
  displayedColumns2: string[] = ['model', 'comment', 'actions'];
  modelSource: MatTableDataSource<PeriodicElement2>;

  animal: string;
  name: string;
  isAuth : undefined;
  isSelected: undefined;
  configYamlFile="";
  isModelTraining=false;
  defaultInboxType="type";
  defaultDataType="type";
  onToggleSidenav(){
    
  };

  applyFilter(filterValue: string) {
    filterValue = this.filterValueConcatinate(filterValue, this.defaultDataType)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  applyFilter1(filterValue: string) {
    filterValue = this.filterValueConcatinate(filterValue, this.defaultInboxType)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  applyMdlFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.modelSource.filter = filterValue;
  }
  // dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,
    private botService : BotServiceService,
    private spinner : NgxSpinnerService
    ) {
      this.getQna();
      this.getQnaInbox();
      this.getModels();
      this.getConfigFile();
     }


  getQna(){
    this.spinner.show();
    this.botService.getQna().subscribe((response : any)=>{
      console.log("-------", response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator2;
      this.spinner.hide()
      this.dataSource.filterPredicate = this.customFilterPredicate;
      //this.isLoadingData = Promise.resolve(true);
    })
  }


  getQnaInbox(){
    this.spinner.show();
    this.botService.getQnaInbox().subscribe((response : any)=>{
      console.log("-------", response);
      this.ELEMENT_DATA1 = response;
      this.dataSource1 = new MatTableDataSource(response);

      this.dataSource1.paginator = this.paginator1;
      this.spinner.hide()
      this.dataSource1.filterPredicate = this.customFilterPredicate;
      //this.isLoadingData = Promise.resolve(true);
    })
  }

  getQnaInboxWithoutSpinning(){
    this.botService.getQnaInbox().subscribe((response : any)=>{
      console.log("-------", response);
      this.ELEMENT_DATA1 = response;
      this.dataSource1 = new MatTableDataSource(response);
      this.dataSource1.paginator = this.paginator1;
      //this.isLoadingData = Promise.resolve(true);
    })
  }


  changeModelActivation(data:any){
    this.modelUpdation("put", data.value)
  }

  deleteModel(data:any){
    this.modelUpdation("delete", data.value)
  }

  trainModel(){
    this.modelUpdation("post", "", {})
  }

  getModels(){
    this.botService.updateModelData("get").subscribe((response : any)=>{
      console.log("-------", response);
      this.ELEMENT_DATA2 = response;
      this.modelSource = new MatTableDataSource(response);
      this.isModelStartedTraining(response);
    })
  }

  isModelStartedTraining(res){
    this.isModelTraining = false;
    for(let i=0;i<res.length;i++){
      if(res[i].comment != ""){
        this.isModelTraining = true;
      }else{
        res[i].comment = "Completed";
      }
    }
    
  }

  getConfigFile(){
    this.botService.getConfigFile().subscribe(data => {
      this.configYamlFile = data;
    })
  }


  modelUpdation(methodType, id="", data=undefined){
    this.spinner.show();
    this.botService.updateModelData(methodType, id, data).subscribe((response : any)=>{
      console.log("-------", response);
      this.getModels()
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
      this.getQnaInboxWithoutSpinning();
      //this.isLoadingData = Promise.resolve(true);
    })
  }

  openDialogInbox(): void {
    const dialogRef = this.dialog.open(IndoxComponent, {
      disableClose : true,
      width: '70%',
      height: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.pushToTable(result);
      this.getQnaInbox();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      disableClose : true,
      width: '70%',
      height: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.pushToTable(result);
      this.getQna();
    });
  }
  openDelDailog(data:any, isInbox:boolean){
    console.log("data", DataTransferItem)
    const dialogRef = this.dialog.open(DeleteComponent, {
      disableClose : true,
      width: '30%',
      height: '30%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
     // this.pushToTable(result)
     if(isInbox){
       this.getQnaInbox();
      }else{
        this.getQna()
      }
    });
  }

  openeditDilog(data: any, isInbox:boolean) {
    console.log("data", DataTransferItem)
    const dialogRef = this.dialog.open(AddComponent, {
      disableClose : true,
      width: '70%',
      height: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.pushToTable(result)
     if(isInbox){
      this.getQnaInbox();
     }else{
       this.getQna()
     }
    });
  }

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

  fileUploadData(eventTarget, isInbox:boolean){
    let files = eventTarget.files
    this.botService.postFileData(files.item(0), isInbox).subscribe((response : any)=>{
      console.log("-------", response);
      if(isInbox){
        this.getQnaInbox();
       }else{
         this.getQna()
       }
       eventTarget.value="";
        //this.isLoadingData = Promise.resolve(true);
    })
  }

  downloadTemplate(){
    let url = "/assets/files/questions.csv"
    window.open(url, "_blank")
  }

  changeFilter(val){
    this.defaultDataType = val;
    this.applyFilter(this.dataSource.filter);
  }

  changeFilter1(val){
    this.defaultInboxType = val;
    this.applyFilter1(this.dataSource1.filter);
  }

  filterValueConcatinate(filter, source){
    // let fil = "";
    // if(filter.indexOf("$$$$") > -1){
    //   fil = filter.split("$$$$")+"$$$$"+source;
    // }else{
    //   fil = filter + "$$$$"+source
    // }
    // return fil
    return filter.indexOf("$$$$") > -1 ? (filter.split("$$$$")[0]+"$$$$"+source) : filter + "$$$$"+source;
  }

  // filterValueSplit(filter){
  //   // let fil = "";
  //   // if(filter.indexOf("$$$$") > -1){
  //   //   fil = filter.split("$$$$")+"$$$$"+source;
  //   // }else{
  //   //   fil = filter + "$$$$"+source
  //   // }
  //   // return fil
  //   return filter.indexOf("$$$$") > -1 ? [filter.split("$$$$")[0], filter.split("$$$$")[1]] : [filter.split("$$$$")[0], "" ];
  // }

  

  customFilterPredicate(data, filter){

    let filValues = filter.indexOf("$$$$") > -1 ? [filter.split("$$$$")[0], filter.split("$$$$")[1]] : [filter.split("$$$$")[0], "" ];
    filter = filValues[0].trim().toLowerCase(); // Remove whitespace and convert to lowercase
    let source = filValues[1];

    let valFilter, sourceFilter;
    if(filter != ""){
      let srcFltr = typeof(data.source_type) == "string" ? data.source_type : ""
      valFilter = (data.question.trim().toLowerCase().indexOf(filter) != -1 || data.answer.trim().toLowerCase().indexOf(filter) != -1 || srcFltr.trim().toLowerCase().indexOf(filter) != -1)
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





    // return (|| (valFilter == true || sourceFilter == true)) ? true :false

    // if (this.sourceFilter1 != ""){
    //   let sourceFilter = this.sourceFilter1 == 'portal' ? data.source_type == 'portal' : data.source_type != 'portal';
    //   return (valFilter || sourceFilter)
    // }else{
    //   return valFilter
    // }
  }

  // customFilterPredicate(data, filter){
  //   if (this.sourceFilter != ""){
  //     let sourceFilter = this.sourceFilter == 'portal' ? data.source_type == 'portal' : data.source_type != 'portal';
  //     return (data.questions.indexOf(filter) != -1 || data.answers.indexOf(filter) != -1 || sourceFilter)
  //   }else{
  //     return (data.questions.indexOf(filter) != -1 || data.answers.indexOf(filter) != -1)
  //   }
  // }


}
