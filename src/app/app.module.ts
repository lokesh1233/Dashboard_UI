import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './login/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConversationViewComponent } from './navigation/header/conversation-view/conversation-view.component';
import { UserViewComponent } from './navigation/header/user-view/user-view.component';
import { TestingComponent } from './testing/testing.component';
import { AddComponent } from './testing/add/add.component';
import { EmpAddComponent } from './employee/add/add.component';
import { MatSortModule } from '@angular/material';
import { DeleteComponent } from './testing/delete/delete.component';
import { IndoxComponent } from './testing/indox/indox.component';
import { EmployeeComponent } from './employee/employee.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ConversationViewComponent,
    UserViewComponent,
    TestingComponent,
    AddComponent,
    DeleteComponent,
    IndoxComponent,
    EmployeeComponent,
    EmpAddComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, NgxSpinnerModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatTableModule, ChartsModule, MatDialogModule,
     MatPaginatorModule,
     MatSortModule,
     ToastrModule.forRoot()
     
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ConversationViewComponent,UserViewComponent,AddComponent,DeleteComponent,IndoxComponent, EmpAddComponent]
})
export class AppModule { }
