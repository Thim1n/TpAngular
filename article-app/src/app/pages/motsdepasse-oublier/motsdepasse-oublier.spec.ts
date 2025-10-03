import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotsdepasseOublier } from './motsdepasse-oublier';

describe('MotsdepasseOublier', () => {
  let component: MotsdepasseOublier;
  let fixture: ComponentFixture<MotsdepasseOublier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotsdepasseOublier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotsdepasseOublier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
