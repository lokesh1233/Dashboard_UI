import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConversationData } from '../header.component';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

export interface conversationViewTable {
  Number: any;
  Conversation: any;
  Date: any;
  type: any;
}

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.css']
})
export class ConversationViewComponent implements OnInit {
  ELEMENT_DATA: conversationViewTable[] = [];
  displayedColumns: string[] = ['Conversation', 'type', 'Date'];
  dataSources: any;
  filteredConvo = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ConversationViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConversationData) { }

  ngOnInit() {
    this.filterConvo(this.data);
    this.dataSources = new MatTableDataSource<conversationViewTable>(this.ELEMENT_DATA);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterConvo(data) {
    for (let i = 0; i < data.allConvo.length; i++) {
      if (data.allConvo[i].user == data.user) {
        this.filteredConvo.push(data.allConvo[i]);
      }
    }
    this.ELEMENT_DATA = this.filteredConvo;
    this.dataSources = this.ELEMENT_DATA;
  }

  ngAfterViewInit() {
    this.dataSources.paginator = this.paginator;
  }


}
