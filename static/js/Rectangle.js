class Rectangle extends Shape {
  mousedown(e) {
    var mouse = canvas.getPointer(e.e);
    this.started = true;
    this.x = mouse.x;
    this.y = mouse.y;

    var square = new fabric.Rect({
      width: 0,
      height: 0,
      left: this.x,
      top: this.y,
      fill: 'transparent',
      stroke: 'red',
    });

    canvas.renderAll();
    canvas.setActiveObject(square);
  }

  mousemove(e) {
    if (!this.started) {
      return false;
    }

    let mouse = canvas.getPointer(e.e);

    let w = Math.abs(mouse.x - this.x);
    let h = Math.abs(mouse.y - this.y);

    let initialTop = this.y;
    let initialLeft = this.x;

    if (mouse.x < this.x) {
      initialLeft = mouse.x;
    }

    if (mouse.y < this.y) {
      initialTop = mouse.y;
    }

    if (!w || !h) {
      return false;
    }
    console.log('aaaaa');

    let square = canvas.getActiveObject();
    square.set('width', w).set('height', h);
    square.set('top', initialTop).set('left', initialLeft);
    canvas.renderAll();
  }

  mouseup(e) {
    if (this.started) {
      this.started = false;
    }

    // We can assign our id to this object
    // canvas.getActiveObject().id=your id value;
    // Later we can retrieve object with this id
    // MyObject = canvas.getActiveObject().get('id');
    var square = canvas.getActiveObject();

    if (!square) return;

    if (square.height != 0 && square.width != 0) {
      //caption
      let caption = captionController.displayAddCaptionForm(e);
      if (caption) {
        square.caption = caption;
        canvas.add(square);
        eventController.disableEvents(square);
      }
    }
    let id = ++lastId;
    square.set('itemId', id);

    canvas.discardActiveObject();
    canvas.renderAll();
    this.isListening = false;

    if (this.afterDraw)
      this.afterDraw({
        id: id,
        type: 'rectangle',
        left: square.left,
        top: square.top,
        width: square.width,
        height: square.height,
        angle: square.angle,
        scaleX: square.scaleX,
        scaleY: square.scaleY,
      });
  }
}