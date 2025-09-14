import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { Trip } from '../../services/api/trip';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manage',
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './manage.html',
  styleUrl: './manage.scss',
})
export class Manage {
    constructor(private http: HttpClient, private tripService: Trip) {}
  name: string = '';
  destination: string = '';
  country: string = '';
  cover: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];
  async addNew() {
    const body = {
      name: this.name,
      country: this.country,
      destinationid: Number(this.destination),
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: this.duration,
    };
    // const url = 'http://localhost:3000/trip';
    try {
      const response = await this.tripService.addNewTrip(body);
      console.log(response);
    } catch (error) {
      console.error('POST failed:', error);
    }
  }
}

interface Destination {
  value: number;
  name: string;
}
