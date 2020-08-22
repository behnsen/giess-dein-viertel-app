import { Injectable } from '@angular/core';

export interface GeoCoordinate {
  longitude: number;
  latitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  distanceBetween(coordinate1: GeoCoordinate, coordinate2: GeoCoordinate) {
    const earthRadius = 6371;

    const deltaLatitude = this.deg2rad(coordinate2.latitude - coordinate1.latitude);
    const deltaLongitude = this.deg2rad(coordinate2.longitude - coordinate1.longitude);

    const a = Math.pow(Math.sin(deltaLatitude/2), 2) +
      Math.cos(this.deg2rad(coordinate1.latitude)) *
      Math.cos(this.deg2rad(coordinate2.latitude)) *
      Math.pow(Math.sin(deltaLongitude/2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));
    const d = earthRadius * c;

    return d;
  }

  isInRadius(coordinate1: GeoCoordinate, coordinate2: GeoCoordinate, radius: number): boolean {
    return this.distanceBetween(coordinate1, coordinate2) < radius;
  }

  deg2rad(angle){
    return angle * Math.PI / 180;
  }


}
