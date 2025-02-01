// src/app/component/search-dialog/search-dialog.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDialogComponent } from './search-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchDialogComponent,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule,
        NoopAnimationsModule, // Ajouter ceci pour gérer les animations
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
