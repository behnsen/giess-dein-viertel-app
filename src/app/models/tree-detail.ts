import { TreeLastWatered } from './models';

export class TreeDetail {
    id: string = '';
    lng: number = 0;
    lat: number = 0;
    artDtsch: string = '';
    artBot: string = '';
    gattungDeutsch: string = '';
    gattung: string = '';
    standortNr: number = 0;
    strName: string = '';
    pflanzjahr: number = 0;
    standAlter: number = 0;
    kroneDurch: number = 0;
    stammUmfg: number = 0;
    type: any = '';
    baumHoehe: number = 0;
    bezirk: string = '';
    eigentuemer: string = '';
    adopted: boolean = false;
    watered: boolean = false;
    radolan_sum: number = 0;
    radolan_days: number[]  = [];
    geom: string = '';
    lastWatered: TreeLastWatered[] = [];
    constructor(obj?: any) {
      if(!!obj) {
        Object.assign(this, obj);
        this.lat = +obj.lat;
        this.lng = +obj.lng;
      }
    }
  }