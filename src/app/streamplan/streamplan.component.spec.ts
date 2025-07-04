import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamplanComponent } from './streamplan.component';

describe('StreamplanComponent', () => {
  let component: StreamplanComponent;
  let fixture: ComponentFixture<StreamplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
