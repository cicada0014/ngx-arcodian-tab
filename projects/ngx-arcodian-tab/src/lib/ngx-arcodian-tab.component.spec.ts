import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxArcodianTabComponent } from './ngx-arcodian-tab.component';

describe('NgxArcodianTabComponent', () => {
  let component: NgxArcodianTabComponent;
  let fixture: ComponentFixture<NgxArcodianTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxArcodianTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxArcodianTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
