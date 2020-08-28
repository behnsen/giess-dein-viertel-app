import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeDetail } from '../services/tree.service';

@Component({
  selector: 'TreeDetail',
  templateUrl: './tree-detail.component.html',
  styleUrls: ['./tree-detail.component.css']
})
export class TreeDetailComponent implements OnInit {

  _tree: TreeDetail = null;
  cans = [
    {id: 0, value: 0},
    {id: 1, value: 0},
    {id: 2, value: 0},
    {id: 3, value: 0},
    {id: 4, value: 0}];

  @Input()
  set tree(tree: TreeDetail) {
    this._tree = tree;
    this.cans = this.getCans(tree);
  }
  get tree() {
    return this._tree;
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  showUserLocation = false;

  constructor() { }

  ngOnInit(): void {}

  closeWasTapped(): void {
    this.onClose.emit();
  }

  getCans(tree: TreeDetail) {
    const cans = [
      {id: 0, value: 0},
      {id: 1, value: 0},
      {id: 2, value: 0},
      {id: 3, value: 0},
      {id: 4, value: 0}];
    const squareMeters = 3;
    const literDailyNeed = 7;

    try {
      let literRainPer30Days = tree.radolan_sum*0.1;
      let rainLiter = squareMeters*literRainPer30Days;
      let liter30DaysNeed = literDailyNeed*30;
      let additionalLiter = tree.lastWatered.map(lw => lw.amount).reduce((pv, cv) => pv + cv, 0);
      let relation = (rainLiter + additionalLiter)/liter30DaysNeed;

      if(relation > 0.2) {
        cans[0].value = 1;
      }
      if(relation > 0.4) {
        cans[1].value = 1;
      }
      if(relation > 0.6) {
        cans[2].value = 1;
      }
      if(relation > 0.8) {
        cans[3].value = 1;
      }
      if(relation > 1.0) {
        cans[4].value = 1;
      }

    } catch(e) {
      console.error(e);
    }

    return cans;
  }

  onWaterTap() {
  }
}
