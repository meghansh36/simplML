import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronMsgService {

  loaded = new Subject();
  constructor(private _electronService: ElectronService) {}

  fetchPreview(filename) {
    console.log('got here')
    this._electronService.ipcRenderer.send('fetch-preview', filename)
  }

  generatePythonCode(items: Array<object>) {
    this._electronService.ipcRenderer.send('generate-python-code', items);
    
    this._electronService.ipcRenderer.on('generate-python-code-success', (event) => {
      this.loaded.next(true);
    })
  }

  openBrowseDialog() {
    let pathObj = this._electronService.ipcRenderer.sendSync('open-browse-dialog')
    if(pathObj)
      return pathObj;
  }
}
