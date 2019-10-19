import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing-service.service';
import { NgControlStatus } from '@angular/forms';
import { GraphService } from 'src/app/services/graph.service';
import { ElectronMsgService } from 'src/app/services/electron.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputformComponent } from 'src/app/components/inputform/inputform.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
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
export class DesignPipelineComponent implements OnInit, AfterViewInit {

  cy: any;
  eh: any;
  edgeBendInstance: any;
  contextInstance: any;


  constructor(private routingService: RoutingService, private graphService: GraphService, private electronService: ElectronMsgService, private modalService: NgbModal) {}
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
              'background-color': '#1e1e2f',
              'border-style': 'solid',
              'border-width': '1px',
              'border-color': 'data(borderColor)',
              'shape': 'round-rectangle',
              'label': 'data(name)',
              'color': 'white',
              'text-valign': 'center',
              'width': 'data(width)',
              'height': 'data(height)'
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
    let cxt = this.cy.cxtmenu(this.graphService.ctxSettings)
    }

    ngAfterViewInit() {
      this.graphService.setDesignPipelineObject(this);
    }

    dropComplete(e) {
      const xpos = e.nativeEvent.offsetX;
      const ypos = e.nativeEvent.offsetY;
      const dragData = e.dragData
      console.log(dragData)
      this.cy.add({
        group: 'nodes',
        data: { ...dragData, width: 200, height: 50},
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
      const modalRef = this.modalService.open(LoadingComponent);
      // let loaded = this.electronService.generatePythonCode(orderedNodes);
      // if (loaded) {
      //   modalRef.close();
      // }
    }

    openDataForm() {
      const modalRef = this.modalService.open(InputformComponent);
      modalRef.componentInstance.id = 10; // should be the id

      modalRef.result.then((result) => {
          this.cy.$("node[parentCategory = 'data']").data('path', result);
          console.log(this.cy.$("node[parentCategory = 'data']").data());
      }).catch((error) => {
        console.log(error);
      });
    }


}
