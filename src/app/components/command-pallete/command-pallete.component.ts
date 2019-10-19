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

  transformingOptions = [
    {
      name: "Fill Missing Values",
      id: "processing_fillna",
      borderColor: '#FFD0B9',
      parentCategory: 'transforming'
    },
    {
      name: "Drop NA",
      id: "processing_drop",
      borderColor: '#FFD0B9',
      parentCategory: 'transforming'
    },
  ]

  dataProcessingOptions = [
    {
      name: "Min-Max Scaling",
      id: "processing_scaling",
      borderColor: '#BF8FCC',
      parentCategory: 'processing'
    },
    {
      name: "Standardization",
      id: "processing_standardize",
      borderColor: '#BF8FCC',
      parentCategory: 'processing'
    },
    {
      name: "One Hot Encoding",
      id: "processing_ohe",
      borderColor: '#BF8FCC',
      parentCategory: 'processing'
    }
  ]

  learnerOptions = [
    {
      name: "Regression",
      id: "learner_regression",
      borderColor: '#FF5349',
      parentCategory: 'learner'
    },
    {
      name: "Support Vector Machine",
      id: "learner_SVM",
      borderColor: '#FF5349',
      parentCategory: 'learner'
    },
    {
      name: "Random Forest",
      id: "learner_RF",
      borderColor: '#FF5349',
      parentCategory: 'learner'
    },
    {
      name: "Preceptrons",
      id: "learner_perceptron",
      borderColor: '#FF5349',
      parentCategory: 'learner'
    },
    {
      name: "Clustering",
      id: "learner_clustering",
      borderColor: '#FF5349',
      parentCategory: 'learner'
    }
  ]

  
  constructor() { }

  ngOnInit() {
  }

}
