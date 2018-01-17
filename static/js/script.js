let canvas = new fabric.Canvas('canvas');
let captionController = new CaptionController();
let eventController = new EventController();
let rectangle = new Rectangle();

let $annModal = document.getElementById('annotorious-editor');
let $annModalInput = $annModal.getElementsByTagName('textarea')[0];

let annModal = {
  position: {
    left: 0,
    top: 0,
  },
  elem: $annModal,
  inputElem: $annModalInput,
};

let selectedItemId = null;
let lastId = 0; // Used for temporary UI id generation

let data = {
  width: 0,
  height: 0,
  items: {},
};

rectangle.init({
  afterDraw: addItem,
});

canvas.observe('object:selected', function(e) {
  if (e.target.caption) {
    console.log(e.target.caption, 111);
  }
});

canvas.on('mouse:over', function(e) {
  console.log('mouse enter', e);
  document.getElementById('selectedCaption').innerHTML = selectedItemId;

  let itemId = e.target.itemId;
  if (!itemId) hideAnnModal();

  showAnnModal(itemId);
});

canvas.on('mouse:out', function(e) {
  console.log('mouse out');

  document.getElementById('selectedCaption').innerHTML = 'Dummy Text';
  hideAnnModal();
});

enableDrawRect = () => {
  rectangle.draw();
};

enableMovement = () => {
  rectangle.clean();
  canvas.getObjects().forEach(function(o) {
    console.log('herer', o);
    eventController.enableEvents(o);
  });
};

saveAnn = () => {
  console.log(selectedItemId, 111);
  if (!selectedItemId) return;
  data.items[selectedItemId].caption = annModal.inputElem.value;
  hideAnnModal();
};

deleteAnn = () => {};

// POC for rendering saved annotation
// var json = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":504,"top":145,"width":159,"height":160,"fill":"transparent","stroke":"red","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0}]}'
// canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));

showAnnModal = itemId => {
  console.log('show modal');

  selectedItemId = itemId;

  let item = data.items[itemId];
  let { top, left, height, caption } = item;

  annModal.position.top = top;
  annModal.position.left = left;

  annModal.elem.style.left = left + 'px';
  annModal.elem.style.top = top + height - 7 + 'px';
  annModal.elem.style.opacity = 1;
  annModal.elem.style.pointerEvents = 'auto';

  annModal.inputElem.value = caption || null;
};

hideAnnModal = () => {
  console.log('hide modal');
  // selectedItemId = null;
  annModal.elem.style.opacity = 0;
  annModal.elem.style.pointerEvents = 'none';
  annModal.inputElem.value = null;
};

function addItem(item) {
  data.items[item.id] = item;
  console.log(data);
}

function saveState() {
  localStorage.setItem('annData', JSON.stringify(data));
}

function loadState() {
  data = JSON.parse(localStorage.getItem('annData'));
  console.log(data, 111);
  Object.keys(data.items).forEach(itemId => {
    var item = data.items[itemId];
    var square = new fabric.Rect({
      width: item.width,
      height: item.height,
      left: item.left,
      top: item.top,
      fill: 'transparent',
      stroke: 'red',
    });
    square.set('itemId', itemId);
    canvas.add(square);
  });
}
