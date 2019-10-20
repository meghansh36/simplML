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
      parentCategory: 'data',
      tooltipText: "Select a Data CSV file to provide a dataset to your ML model"
    }, 
    {
      name: 'Input JSON',
      id: "data_json",
      borderColor: '#00CCCC',
      parentCategory: 'data',
      tooltipText: "Select a Data JSON file to provide a dataset to your ML model"
    },
    {
      name: 'Input HTML',
      id: "data_html",
      borderColor: '#00CCCC',
      parentCategory: 'data',
      tooltipText: "Provide a URL to the dataset file to serve as a dataset to your ML model"
    },
    {
      name: 'Input Excel',
      id: "data_excel",
      borderColor: '#00CCCC',
      parentCategory: 'data',
      tooltipText: "Select an Excel file to provide a dataset to your ML model"
    }
  ];

  transformingOptions = [
    {
      name: "Fill Missing Values",
      id: "transforming_fillna",
      borderColor: '#FFD0B9',
      parentCategory: 'transforming',
      tooltipText: "This block fills any missing values in your data with 0 so your model doesn't have to worry :)"
    },
    {
      name: "Drop NA",
      id: "transforming_drop",
      borderColor: '#FFD0B9',
      parentCategory: 'transforming',
      tooltipText: "This block removes any column with a missing value. A clean dataset = A happy model :) "
    },
  ]

  dataProcessingOptions = [
    {
      name: "One Hot Encoding",
      id: "processing_ohe",
      borderColor: '#BF8FCC',
      parentCategory: 'processing',
      tooltipText: "An ML model accepts only values that are numbers. Thus, this block is used to change any non-numeric data to numeric one."
    },
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
