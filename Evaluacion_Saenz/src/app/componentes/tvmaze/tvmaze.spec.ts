import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVMaze } from './tvmaze';

describe('TVMaze', () => {
  let component: TVMaze;
  let fixture: ComponentFixture<TVMaze>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TVMaze]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVMaze);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
