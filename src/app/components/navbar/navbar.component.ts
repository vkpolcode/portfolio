import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'prf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public links: Menu[] = [
    { url: '/portfolios', title: 'Portfele', active: true },
    { url: '/menu_item_1', title: 'Menu nie aktywne', active: false },
    { url: '/menu_item_2', title: 'Menu nie aktywne', active: false }
  ];
  public opened: boolean;

  constructor() {
    this.opened = false;
  }

  ngOnInit() {
  }

}
