import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  @Output() sidenavToggle = new EventEmitter<void>();

  isQnaBuilder = true;
  isEmployee = false;
  // isHome = true;

  ngOnInit() {
  }

  onRouteScreenContent(screen){
    if("isQnaBuilder" == screen){
      this.isQnaBuilder = true
      this.isEmployee = false
    }else if("isEmployee" == screen){
      this.isQnaBuilder = false
      this.isEmployee = true
    }
    this.sidenavToggle.emit()
  }
}
