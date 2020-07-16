`npm install --save-dev webpack webpack-cli`
2개 패키지 모두 다운로드

1. webpack.config.js 파일 생성

이 파일은 node.js로 실행됨.

export 키워드 대신, 
module.exports를 사용

```js
module.exports = {

    

}; // configuration에서 exports하면 webpack이 이를 import할 것임.


```

src 폴더 : input files를 넣음. 
app.js가 entry point가 되고, App 내에 app.js에서 사용하는 컴포넌트들이 들어감.

src의 input을 거치면, scripts폴더로 output됨.

require('path'); // node.js에 인스톨된 패키지

config.js까지 작성한 후 

in package.json,
"scripts":{
    "build": "webpack"
}

마치면

npm run build

.js표기 x

entry를 여러개 잡을 경우,

entry:{
    welcome: './src/welcome-page/welcomd.js',
    about: './src/about-page/about.js'
}


## reference 
You can learn more about multiple entry points with these two resources:

Code Splitting (i.e. generating more than one bundle): https://webpack.js.org/guides/code-splitting/

Entry Point Configuration: https://webpack.js.org/concepts/#entry

And in general, check out the official Webpack docs to dive into it in detail: https://webpack.js.org/guides/


## lazy loading
```js
만약 import문을 사용할 경우,

// in ProjectItem.js
class ProjectItem{
//  showMoreInfoHandler() {
//     if (this.hasActiveTooltip) {
//       return;
//     }
//     const projectElement = document.getElementById(this.id);
//     const tooltipText = projectElement.dataset.extraInfo;
    import("./Tooltip.js").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );
    //   tooltip.attach();
    //   this.hasActiveTooltip = true;
    });
  }
}

webpack으로 빌드할 경우 지정한 폴더 위치에 빌드된 파일이 생성되는데
import의 주소와 달라 loading이 되지 않는 문제가 발생

대처법 : public path 설정
```

## web-dev-server

npm i --save-dev webpack-dev-server

```js
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  //   devServer: {
  //   contentBase:'./'
  //   }
};
```
## sourcemap
devtool: webpack에서 제공하는 devtool 종류에 따라 sourcemap이 달라짐.

```js

module.exports = {
    devtools: '';
}
```

## production


```js

// in webpack.config.prod.js,

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-source-map",
  //   devServer: {
  //   contentBase:'./'
  //   }
};

// in package.json,
{  
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server",
    "build:prod": "webpack --config webpack.config.prod.js"
  },
}  

webpack : default config인 webpack.config.js의 module에 명시된 설정을 통해 app.js파일 생성
webpack-dev-server : server를 run하며 저장되는 데이터를 실시간 반영
webpack --config webpack.config.prod.js : prod에 정의된 대로 build
```

## 기존에 webpack에 생성되었던 파일들 지우기

npm i --save-dev webpack-plugin 설치

```js
// in webpack.config.js,

const CleanPlugin = require('clean-webpack-plugin');

// in webpack.config.prod.js

module.exports = {
   output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
   },
   plugins: [new CleanPlugin.CleanWebpackPlugin()]
  }
```

## third party 사용하기

```js
1. package 설치
npm i --save lodash
// dependency에만 추가

2. import하기
import * as _ from 'lodash'; // package에 'lodash'가 있을 경우 import함. 
console.log(_.difference([0,1], [1,2]))

import * as _arr from 'lodash/array'; // package에 'lodash'가 있을 경우 lodash의 array를 import함. 
console.log(_arr.difference([0,1], [1,2]))
```