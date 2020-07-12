1. 'draggable'을 DOM element에 표기
2. 'dragstart' event를 listen
    - describe operation & append data
    - 어떻게 커서가 변하는지 등등
3. 'dragenter'를 통해 drop을 accept하고 'dragover'는 preventDeafult()를. deafult는 항상 drop operation을 cancel하기 때문.
4. optional 'dragleave' 스타일을 업데이트.
5. 'drop'을 listen하고 data/UI를 업데이트.

drag, drop은 render상에서만 element가 이동할 뿐이므로, javascript로 data/UI를 업데이트해줘야됨.


Events (MDN): https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

Events Reference (MDN): https://developer.mozilla.org/en-US/docs/Web/Events

Event Object (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Event

MDN Drag & Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

