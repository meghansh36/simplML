import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private designPipelineObj: any;

  edgeHandleSettings = {
    preview: true, // whether to show added edges preview before releasing selection
    hoverDelay: 150, // time spent hovering over a target node before it is considered selected
    handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
    snap: false, // when enabled, the edge can be drawn by just moving close to a target node
    snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
    snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
    noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
    disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
    handlePosition: function( node ){
      return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
    },
    handleInDrawMode: false, // whether to show the handle in draw mode
    edgeType: function( sourceNode, targetNode ){
      // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
      // returning null/undefined means an edge can't be added between the two nodes
      return 'flat';
    },
    loopAllowed: function( node ){
      // for the specified node, return whether edges from itself to itself are allowed
      return false;
    },
    nodeLoopOffset: -50, // offset for edgeType: 'node' loops
    nodeParams: function( sourceNode, targetNode ){
      // for edges between the specified source and target
      // return element object to be passed to cy.add() for intermediary node
      return {};
    },
    edgeParams: function( sourceNode, targetNode, i ){
      // for edges between the specified source and target
      // return element object to be passed to cy.add() for edge
      // NB: i indicates edge index in case of edgeType: 'node'
      return {};
    },
    ghostEdgeParams: function(){
      // return element object to be passed to cy.add() for the ghost edge
      // (default classes are always added for you)
      return {};
    },
    show: function( sourceNode ){
      // fired when handle is shown
    },
    hide: function( sourceNode ){
      // fired when the handle is hidden
    },
    start: function( sourceNode ){
      // fired when edgehandles interaction starts (drag on handle)
    },
    complete: function( sourceNode, targetNode, addedEles ){
      // fired when edgehandles is done and elements are added
    },
    stop: function( sourceNode ){
      // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
    },
    cancel: function( sourceNode, cancelledTargets ){
      // fired when edgehandles are cancelled (incomplete gesture)
    },
    hoverover: function( sourceNode, targetNode ){
      // fired when a target is hovered
    },
    hoverout: function( sourceNode, targetNode ){
      // fired when a target isn't hovered anymore
    },
    previewon: function( sourceNode, targetNode, previewEles ){
      // fired when preview is shown
    },
    previewoff: function( sourceNode, targetNode, previewEles ){
      // fired when preview is hidden
    },
    drawon: function(){
      // fired when draw mode enabled
    },
    drawoff: function(){
      // fired when draw mode disabled
    }
  };

  ctxSettings = {
    menuRadius: 70, // the radius of the circular menu in pixels
    selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
    commands: [ // an array of commands to list in the menu or a function that returns the array
 // an array of commands to list in the menu or a function that returns the array
        {
          fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          content: '<i class="tim-icons icon-trash-simple"></i>', // html/text content to be displayed in the menu
          contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          select: (ele) => { // a function to execute when the command is selected
          },
          enabled: true // whether the command is selectable
        },
        
        {
          fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          content: '<i class="tim-icons icon-settings"></i>', // html/text content to be displayed in the menu
          contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          select: (ele) => { // a function to execute when the command is selected
            console.log(ele.data())
            if (ele.data().parentCategory === 'data') {
              console.log('in if')
              this.openDataForm();
            }
          },
          enabled: true // whether the command is selectable
        }
      
    ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
    activePadding: 20, // additional size in pixels for the active command
    indicatorSize: 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 28, // the maximum radius in pixels of the spotlight
    openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    zIndex: 9999, // the z-index of the ui div
    atMouse: false // draw menu at mouse position
  };
  constructor() { }

  setDesignPipelineObject(obj) {
    this.designPipelineObj = obj;
  }

  openDataForm() {
    console.log('here')
    this.designPipelineObj.openDataForm()
  }
}
