import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreesInRadiusMapComponent } from './trees-in-radius-map.component';

describe('TreesInRadiusMapComponent', () => {
  let component: TreesInRadiusMapComponent;
  let fixture: ComponentFixture<TreesInRadiusMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreesInRadiusMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreesInRadiusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
