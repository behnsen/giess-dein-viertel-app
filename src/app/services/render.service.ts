import { Injectable } from '@angular/core';
import { MapboxMarker, Mapbox, MapboxView } from "nativescript-mapbox";
import { TreeDetail } from './tree.service';
import { RouterExtensions } from '@nativescript/angular';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(private router: RouterExtensions) { }

  calculateViewport(latitudes: number[], longitudes: number[]) {

    let north = Math.max(...latitudes);
    let south = Math.min(...latitudes);
    let east = Math.max(...longitudes);
    let west = Math.min(...longitudes);

    return {
      bounds: {
        north: north,
        east: east,
        south: south,
        west: west
      },
      animated: true
    }

  }

  setTreeMarkers(mapbox: any, trees: any[], home?: any, onTapCallback?: (marker) => void) {
    trees = trees || [];
    home = home || {};
    onTapCallback = onTapCallback || (() => {});
    let markers: MapboxMarker[] = [];
    let marker = <MapboxMarker> {};
    mapbox.removeMarkers();

    markers.push({
      lat: home.latitude,
      lng: home.longitude,
      icon: 'res://location_home',
      selected: false,
      onCalloutTap: () => { }
    })

    trees.forEach(tree => markers.push({
      id: tree.id,
      lat: tree.lat,
      lng: tree.lng,
      icon: 'res://marker',
      selected: false,
      onTap: (marker: MapboxMarker) => {
        marker.update({
          id: marker.id,
          lat: marker.lat,
          lng: marker.lng,
          icon: 'res://cross'
        })
        onTapCallback(marker);
      },
      onCalloutTap: (marker: MapboxMarker) => {
        marker.update({
          id: marker.id,
          lat: marker.lat,
          lng: marker.lng,
          icon: 'res://marker'
        })
      },
    }));

    mapbox.addMarkers(markers);

    let latitudes = [home.latitude];
    let longitudes = [home.longitude];

    trees.forEach(t => {
      latitudes.push(t.lat);
      longitudes.push(t.lng)});

    mapbox.setViewport(
      this.calculateViewport(
        latitudes,
        longitudes));

    return markers;

  }
}
