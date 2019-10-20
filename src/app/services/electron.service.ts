import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs';
import { Papa } from 'ngx-papaparse';
@Injectable({
  providedIn: 'root'
})
export class ElectronMsgService {

  loaded = new Subject();
  codeOutput = new Subject();
  constructor(private _electronService: ElectronService, private papa: Papa) {}

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
    let pathObj = this._electronService.ipcRenderer.sendSync('open-browse-dialog');
    if(pathObj)
      return pathObj;
  }

  runCode(items: Array<object>) {
    this._electronService.ipcRenderer.send('run-python-code', items);

    this._electronService.ipcRenderer.on('run-python-code-output', (event, output) => {
      this.loaded.next(true)
      this.codeOutput.next(output);
    })
  }

  getCSVString(path) {
    let string = this._electronService.ipcRenderer.sendSync('get-csv-string', path);
    let parsed = this.papa.parse(string);
    return parsed.data;
  }
}
