import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { RoutingService } from 'src/app/services/routing-service.service';
import { NgControlStatus } from '@angular/forms';
import { GraphService } from 'src/app/services/graph.service';
import { ElectronMsgService } from 'src/app/services/electron.service';
// import * as go from 'gojs';

declare var require: any;
declare var cytoscape: any;
const jquery = require('jquery');
const edgehandles = require('cytoscape-edgehandles');
const ctxmenu = require('cytoscape-cxtmenu');

@Component({
  selector: 'app-design-pipeline',
  templateUrl: './design-pipeline.component.html',
  styleUrls: ['./design-pipeline.component.scss']
})
export class DesignPipelineComponent implements OnInit {

  cy: any;
  eh: any;
  edgeBendInstance: any;
  contextInstance: any;


  constructor(private routingService: RoutingService, private graphService: GraphService, private electronService: ElectronMsgService) {}
    ngOnInit() {

      this.routingService.showSideBarEmitter.next(false);

      this.cy = cytoscape({
        container: document.querySelector('#cy'),
        elements: [
        {
          group: 'nodes',
          data: { name: "Start", id: "start"},
          position: { x: 100, y: 100 }
        },
        {
          group: 'nodes',
          data: { name: "End", id: "end"},
          position: { x: 300, y: 100 }
        }
      ],
        'minZoom': 0.6,
        'maxZoom': 1.3,
        layout: {
          name: 'preset'
        },
      
        // so we can see the ids
        style: [
          {
            selector: 'node[name]',
            style: {
              'label': 'data(name)'
            }
          }, 
          {
            selector: 'edge',
            style: {
              "curve-style": 'unbundled-bezier',
              "control-point-distances": [40, -40],
              "control-point-weights": [0.250, 0.75]
            }
          },
          {
            selector: '.eh-handle',
            style: {
              'background-color': 'red',
              'width': 12,
              'height': 12,
              'shape': 'ellipse',
              'overlay-opacity': 0,
              'border-width': 12, // makes the handle easier to hit
              'border-opacity': 0
            }
          }
        ]
      });
    let eh = this.cy.edgehandles(this.graphService.edgeHandleSettings)
    }

    dropComplete(e) {
      const xpos = e.nativeEvent.offsetX;
      const ypos = e.nativeEvent.offsetY;
      const data = e.dragData
      this.cy.add({
        group: 'nodes',
        data: { name: data.name, id: data.id},
        renderedPosition: { x: xpos, y: ypos }
      })
    }

    DFS() {
      let orderedNodes = []
      this.cy.elements().dfs({
        root: '#start',
        visit: function(v, e, u, i, depth) {
          let obj = {
            id: v.id(),
            data: v.data()
          }

          orderedNodes.push(obj);
        }
      })

      return orderedNodes;
    }

    generatePythonCode() {
      // traverse the graoh first and check use depth first search
      let orderedNodes  = this.DFS();
      this.electronService
    }


}
