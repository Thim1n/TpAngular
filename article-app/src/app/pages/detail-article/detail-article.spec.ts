import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAtricles } from './detail-article';

describe('DetailAtricles', () => {
  let component: DetailAtricles;
  let fixture: ComponentFixture<DetailAtricles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAtricles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAtricles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
