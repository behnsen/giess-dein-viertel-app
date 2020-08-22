import { Injectable } from '@angular/core';

declare let dotenv: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _env = {};

  constructor() {
    for (const [key, value] of Object.entries(dotenv)) {
      let splitted = key.split('.');

      this._env[splitted[splitted.length - 1]] = value;
    }
  }

  get env(): any {
    return this._env;
  }
}
