import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantTasksComponent } from './important-tasks.component';

describe('ImportantTasksComponent', () => {
  let component: ImportantTasksComponent;
  let fixture: ComponentFixture<ImportantTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportantTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportantTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
