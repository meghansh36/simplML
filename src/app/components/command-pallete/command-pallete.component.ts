import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'command-pallete',
  templateUrl: './command-pallete.component.html',
  styleUrls: ['./command-pallete.component.scss']
})
export class CommandPalleteComponent implements OnInit {

  dataInputOptions = [
    {
      name: 'Input CSV',
      id: "data_csv"
    }, 
    {
      name: 'Input JSON',
      id: "data_json"
    },
    {
      name: 'Input HTML',
      id: "data_html"
    },
    {
      name: 'Input Excel',
      id: "data_excel"
    }
  ];

  dataProcessingOptions = [
    {
      name: "Fill Missing Values",
      id: "processing_fillna"
    },
    {
      name: "Drop Columns",
      id: "processing_drop"

    },
    {
      name: "Min-Max Scaling",
      id: "processing_scaling"

    },
    {
      name: "Standardization",
      id: "processing_standardize"
    },
    {
      name: "One Hot Encoding",
      id: "processing_ohe"
    }
  ]

  
  constructor() { }

  ngOnInit() {
  }

}
