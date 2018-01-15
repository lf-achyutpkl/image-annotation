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

    canvas.renderAll();
    canvas.setActiveObject(square); 
  }


  /* Mousemove */
  function mousemove(e) {
    if(!this.started) {
        return false;
    }

    let mouse = canvas.getPointer(e.e);

    let w = Math.abs(mouse.x - this.x);
    let h = Math.abs(mouse.y - this.y);

    let initialTop = this.y;
    let initialLeft = this.x;

    if(mouse.x < this.x){
      initialLeft = mouse.x;
    }

    if(mouse.y < this.y){
      initialTop = mouse.y;
    }

    if (!w || !h) {
        return false;
    }

    let square = canvas.getActiveObject(); 
    square.set('width', w).set('height', h);
    square.set('top', initialTop).set('left', initialLeft);
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

    if(square.height != 0 && square.width != 0){
      
      //caption
      let caption = captionController.displayAddCaptionForm(e);
      if(caption){
        square.caption = caption;
        canvas.add(square);
        eventController.disableEvents(square);
      }
    }

    canvas.discardActiveObject();
    canvas.renderAll();
    this.isListening = false;
  }
}