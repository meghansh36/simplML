import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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

  // private diagram: go.Diagram = new go.Diagram();
  // private palette: go.Palette = new go.Palette();

  // @ViewChild('diagramDiv', { static: true })
  // private diagramRef: ElementRef;

  // @ViewChild('paletteDiv', { static: true })
  // private paletteRef: ElementRef;

  // @Input()
  // get model(): go.Model { return this.diagram.model; }
  // set model(val: go.Model) { this.diagram.model = val; }

  // @Output()
  // nodeSelected = new EventEmitter<go.Node | null>();

  // @Output()
  // modelChanged = new EventEmitter<go.ChangedEvent>();

  cy: any;
  eh: any;
  edgeBendInstance: any;
  contextInstance: any;


  constructor() {

    this.cy = cytoscape({
        container: document.querySelector('#cy'),
        elements: [],
        'minZoom': 0.6,
        'maxZoom': 1.3,
        layout: {
          name: 'preset'
        }
      });
  }
    ngOnInit() {}


  //   const $ = go.GraphObject.make;
  //   // (go as any).licenseKey = "..."
  //   this.diagram = new go.Diagram();
  //   this.diagram.initialContentAlignment = go.Spot.Center;
  //   this.diagram.allowDrop = true;
  //   this.diagram.undoManager.isEnabled = true;
  //   this.diagram.addDiagramListener("ChangedSelection",
  //     e => {
  //       const node = e.diagram.selection.first();
  //       this.nodeSelected.emit(node instanceof go.Node ? node : null);
  //     });
  //   this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

  //   this.diagram.nodeTemplate =
  //     $(go.Node, "Auto",
  //       {
  //         click: (e, node: go.Node) => { console.log('clicked'); }
  //       },
  //       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  //       $(go.Shape,
  //         {
  //           fill: "white", strokeWidth: 0,
  //           portId: "", cursor: "pointer",
  //           // allow many kinds of links
  //           fromLinkable: true, toLinkable: true,
  //           fromLinkableSelfNode: true, toLinkableSelfNode: true,
  //           fromLinkableDuplicates: true, toLinkableDuplicates: true
  //         },
  //         new go.Binding("fill", "color")),
  //       $(go.TextBlock,
  //         { margin: 8 /*, editable: true*/ },
  //         new go.Binding("text")/*.makeTwoWay()*/)
  //     );

  //   this.diagram.linkTemplate =
  //     $(go.Link,
  //       // allow relinking
  //       { relinkableFrom: true, relinkableTo: true },
  //       $(go.Shape),
  //       $(go.Shape, { toArrow: "OpenTriangle" })
  //     );
  // }



  // ngOnInit() {
  //   this.diagram.div = this.diagramRef.nativeElement;
  // }


  // addNewComponent(): void {
  //   this.diagram.model.addNodeData({
  //     key: "IN", text: "CSV Input", color: "#7fffd4", stroke: "#4d90fe", description: "pd.read_csv(./path-specified-by-user)"
  //   });
  // }

  // addNewComponent2(): void {
  //   this.diagram.model.addNodeData({
  //     key: "FE", text: "Feature Engineering", color: "#f5f5dc", stroke: "#4d90fe", description: "normalizer.fit_transform(x,y)"
  //   });
  // }

}
