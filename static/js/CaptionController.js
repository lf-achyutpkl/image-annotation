function CaptionController () {
  
  this.displayAddCaptionForm = function(e){
    let modal = document.getElementById('annotorious-editor');

    modal.style.left = e.target.left + 'px';
    modal.style.top = e.target.top + e.target.height + 'px';
    modal.style.opacity = 1;
    modal.style.pointerEvents = 'auto';


    if(true){
      return 'asdf'
    }else {
      return null;
    }
  }
}
