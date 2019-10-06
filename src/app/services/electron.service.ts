import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMsgService {

  constructor(private _electronService: ElectronService) { }

  fetchPreview(filename) {
    console.log('got here')
    this._electronService.ipcRenderer.send('fetch-preview', filename)
  }
}
