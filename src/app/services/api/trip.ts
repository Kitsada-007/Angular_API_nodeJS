import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { TripGetRes } from '../../../model/trip_get_res';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async getTrip(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetRes[];
  }
  public async getOneTrip(id: number): Promise<TripGetRes | null> {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetRes;
  }

  public async getTripByName(name: string, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.get(url, {
        params: {
          name: name,
        },
      })
    );
    return response as TripGetRes[];
  }
  public async addNewTrip(trip: any, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.post(url, trip));
    return response;
  }

  public async delectTrip(id: number, options?: any){
    const url = this.constants.API_ENDPOINT + `/trip/${id}`;
    const response = await lastValueFrom(this.http.delete(url));
    return response;
  }

  public async EditTrip(trip: any, options? :any)
  {
    const url = this.constants.API_ENDPOINT + `/trip/${trip.idx}`
    const response = await lastValueFrom(this.http.put(url, trip))
    return response
  }
}
