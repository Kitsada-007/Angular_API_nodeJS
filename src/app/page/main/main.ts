import { Component } from '@angular/core';
import { Trip } from '../../services/api/trip';
import { HttpClient } from '@angular/common/http';
import { TripGetRes } from '../../../model/trip_get_res';
import { CommonModule } from '@angular/common';

import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButton,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    RouterLink
],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  constructor(private http: HttpClient, private tripService: Trip) {}

  trips: TripGetRes[] = [];
  tripsSelect: TripGetRes[] = [];
  selectedValue: string = '';

  async ngOnInit(): Promise<void> {
    await this.loadDataAsync();
    console.log(this.selectedValue);
    console.log('Init State');
  }

  public async loadDataAsync() {
    this.trips = await this.tripService.getTrip();
    this.tripsSelect = [...this.trips];
  }

  public selectDatabyZone() {
    if (!this.selectedValue) {
      this.tripsSelect = [...this.trips];
      return;
    }

    this.tripsSelect = this.trips.filter(
      (item) => item.destination_zone === this.selectedValue
    );
  }

  public async findOne(input: HTMLInputElement) {
    if (!input.value) {
      console.log('No input');
      return;
    }

    const id = Number(input.value);
    if (isNaN(id)) {
      console.log('กรุณากรอกเป็นตัวเลข');
      return;
    }

    try {
      const result = (await this.tripService.getOneTrip(id)) as TripGetRes;
      this.tripsSelect = result ? [result] : [];
    } catch (err) {
      console.error('ไม่พบข้อมูล', err);
      this.tripsSelect = [];
    }
  }

  public async findByName(input: HTMLInputElement) {
    const trips = await this.tripService.getTripByName(input.value);
    this.tripsSelect = trips.filter((trip) =>
      trip.name.toLowerCase().includes(input.value.toLowerCase())
    );
    if (this.trips.length > 0) {
      console.log(this.trips[0].name);
    }
    console.log('Call Completed');
  }

  
}
