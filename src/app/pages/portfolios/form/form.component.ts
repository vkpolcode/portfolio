import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PortfolioService } from '../services/portfolio.service';
import { Portfolio } from 'src/app/models/portfolio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatePrice } from 'src/app/validators/price.validator';

interface DataValues {
  id: number;
}

@Component({
  selector: 'prf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  showError: boolean;
  currencies: string[];
  edit: boolean;

  constructor(
    private formDialog: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataValues,
    private portfolio: PortfolioService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.showError = false;
    this.currencies = ['PLN', 'EUR', 'USD'];
    this.edit = false;
  }

  ngOnInit() {
    this.buildForm();
    this.edit = this.data && this.data.id ? true : false;
    if (this.edit) {
      this.portfolio
        .getPortfolio(this.data.id)
        .then((portfolio: Portfolio) => {
          if (portfolio) {
            this.form.patchValue(portfolio);
          } else {
            this.snackBar.open('Portfolio nie znaleziono', null, { duration: 5000 });
            this.cancel();
          }
        }).catch((error: string) => {
          this.snackBar.open(error, null, { duration: 5000 });
          this.cancel();
        });
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      clientName: ['', Validators.required],
      value: ['', [Validators.required, ValidatePrice]],
      currency: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.showError = false;
      const data = Object.assign({id: this.data && this.data.id ? this.data.id : this.portfolio.generateID()}, this.form.value);
      this.portfolio
        .save(this.data && this.data.id ? this.data.id : null, data)
        .then((result: boolean) => {
          if (result) {
            this.snackBar.open('Portfel został poprawnie zapisany', null, { duration: 5000 });
            this.portfolio.getList();
            this.cancel();
          } else {
            this.snackBar.open('Wystąp błąd podczas zapisu', null, { duration: 5000 });
          }
        }).catch((error: string) => {
          this.snackBar.open(error, null, { duration: 5000 });
          this.cancel();
        });
    } else {
      this.showError = true;
    }
  }

  cancel() {
    this.form.reset();
    this.formDialog.close();
  }
}
