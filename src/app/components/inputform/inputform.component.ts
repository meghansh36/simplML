import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronMsgService } from 'src/app/services/electron.service';

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.scss']
})
export class InputformComponent implements OnInit {

  path = new FormControl('', [Validators.required]);
  constructor( public activeModal: NgbActiveModal, private electronService: ElectronMsgService) { }

  ngOnInit() {}

  openBrowse() {
    this.electronService.openBrowseDialog();
    
  }

  submit() {
    if(this.path.value)
      this.activeModal.close(this.path.value);
  }

}
