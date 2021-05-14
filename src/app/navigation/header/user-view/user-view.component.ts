import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersDataTable } from '../header.component';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

export interface userViewTable {
  userId: any;
  name: any;
  title: any;
  location: any;
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  ELEMENT_DATA: userViewTable[] = [];
  displayedColumns: string[] = ['userId', 'name', 'title', 'location'];
  dataSources: any;
  filteredConvo = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<UserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsersDataTable) { }


  ngOnInit() {
    this.pushToTable(this.data);
    this.dataSources = new MatTableDataSource<userViewTable>(this.ELEMENT_DATA);
  }


  pushToTable(data) {
    this.ELEMENT_DATA = data.allUsers;
    this.dataSources = this.ELEMENT_DATA;
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dataSources.paginator = this.paginator;
  }

}
