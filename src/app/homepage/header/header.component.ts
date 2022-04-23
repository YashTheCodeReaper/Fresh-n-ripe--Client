import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.isLogged) {
      this.isLogged = true;
    }
  }
}
