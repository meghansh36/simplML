import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPalleteComponent } from './command-pallete.component';

describe('CommandPalleteComponent', () => {
  let component: CommandPalleteComponent;
  let fixture: ComponentFixture<CommandPalleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandPalleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
