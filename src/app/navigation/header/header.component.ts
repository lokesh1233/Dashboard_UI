import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../login/auth.service';
import { BotServiceService } from 'src/app/bot-service.service';
import * as moment from 'moment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";
import { Label, Color } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { ConversationViewComponent } from './conversation-view/conversation-view.component';
import { UserViewComponent } from './user-view/user-view.component';

export interface ConversationData {
  user: any;
  conversation: any;
  date: any;
  allConvo: any;
}

export interface UsersDataTable {
  userId: any;
  name: any;
  title: any;
  location: any;
}

export interface topUsersTable {
  Number: any;
  SenderID: any;
  Events: any;
  View: any;
}

export interface topInentsTable {
  Number: any;
  Intent: any;
  Count: any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {

  AllUsers = [{ userId: "T007061", name: "Sadaf Wasai", title: "Business Development Officer", location: "Gurgaon (LOC31)" },
  { userId: "T007255", name: "Shaheen Khan", title: "Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007213", name: "Rupradha Ghosh", title: "MIS Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007331", name: "Debi Das", title: "MIS Associate", location: "Gurgaon (LOC31)" },
  { userId: "T007456", name: "Madhavi Shetty", title: "MIS Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007471", name: "Priyanka Shinde", title: "Executive", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007475", name: "Upasana Rajpal", title: "Retainer", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007514", name: "Manish Gowda", title: "MIS Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007518", name: "Anand Shankar Rai", title: "Team Leader", location: "Gurgaon (LOC31)" },
  { userId: "T007641", name: "Rajiv Tanwar", title: "Senior Business Development Officer", location: "Pune - Ghole Road (LOC82)" },
  { userId: "T007750", name: "Tanvi Patel", title: "Executive", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007821", name: "Lalit Rajput", title: "Retainer", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007984", name: "Shilpa Banerjee", title: "Process Coordinator", location: "Kolkata Biowonder (LOC109)" },
  { userId: "T008088", name: "Niti Mahajan", title: "Retainer", location: "Gurgaon (LOC31)" },
  { userId: "T008301", name: "Nilesh Matkar", title: "Office Boy", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007255", name: "Shaheen Khan", title: "Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007213", name: "Rupradha Ghosh", title: "MIS Associate", location: "Mumbai Crisil House (LOC64)" },
  { userId: "T007331", name: "Debi Das", title: "MIS Associate", location: "Gurgaon (LOC31)" },
  { userId: "T007456", name: "Madhavi Shetty", title: "MIS Associate", location: "Mumbai Crisil House (LOC64)" },
  ];

  ActiveUsers = [{ userId: "T007061", name: "Sadaf Wasai", title: "Business Development Officer", location: "Gurgaon (LOC31)" }];

  benefitAlignCount: number = 0;
  totalConvo: number = 0;
  SperidianCount: number = 0;
  conversationList = [];
  totalUsers: any;
  totalIntents: any;
  totalConversations: number = 0;
  botIntentCount: any;
  todaysevents: number = 0;
  userInentCount: any;
  todaysUsers: any;
  FirstDate: any;
  webCount: number = 0;
  locationList = [];
  appCount: number = 0;
  SecondDate: any;
  ThirdDate: any;
  FourthDate: any;
  FirstDateCount = 0;
  locationCountList = [];
  SecondDateCount = 0;
  ThirdDateCount = 0;
  CurrentDateCount = 0;
  FourthDateCount = 0;
  chartData: any;
  senderNames: any;
  FifthDate: any;
  topIntents = [];
  RecentUser = [];
  TopUser = [];
  todaysDate = new Date();
  currentDate: any;
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  top5: any;
  top5C: any;
  authSubscription: Subscription;
  intentsList = [];
  ELEMENT_DATA: topUsersTable[] = [];
  ELEMENT_DATA1: topInentsTable[] = [];
  i = 0;
  displayedColumns: string[] = ['Number', 'SenderID', 'Events', 'View'];
  dataSources: any;
  dataSources1: any;
  displayedColumns1: string[] = ['Number', 'Intent', 'Count'];
  dataSource = new MatTableDataSource<topUsersTable>(this.ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<topInentsTable>(this.ELEMENT_DATA1);

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'USER' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [{
    backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['WEB'], ['APP']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public pieChartOptions1: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels1: Label[] = [];
  public pieChartData1: number[] = [];
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartColors1 = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private spinner: NgxSpinnerService, private authService: AuthService, private botService: BotServiceService, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit() {
    // this.spinner.show();
    // this.currentDate = this.datePipe.transform(this.todaysDate, 'dd-MM-yyyy');
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    // this.getConversation();
    // this.getLastDates();
    // this.getLocationMetric();
  }

  getLastDates() {
    var date = new Date();
    var date1 = new Date();
    var date2 = new Date();
    var date3 = new Date();
    date.setDate(date.getDate() - 1);
    date1.setDate(date1.getDate() - 2);
    date2.setDate(date2.getDate() - 3);
    date3.setDate(date3.getDate() - 4);
    this.FirstDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.SecondDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
    this.ThirdDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
    this.FourthDate = date3.getFullYear() + '-' + (date3.getMonth() + 1) + '-' + date3.getDate();
    this.FirstDate = this.datePipe.transform(this.FirstDate, 'dd-MM-yyyy');
    this.SecondDate = this.datePipe.transform(this.SecondDate, 'dd-MM-yyyy');
    this.ThirdDate = this.datePipe.transform(this.ThirdDate, 'dd-MM-yyyy');
    this.FourthDate = this.datePipe.transform(this.FourthDate, 'dd-MM-yyyy');
    this.lineChartLabels.push(this.FourthDate, this.ThirdDate, this.SecondDate, this.FirstDate, this.currentDate);
  }

  getConversation() {
    this.botService.getConversation().subscribe((res) => {
      this.getTableData(res);
      this.getChartData(res);
      this.getIntentChart(res);
    });
  }

  orderByKey(a, b) {
    return a.key;
  }

  getIntentChart(data) {
    this.botIntentCount = this.userInentCount = 0;
    for (let i in data) {
      for (let j in data[i].intents) {
        if (data[i].intents[j] == "home" || data[i].intents[j] == "weather" || data[i].intents[j] == "restart") {
          this.botIntentCount++;
        }
        else {
          this.userInentCount++;
          this.topIntents.push(data[i].intents[j])
        }
      }
    }

    var occurences = [];
    for (var i = 0; i < this.topIntents.length; i++) {
      if (typeof occurences[this.topIntents[i]] == "undefined") {
        occurences[this.topIntents[i]] = 1;
      } else {
        occurences[this.topIntents[i]]++;
      }
    }

    this.topIntents = [];
    for (let i in occurences) {
      this.topIntents.push({ intent: i, count: occurences[i] })
    }

    this.topIntents.sort(function (a, b) {
      return b.count - a.count;
    });

    this.top5 = this.topIntents.slice(0, 5);
    this.ELEMENT_DATA1 = this.top5;
    this.dataSources1 = this.ELEMENT_DATA1;
    this.dataSource1 = this.dataSources1;
  }

  getTableData(data) {
    this.totalUsers = this.todaysUsers = 0;
    for (let i in data) {
      var time = moment.unix(data[i].latest_event_time).format("DD-MM-YYYY");
      data[i].dateString = time;

      if (data[i].dateString == this.currentDate) {
        this.todaysUsers++;
      }
      this.totalUsers++;
      if (this.totalUsers <= 5) {
        data[i].intentCount = data[i].intents.length;
        this.RecentUser.push(data[i]);
      }
    }
  }

  getChartData(data) {
    for (let i in data) {
      if (data[i].sender_id.includes("SP2476")) {
        this.benefitAlignCount++;
      }
      else if (data[i].sender_id.includes("SP")) {
        this.SperidianCount++;
      }
      this.botService.getSenderMessage(data[i].sender_id).subscribe((res) => {
        this.chartData = res;
        for (let l in this.chartData.events) {

          if (this.chartData.events[l].metadata.environment == undefined) {
          }
          else if (this.chartData.events[l].metadata.environment == "WEB") {
            this.webCount++;
          }
          else if (this.chartData.events[l].metadata.environment == "APP") {
            this.appCount++;
          }
          if (this.chartData.events[l].text) {
            if (this.chartData.events[l].text.indexOf('/', 0) === -1) {
              if (this.chartData.events[l].event == "user" || this.chartData.events[l].event == "bot") {
                this.totalConversations++;
                var time = moment.unix(this.chartData.events[l].timestamp).format("DD-MM-YYYY");
                this.conversationList.push({ user: this.chartData.sender_id, conversation: this.chartData.events[l].text, date: time, type: this.chartData.events[l].event })
                this.TopUser.push(this.chartData.sender_id);
              }
            }

          }


        }
        var time = moment.unix(this.chartData.events[0].timestamp).format("DD-MM-YYYY");
        data[i].dateString = time;
        if (this.FirstDate == data[i].dateString) {
          this.FirstDateCount++;
        }
        else if (this.SecondDate == data[i].dateString) {
          this.SecondDateCount++;
        }
        else if (this.currentDate == data[i].dateString) {
          this.CurrentDateCount++;
        }
        else if (this.ThirdDate == data[i].dateString) {
          this.ThirdDateCount++;
        }
        else if (this.FourthDate == data[i].dateString) {
          this.FourthDateCount++;
        }
      });
    }

    setTimeout(() => {
      this.spinner.hide();
      var occurences = [];
      for (var i = 0; i < this.TopUser.length; i++) {
        if (typeof occurences[this.TopUser[i]] == "undefined") {
          occurences[this.TopUser[i]] = 1;
        } else {
          occurences[this.TopUser[i]]++;
        }
      }

      this.TopUser = [];
      for (let i in occurences) {
        this.TopUser.push({ user: i, count: occurences[i] })
      }

      this.TopUser.sort(function (a, b) {
        return b.count - a.count;
      });

      this.top5C = this.TopUser.slice(0, 5);
      this.lineChartData.pop();
      this.lineChartColors.push({
        backgroundColor: '#0075d4',
        borderColor: '#1ca3ff',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      })
      this.lineChartData.push({ data: [this.FourthDateCount, this.ThirdDateCount, this.SecondDateCount, this.FirstDateCount, this.CurrentDateCount], label: 'USER' });
      this.ELEMENT_DATA = this.top5C;
      this.dataSources = this.ELEMENT_DATA;
      this.dataSource = this.dataSources;
      this.pieChartData.push(this.webCount);
      this.pieChartData.push(2);
      // this.pieChartData1.push(this.SperidianCount);
      // this.pieChartData1.push(this.benefitAlignCount);
      this.totalConvo = this.totalConversations;
    }, 15000);
  }

  openConversationView(data): void {
    const dialogRef = this.dialog.open(ConversationViewComponent, {
      width: '1000px',
      height: '550px',
      data: { user: data, allConvo: this.conversationList }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openUserView(): void {
    const dialogRef = this.dialog.open(UserViewComponent, {
      width: '1000px',
      height: '550px',
      data: { allUsers: this.AllUsers }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openActiveUserView(): void {
    const dialogRef = this.dialog.open(UserViewComponent, {
      width: '1000px',
      height: '550px',
      data: { allUsers: this.ActiveUsers }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
    // setTimeout(() => {
    //   this.sidenavToggle.emit();
    // }, 300);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // this.authSubscription.unsubscribe();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  getLocationMetric() {

    for (let i in this.AllUsers) {
      this.locationList.push(this.AllUsers[i].location)
    }
    var occurences = [];

    for (var i = 0; i < this.locationList.length; i++) {
      if (typeof occurences[this.locationList[i]] == "undefined") {
        occurences[this.locationList[i]] = 1;
      } else {
        occurences[this.locationList[i]]++;
      }
    }

    this.locationCountList = [];
    for (let i in occurences) {
      this.locationCountList.push({ location: i, count: occurences[i] })
      this.pieChartLabels1.push([i]);
      this.pieChartData1.push(occurences[i])
    }
  }


}
