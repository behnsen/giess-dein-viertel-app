import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GeoService, GeoCoordinate } from './geo.service';
import { ConfigService } from './config.service';
import { Tree, TreeDetail, TreeLastWatered, TreeWatered, TreeWateredRaw } from '../models/models';

export * from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private config: ConfigService, private http: HttpClient, private geo: GeoService, private _ngZone: NgZone) { }

  getTrees(): Observable<Tree[]> {
    const url = this.config.env.URL_TREES;
    return this._ngZone.run(() => this.http
      .get(url, { responseType: 'text' })
      .pipe(map(trees => this.parse(trees))));
  }


  getWateredTrees(): Observable<TreeWatered[]> {
    let url = this.config.env.URL_TREES_WATERED;
    url += '/get-watered-trees'
    return this._ngZone.run(() => this.http.get(url).pipe(map((data: TreeWateredRaw) => {
      const wateredTrees: TreeWatered[] = [];
      data.watered.forEach(watered => {
        let wateredMapped = new TreeWatered();
        wateredMapped.id = watered;
        wateredTrees.push(wateredMapped);
      });
      return wateredTrees;
    })));
  }

  getWateredAndAdoptedTrees(): Observable<any> {
    let url = this.config.env.URL_TREES_WATERED;
    url += '/get-watered-and-adopted';

    return this._ngZone.run(() => this.http.get(url));
  }

  // URL_TREES_WATERED=https://leipzig-trees-express-now.vercel.app
  //https://leipzig-trees-express-now.vercel.app/get?queryType=byid&id=id-12735
  getTreeLastWatered(id: string) {
    let url = this.config.env.URL_TREES_WATERED;
    url += '/get';

    let params = new HttpParams()
      .append('queryType', 'lastwatered')
      .append('id', id);

    return this._ngZone.run(() =>
      this.http
        .get(url, { params })
        .pipe(map((response: any) =>
          response.data))
        .pipe(map(data => data.map(w => new TreeLastWatered(w)))));
  }

  getNonWateredTrees(): Observable<any> {
    var tasks$ = [];
    tasks$.push(this.getTrees());
    tasks$.push(this.getWateredTrees());
    return forkJoin(...tasks$);
  }

  getTreeDetails(id: string): Observable<TreeDetail> {

    let url = this.config.env.URL_TREES_WATERED;
    url += '/get';
    let params = new HttpParams()
      .append('queryType', 'byid')
      .append("floatLatLng", "true")
      .append('id', id);

    return this._ngZone.run(() =>
      this.http
        .get(url, { params })
        .pipe(map((result: any) => {
          let trees: any[] = result.data;
          let mappedTrees = trees.map(d => new TreeDetail(d));
          return mappedTrees?.[0];})));
  }

  getTreeDetailsWithWater(id: string) {
    let tasks$ = [];
    tasks$.push(this.getTreeDetails(id));
    tasks$.push(this.getTreeLastWatered(id));

    return forkJoin(...tasks$).pipe(map(results => {
      let treeDetails: TreeDetail = results[0];
      let lastWatered: TreeLastWatered[] = results[1];

      treeDetails.lastWatered = lastWatered;

      return treeDetails;
    }));
  }

  getTreeDetailsMany(ids: string[]): Observable<TreeDetail[]> {
    var tasks$ = [];
    ids.forEach(id => tasks$.push(this.getTreeDetails(id)));
    return forkJoin(...tasks$).pipe(map(results => {
      let trees: TreeDetail[] = [];
      results.forEach(result => trees.push(new TreeDetail(result)));
      return trees;
    }));
  }

  getTreesForLocation(home?: GeoCoordinate, radius?: number){
    home = home || { latitude: 51.336480, longitude: 12.335704 };
    radius = radius || 0.5; // kilometers

    return this.getTrees().pipe(map(trees => {
      return trees.filter(tree =>
        this.geo.isInRadius(home, {
          latitude: tree.lat,
          longitude: tree.lng
        }, radius))}));
  }

  getTreesWithDetailsForLocation(home?: GeoCoordinate, radius?: number){
    return this.getTreesForLocation(home, radius)
      .pipe(mergeMap(trees =>
        this.getTreeDetailsMany(trees.map(t => t.id))));
  }


  private parse(trees: any): Tree[] {
    let result = [];
    let splittedTrees = trees.split("\n");
    splittedTrees.shift();
    splittedTrees.forEach(tree => {
        try {
            let item = tree.split(",");

            let finalTree = new Tree();
            finalTree.id = item[0];
            finalTree.lat = item[1];
            finalTree.lng = item[2];
            finalTree.radolan_sum = item[3];
            finalTree.age = item[4];
            result.push(finalTree);

        } catch (error) {

        }

    });
    return result;
  }
}
