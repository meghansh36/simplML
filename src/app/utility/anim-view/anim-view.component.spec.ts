import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimViewComponent } from './anim-view.component';

describe('AnimViewComponent', () => {
  let component: AnimViewComponent;
  let fixture: ComponentFixture<AnimViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
