import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, RouterLink, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
