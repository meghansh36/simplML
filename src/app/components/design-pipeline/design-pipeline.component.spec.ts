import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPipelineComponent } from './design-pipeline.component';

describe('DesignPipelineComponent', () => {
  let component: DesignPipelineComponent;
  let fixture: ComponentFixture<DesignPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
