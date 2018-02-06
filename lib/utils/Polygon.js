import Shape from './Shape';
import { fabric } from 'fabric';

var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas;
var pointArray = new Array();
var line;

export default class Polygon extends Shape {
  mousedown(options) {
    if (options.target && options.target.id == pointArray[0].id) {
      this.generatePolygon(pointArray);
    }
    if (polygonMode) {
      this.addPoint(options);
    }
  }

  mousemove(options) {
    if (activeLine && activeLine.class == 'line') {
      var pointer = this.canvas.getPointer(options.e);
      activeLine.set({ x2: pointer.x, y2: pointer.y });

      var points = activeShape.get('points');
      points[pointArray.length] = {
        x: pointer.x,
        y: pointer.y,
      };
      activeShape.set({
        points: points,
      });
      this.canvas.renderAll();
    }
    this.canvas.renderAll();
  }

  mouseup(e) {}

  drawPolygon() {
    polygonMode = true;
    pointArray = new Array();
    lineArray = new Array();
    activeLine;
  }

  addPoint(options) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    var id = new Date().getTime() + random;
    var circle = new fabric.Circle({
      radius: 5,
      fill: '#ffffff',
      stroke: '#333333',
      strokeWidth: 0.5,
      left: options.e.layerX / this.canvas.getZoom(),
      top: options.e.layerY / this.canvas.getZoom(),
      selectable: false,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      id: id,
    });
    if (pointArray.length == 0) {
      circle.set({
        fill: 'red',
      });
    }
    var points = [
      options.e.layerX / this.canvas.getZoom(),
      options.e.layerY / this.canvas.getZoom(),
      options.e.layerX / this.canvas.getZoom(),
      options.e.layerY / this.canvas.getZoom(),
    ];
    line = new fabric.Line(points, {
      strokeWidth: 2,
      fill: '#999999',
      stroke: '#999999',
      class: 'line',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
    });
    if (activeShape) {
      var pos = this.canvas.getPointer(options.e);
      var points = activeShape.get('points');
      points.push({
        x: pos.x,
        y: pos.y,
      });
      var polygon = new fabric.Polygon(points, {
        stroke: '#333333',
        strokeWidth: 1,
        fill: '#cccccc',
        opacity: 0.1,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
      });
      this.canvas.remove(activeShape);
      this.canvas.add(polygon);
      activeShape = polygon;
      this.canvas.renderAll();
    } else {
      var polyPoint = [
        {
          x: options.e.layerX / this.canvas.getZoom(),
          y: options.e.layerY / this.canvas.getZoom(),
        },
      ];
      var polygon = new fabric.Polygon(polyPoint, {
        stroke: '#333333',
        strokeWidth: 1,
        fill: '#cccccc',
        opacity: 0.1,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
      });
      activeShape = polygon;
      this.canvas.add(polygon);
    }
    activeLine = line;

    pointArray.push(circle);
    lineArray.push(line);

    this.canvas.add(line);
    this.canvas.add(circle);
    this.canvas.selection = false;
  }

  generatePolygon(pointArray) {
    var points = new Array();
    pointArray.forEach((point, index) => {
      points.push({
        x: point.left,
        y: point.top,
      });
      this.canvas.remove(point);
    });
    lineArray.forEach((line, index) => {
      this.canvas.remove(line);
    });
    this.canvas.remove(activeShape).remove(activeLine);
    var polygon = new fabric.Polygon(points, {
      stroke: '#333333',
      strokeWidth: 0.5,
      fill: 'red',
      opacity: 1,
      hasBorders: false,
      hasControls: false,
    });
    this.canvas.add(polygon);
    console.log(polygon);

    activeLine = null;
    activeShape = null;
    polygonMode = false;
    this.canvas.selection = true;

    if (this.afterDraw)
      this.afterDraw(
        {
          type: 'polygon',
          points: points,
          left: polygon.left,
          top: polygon.top,
        },
        id => {
          polygon.set('itemId', id);
        },
      );
  }
}
