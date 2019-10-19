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
      id: "data_csv",
      borderColor: '#00CCCC',
      parentCategory: 'data'
    }, 
    {
      name: 'Input JSON',
      id: "data_json",
      borderColor: '#00CCCC',
      parentCategory: 'data'
    },
    {
      name: 'Input HTML',
      id: "data_html",
      borderColor: '#00CCCC',
      parentCategory: 'data'
    },
    {
      name: 'Input Excel',
      id: "data_excel",
      borderColor: '#00CCCC',
      parentCategory: 'data'
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

  learnerOptions = [
    {
      name: "Regression",
      id: "learner_regression",

    },
    {
      name: "Support Vector Machine",
      id: "learner_svm"
    },
    {
      name: "Random Forest",
      id: "learner_RF"
    },
    {
      name: "Preceptrons",
      id: "learner_perceptron"
    },
    {
      name: "Clustering",
      id: "learner_clustering"
    }
  ]

  
  constructor() { }

  ngOnInit() {
  }

}
