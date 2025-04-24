import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelledComponentComponent } from './labelled-component.component';

describe('LabelledComponentComponent', () => {
  let component: LabelledComponentComponent;
  let fixture: ComponentFixture<LabelledComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LabelledComponentComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelledComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
