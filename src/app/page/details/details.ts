import { Component, OnInit } from '@angular/core';
import { Trip } from '../../services/api/trip';
import { HttpClient } from '@angular/common/http';
import { TripGetRes } from '../../../model/trip_get_res';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
     RouterLink
  ],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class Details implements OnInit {
  constructor(
    private http: HttpClient,
    private tripService: Trip,
    private activeatedRoute: ActivatedRoute
  ) {}

  trip: TripGetRes | null = null; // ✅ เก็บ trip เดียว
  id: number = 0;

  public  async ngOnInit() {
     this.id = Number(this.activeatedRoute.snapshot.paramMap.get('id') || '')
    console.log('📌 ได้ id =', this.id);

    this.trip = (await this.tripService.getOneTrip(this.id)) as TripGetRes;
  }

 
}
