import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndoxComponent } from './indox.component';

describe('IndoxComponent', () => {
  let component: IndoxComponent;
  let fixture: ComponentFixture<IndoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
