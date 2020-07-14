// const axios = require("axios").default;
// module로 불렀을 경우

async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/tos/1"
    );
  } catch (e) {
    console.dir(e);
    console.log(e);
    alert(e);
  }
}
fetchPosts();
// axios library는 statuscode에 대한 에러처리를 포함하고 있음.

// GET
axios
  .get("https://jsonplaceholder.typicode.com/tos/1")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  })
  .then(() => {
    console.log("always execute");
  });

// with async
async function getPosts() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/tos/1");
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

// POST
axios
  .post("/posts", {
    firstName: "jun",
    lastName: "changhyun",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

function getUserAccount() {
  return axios.get("/user/1234");
}
function getUserPermissions() {
  return axios.get("/user/12345/permission");
}
Promise.all([getUserAccount(), getUserPermissions()]).then(function (res) {
  const [acct, perm] = res;
  console.log(acct, perm);
});

// request with config

axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "jun",
    lastName: "changhyun",
  },
});
axios({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responsType: "stream",
}).then(function (res) {
  res.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});

//https://github.com/axios/axios
