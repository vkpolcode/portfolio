import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  entryComponents: [
    FormComponent
  ],
  imports: [
    CommonModule,
    PortfoliosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PortfoliosModule { }
