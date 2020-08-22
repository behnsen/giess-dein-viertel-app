import { Component, OnInit, NgZone } from '@angular/core';
import { GestureTypes, TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { Slider } from "tns-core-modules/ui/slider";
import { Mapbox } from "nativescript-mapbox";
import { Color } from 'tns-core-modules/color';

import { TreeService, Tree, TreeDetail } from '../services/tree.service';
import { RenderService } from '../services/render.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'ns-trees-in-radius-map',
  templateUrl: './trees-in-radius-map.component.html',
  styleUrls: ['./trees-in-radius-map.component.css']
})
export class TreesInRadiusMapComponent implements OnInit {

  mapbox: Mapbox;
  slider: any;
  markers: any = [];
  trees: Tree[];
  treesDetailed: TreeDetail[];
  selectedTree: TreeDetail = null;
  sliderSelectedBgColor: Color = new Color("rgb(55, 222, 138)");
  home = { latitude: 51.336480, longitude: 12.335704 };
  showUserLocation = false;
  radius = 0.1; // km
  viewRadius = 100; // m

  constructor(
    public config: ConfigService,
    private treeService: TreeService,
    private renderService: RenderService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {}

  onSliderValueChange(args) {
    this.slider = <Slider>args.object;
    this.slider.off(GestureTypes.touch);
    this.slider.on(
      GestureTypes.touch,
      (touchargs: TouchGestureEventData) => {
        if(touchargs.action == 'up') {
          this._ngZone.run(() => this.treeService
            .getTreesForLocation(null, this.radius)
            .subscribe(this.treeSubscriber));
        }
      });

    this.viewRadius = args.value;
    this.radius = this.viewRadius / 1000;
  }

  onMapReady(args) {
    this.mapbox = args.map;
    this.mapbox.setTilt({tilt: 60, duration: 500});
    this._ngZone.run(() => this.treeService
      .getTreesForLocation(null, this.radius)
      .subscribe(this.treeSubscriber));
  }

  treeSubscriber = (trees: Tree[]) => {
    this.trees = trees;
    this.renderService.setTreeMarkers(this.mapbox, trees, this.home, this.onTap);
  };

  onTap = (marker) => {
    this._ngZone.run(() => this.treeService
      .getTreeDetailsWithWater(marker.id)
      .subscribe(treeDetails => {
        this.selectedTree = treeDetails }));
  }

  onClose = () => this.selectedTree = null;

  isTreeSelected = () => !!this.selectedTree;
}
