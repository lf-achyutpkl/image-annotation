function Rectangle() {
  this.isListening = false;
  this.started = false;
  this.x = 0;
  this.y = 0;

  this.init = function({ afterDraw }) {
    this.afterDraw = afterDraw;
  };

  this.draw = () => {
    if (!this.isListening) {
      canvas.observe('mouse:down', mousedown);
      canvas.observe('mouse:move', mousemove);
      canvas.observe('mouse:up', mouseup);
      this.isListening = true;
    }
  };

  this.clean = function() {
    this.isListening = false;
    canvas.off('mouse:down', null);
    canvas.off('mouse:move', null);
    canvas.off('mouse:up', null);
  };

  /* Mousedown */
  const mousedown = e => {
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
  };

  /* Mousemove */
  const mousemove = e => {
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

    let square = canvas.getActiveObject();
    square.set('width', w).set('height', h);
    square.set('top', initialTop).set('left', initialLeft);
    canvas.renderAll();
  };

  /* Mouseup */
  const mouseup = e => {
    if (this.started) {
      this.started = false;
    }

    // We can assign our id to this object
    // canvas.getActiveObject().id=your id value;
    // Later we can retrieve object with this id
    // MyObject = canvas.getActiveObject().get('id');
    var square = canvas.getActiveObject();

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
      });
  };
}
