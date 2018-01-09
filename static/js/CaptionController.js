function CaptionController () {
  
  this.getCaption = function(){
    let action = prompt('Please enter caption for this annotation..');
    if(action){
      return action
    }else {
      return null;
    }
  }
}
