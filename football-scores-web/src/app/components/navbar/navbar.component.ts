import { Component, OnInit } from '@angular/core';
import "bootstrap/dist/css/bootstrap.css"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuVariable: boolean = false;
  menuIconVariable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menuIconVariable =! this.menuIconVariable;
  }
}
