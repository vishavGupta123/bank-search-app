import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteBanksComponent } from './favourite-banks.component';

describe('FavouriteBanksComponent', () => {
  let component: FavouriteBanksComponent;
  let fixture: ComponentFixture<FavouriteBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteBanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
