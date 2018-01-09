function Rectangle(){
  this.isListening = false;
  this.started = false;
  this.x = 0;
  this.y = 0;

  this.init = function(){
    if(!this.isListening){
      canvas.observe('mouse:down', function(e) { mousedown(e); });
      canvas.observe('mouse:move', function(e) { mousemove(e); });
      canvas.observe('mouse:up', function(e) { mouseup(e); });
      this.isListening = true;
    }
  }

  this.clean = function(){
    this.isListening = false;
    canvas.off('mouse:down', null)
    canvas.off('mouse:move', null)
    canvas.off('mouse:up', null)
  }

  /* Mousedown */
  function mousedown(e) {
    var mouse = canvas.getPointer(e.e);
    this.started = true;
    this.x = mouse.x;
    this.y = mouse.y;

    var square = new fabric.Rect({ 
        width: 0, 
        height: 0, 
        left: x, 
        top: y, 
        fill: 'transparent',
        stroke: 'red'
    });

    // canvas.add(square); 
    canvas.renderAll();
    canvas.setActiveObject(square); 
  }


  /* Mousemove */
  function mousemove(e) {
    if(!this.started) {
        return false;
    }

    var mouse = canvas.getPointer(e.e);

    var w = Math.abs(mouse.x - this.x),
    h = Math.abs(mouse.y - this.y);

    if (!w || !h) {
        return false;
    }

    var square = canvas.getActiveObject(); 
    square.set('width', w).set('height', h);
    canvas.renderAll(); 
  }

  /* Mouseup */
  function mouseup(e) {
    if(this.started) {
      this.started = false;
    }

    // We can assign our id to this object
    // canvas.getActiveObject().id=your id value;
    // Later we can retrieve object with this id
    // MyObject = canvas.getActiveObject().get('id');
    var square = canvas.getActiveObject();
    
    //caption
    let caption = captionController.getCaption();
    if(caption){
      square.caption = caption;
      canvas.add(square);
      eventController.disableEvents(square);
    }

    canvas.discardActiveObject();
    canvas.renderAll();
    this.isListening = false;
  }
}