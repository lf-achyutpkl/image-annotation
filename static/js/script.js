let canvas = new fabric.Canvas('canvas');
let captionController = new CaptionController();
// let eventController = new EventController();
// let rectangle = new Rectangle();
// let circle = new Circle();

// let $annModal = document.getElementById('annotorious-editor');
// let $annModalInput = $annModal.getElementsByTagName('textarea')[0];

// let annModal = {
//   position: {
//     left: 0,
//     top: 0,
//   },
//   elem: $annModal,
//   inputElem: $annModalInput,
// };

let selectedItemId = null;
let lastId = 0; // Used for temporary UI id generation

// let data = {
//   width: 0,
//   height: 0,
//   items: {},
// };

// rectangle.init({
//   afterDraw: addItem,
// });
//
// circle.init({
//   afterDraw: addItem,
// });

// canvas.observe('object:selected', function(e) {
//   if (e.target.caption) {
//     console.log(e.target.caption, 111);
//   }
// });
//
// canvas.on('mouse:over', function(e) {
//   console.log('mouse enter', e);
//   document.getElementById('selectedCaption').innerHTML = selectedItemId;
//
//   let itemId = e.target.itemId;
//   if (!itemId) hideAnnModal();
//
//   showAnnModal(itemId);
// });
//
// canvas.on('mouse:out', function(e) {
//   console.log('mouse out');
//
//   document.getElementById('selectedCaption').innerHTML = 'Dummy Text';
//   hideAnnModal();
// });
//
// canvas.on('object:rotating', e => {
//   let itemId = e.target.itemId;
//   if (!itemId) return;
//   updateItem(itemId, e);
// });
//
// canvas.on('object:moving', e => {
//   let itemId = e.target.itemId;
//   if (!itemId) return;
//   updateItem(itemId, e);
// });
//
// canvas.on('object:scaling', e => {
//   let itemId = e.target.itemId;
//   if (!itemId) return;
//   updateItem(itemId, e);
// });

// enableDrawRect = () => {
//   rectangle.clean();
//   circle.clean();
//   rectangle.draw();
// };

// enableDrawCircle = () => {
//   rectangle.clean();
//   circle.clean();
//   circle.draw();
// };

// enableMovement = () => {
//   rectangle.clean();
//   circle.clean();
//   canvas.getObjects().forEach(function(o) {
//     console.log('herer', o);
//     eventController.enableEvents(o);
//   });
// };

// saveAnn = () => {
//   if (!selectedItemId) return;
//   data.items[selectedItemId].caption = annModal.inputElem.value;
//   hideAnnModal();
// };

deleteAnn = () => {};

// POC for rendering saved annotation
// var json = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":504,"top":145,"width":159,"height":160,"fill":"transparent","stroke":"red","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0}]}'
// canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));

// showAnnModal = itemId => {
//   console.log('show modal');
//   console.log(itemId, data);
//
//   selectedItemId = itemId;
//
//   let item = data.items[itemId];
//   if (!item) return;
//   let { top, left, height, caption } = item;
//
//   annModal.position.top = top;
//   annModal.position.left = left;
//
//   annModal.elem.style.left = left + 'px';
//   annModal.elem.style.top = top + height - 7 + 'px';
//   annModal.elem.style.opacity = 1;
//   annModal.elem.style.pointerEvents = 'auto';
//
//   annModal.inputElem.value = caption || null;
// };

hideAnnModal = () => {
  console.log('hide modal');
  // selectedItemId = null;
  annModal.elem.style.opacity = 0;
  annModal.elem.style.pointerEvents = 'none';
  annModal.inputElem.value = null;
};

// function addItem(item) {
//   console.log(data, 111);
//   data.items[item.id] = item;
// }

// function saveState() {
//   localStorage.setItem('annData', JSON.stringify(data));
// }

// function loadState() {
//   data = JSON.parse(localStorage.getItem('annData'));
//
//   Object.keys(data.items).forEach(itemId => {
//     var item = data.items[itemId];
//     var shape = null;
//     if (item.type === 'rectangle') {
//       shape = new fabric.Rect({
//         width: item.width,
//         height: item.height,
//         left: item.left,
//         top: item.top,
//         fill: 'transparent',
//         stroke: 'red',
//         angle: item.angle,
//         scaleX: item.scaleX,
//         scaleY: item.scaleY,
//       });
//     }
//     if (item.type === 'circle') {
//       shape = new fabric.Circle({
//         radius: item.radius,
//         left: item.left,
//         top: item.top,
//         fill: 'transparent',
//         stroke: 'red',
//         angle: item.angle,
//         scaleX: item.scaleX,
//         scaleY: item.scaleY,
//       });
//     }
//
//     shape.set('itemId', itemId);
//     canvas.add(shape);
//     lastId = lastId < itemId ? itemId : lastId;
//   });
// }

// function updateItem(itemId, e) {
//   let target = e.target;
//   if (!target) return;
//   let item = data.items[itemId];
//   item.width = target.width;
//   item.height = target.height;
//   item.left = target.left;
//   item.top = target.top;
//   item.angle = target.angle;
//   item.scaleX = target.scaleX;
//   item.scaleY = target.scaleY;
//   data.items[itemId] = item;
// }
