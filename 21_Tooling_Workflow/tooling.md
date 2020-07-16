
## limitations of 'basic projects'

1. micromanagement of Imports or lots of unnecessary Http Requests
2. unoptimized code (not as small as possible) 공백 변수명 등등
3. sub-optional browser support
4. reload page manually(after changes to code)
5. code quality is not checked

## helpful tools & why use?

| Tool purpose         | Tool name                 | What it does & Why                                      |
| -------------------- | ------------------------- | ------------------------------------------------------- |
| dev server           | serve                     | serve under realistic circumstance                      |
|                      | webpack-dev-server        | serve and auto reload                                   |
| bundling             | webpack                   | combine multiple files into bundled code                |
| code optimization    | webpack optimizer plugins | optimize code(shorten function names, whitespace , ...) |
| code compilation     | babel                     | wirte moden code, get 'older' code as output            |
| code quality checker | ESLint                    | check code quality, check for conventions & patterns    |

## workflow overview

1. development (upon 'save')
2. npm & nodeJS
3. production (upon command)
   
### During development
1. linting(eslint)
2. bundling(webpack)
3. reload dev server

### npm & nodeJS
1. installed globally

### production
1. linting(ESlint)
2. bundling(webpack)
3. compilation(babel)
4. optimization
5. production-ready Code

## serve
just enter `serve`

## npm dependency

### npm init
package.json 생성

### npm install --save-dev
dev dependency를 따를 것을 명시
dev dependency
- third pary를 쓸 거 아니고
- 서버에 업로드 할 거고
- development동안 code를 작성할 것임을 명시 optimize하고 check하고

npm install --save-dev eslint

official docs에서 자세한 configuration 찾아볼 것
  
### package.json & package-lock.json

package.json에는 npm init한 js파일의 dependency를.
package-lock.json에는 package.json의 dependencies를

### how to use ESlint

1. npm init 
2. npm install --save-dev eslint
3. ctrl shift p
4. npx eslint --init
5. 설정 후, 파일 주소
6. json format 선택
7. .eslintrc.json 파일 수정
8. 에러 발생 시 탐색 후 수정 always로 설정 시 무시
9. ctrl shift p fix automatically all errors


### setting

when u use class experimental features, use babel-eslint

npm i -D babel-eslint
'parser' : 'babel-eslint'
https://stackoverflow.com/questions/34244888/how-do-i-configure-eslint-to-allow-fat-arrow-class-methods
