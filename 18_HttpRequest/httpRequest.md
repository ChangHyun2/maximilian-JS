httpRequest

## why use httpRequest?

1. SERVER
getUserInput()
- user가 form 태그를 작성하고 제출하면,
- default로 실행되는 동작을 취소하고 
- 입력에 대한 처리를 js로 작성하고
storeOnServer()
- server로 data를 올림
- httpRequest를 통해 server에 data를 post하고
fetchPosts()

페이지를 새로고침하지 않기 때문에
rerender를 줄이고, 필요한 요소만 추가할 수 있게 됨.

2. API

POST /posts
{title:'..', contnet:'..'}

GET /posts

새로고침되어 리렌더링되는 것을 방지하기 위해
browser의 default 동작을 자르고,
js로 서버와 통신함.
