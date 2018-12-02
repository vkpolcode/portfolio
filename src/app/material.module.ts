import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatExpansionModule,
  MatFormFieldModule, MatSnackBarModule, MatDialogModule, MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    }}
  ]
})
export class MaterialModule { }
