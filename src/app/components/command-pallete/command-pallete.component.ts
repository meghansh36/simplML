import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'command-pallete',
  templateUrl: './command-pallete.component.html',
  styleUrls: ['./command-pallete.component.scss']
})
export class CommandPalleteComponent implements OnInit {

  dataInputOptions = [
    {
      name: 'Input CSV'
    }, 
    {
      name: 'Input JSON'
    },
    {
      name: 'Input HTML'
    },
    {
      name: 'Input Excel'
    }
  ];

  dataProcessingOptions = [
    {
      name: "Fill Missing Values"
    },
    {
      name: "Drop Columns"
    },
    {
      name: "Min-Max Scaling"
    },
    {
      name: "Standardization"
    },
    {
      name: "One Hot Encoding"
    }, 
    {
      name: "Min-Max Scaling"
    }
  ]

  
  constructor() { }

  ngOnInit() {
  }

}
