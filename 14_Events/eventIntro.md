
# Event?

event에 따라 code를 실행.

## implementation

브라우저 : DOMNode.addEventListener()
nodeJS : Object.on()

## do what?

addEventListener('..', event=>...);
addEventListener('..', event=>...);

data를 전달.

## Browser event Objects

event
  - MouseEvent
    - coordinates
    - event target
  - DragEvent
    - extra data
    - event target
  - KeyEvent
  - ...
    - event target (common)

