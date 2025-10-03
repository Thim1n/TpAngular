import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesArticles } from './liste-des-articles';

describe('ListeDesArticles', () => {
  let component: ListeDesArticles;
  let fixture: ComponentFixture<ListeDesArticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDesArticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesArticles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
