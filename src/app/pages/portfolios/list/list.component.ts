import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { Portfolio } from 'src/app/models/portfolio';
import { MatSnackBar, MatSnackBarRef, MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'prf-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('deleteTemplate')deleteTemplate: TemplateRef<any>;
  panelOpenState: boolean;
  list: Portfolio[];
  currentSnackBar: MatSnackBarRef<any>;
  private selectedId: number;

  constructor(
    private portfolio: PortfolioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.panelOpenState = false;
    this.list = [];
    this.currentSnackBar = null;
    this.selectedId = null;
    this.portfolio.list.subscribe((list: Portfolio[]) => {
      this.list = list;
    });
  }

  ngOnInit() {
    this.portfolio.getList();
  }

  openAdd() {
    this.dialog.open(FormComponent, { data: { id: null } });
  }

  edit(e, id: number) {
    e.stopPropagation();
    this.dialog.open(FormComponent, { data: { id: id } });
  }

  remove(e, id: number) {
    e.stopPropagation();
    if (id) {
      this.selectedId = id;
      this.currentSnackBar = this.snackBar.openFromTemplate(this.deleteTemplate);
    }
  }

  confirmRemove() {
    this.currentSnackBar.dismiss();
    this.portfolio
      .remove(this.selectedId)
      .then((result: boolean) => {
        if (result) {
          this.snackBar.open('Portfel został usunięty', null, { duration: 5000 });
          this.portfolio.getList();
        } else {
          this.snackBar.open('Wystąpił błąd przy usunięciu portfela', null, { duration: 5000 });
        }
      }).catch(error => {
        console.log('error', error);
      });
  }

  cancel() {
    this.selectedId = null;
    this.currentSnackBar.dismiss();
  }

}
