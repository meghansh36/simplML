import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMsgService {

  constructor(private _electronService: ElectronService) {}

  fetchPreview(filename) {
    console.log('got here')
    this._electronService.ipcRenderer.send('fetch-preview', filename)
  }

  generatePythonCode(items: Array<object>) {
    let loaded:boolean = this._electronService.ipcRenderer.sendSync('generate-python-code', items);
    return loaded
  }

  openBrowseDialog() {
    let pathObj = this._electronService.ipcRenderer.sendSync('open-browse-dialog')
    if(pathObj)
      return pathObj;
  }
}
