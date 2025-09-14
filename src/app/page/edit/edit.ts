import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { Trip } from '../../services/api/trip';
import { HttpClient } from '@angular/common/http';
import { TripGetRes } from '../../../model/trip_get_res';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  imports: [CommonModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

  constructor(
    private http: HttpClient,
    private tripService: Trip,
    private activatedRoute: ActivatedRoute
  ) {}

  trip: TripGetRes | null = null; 
  id: number = 0;

  name: string = '';
  destination: number = 0;   
  country: string = '';
  cover: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  async ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    this.trip = (await this.tripService.getOneTrip(this.id)) as TripGetRes;

    if (this.trip) {
      this.name = this.trip.name;
      this.country = this.trip.country;
      this.cover = this.trip.coverimage;
      this.detail = this.trip.detail;
      this.price = this.trip.price;
      this.duration = this.trip.duration;

      console.log(this.trip.destination_zone);

      switch (this.trip.destination_zone) {
        case 'เอเชีย':
          this.destination = 1;
          break;
        case 'ยุโรป':
          this.destination = 2;
          break;
        case 'เอเชียตะวันออกเฉียงใต้':
          this.destination = 3;
          break;
        case 'ประเทศไทย':
          this.destination = 9;
          break;
      }
    }
  }

  private buildRequestBody() {
    return {
      idx: this.id,
      name: this.name,
      country: this.country,
      destinationid: this.destination,
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: this.duration,
    };
  }

  public async Update() {
    try {
      const body = this.buildRequestBody();
      const res = await this.tripService.EditTrip(body);
      console.log("อัพเดตสำเร็จ:", res);
    } catch (err) {
      console.error("อัพเดตล้มเหลว:", err);
    }
  }
}

interface Destination {
  value: number;
  name: string;
}
