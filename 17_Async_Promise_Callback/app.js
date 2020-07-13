const btn = document.querySelector("button");
btn.addEventListener("click", trackUserHandler);

const getPosition = (opts) => {
  const promise = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        res(success);
      },
      (error) => {},
      opts
    );
  });
  return promise;
};

const setTimer = (duration) =>
  new Promise((res, rej) => setTimeout(() => res("done!"), duration));

// error 처리방법 1 : execute promise().then(responseHandler, errorHandler)
function trackUserHandler() {
  let positionData;
  getPosition()
    .then(
      (posData) => {
        positionData = posData;
        return setTimer();
      },
      (err) => console.log(err)
    )
    .then(
      (data) => console.log(data, positionData),
      (err) => console.log(err)
    );

  setTimer(1000).then(() => console.log("timer done"));
  console.log("getting position..");
}

// error 처리방법 2 : execute promise().catch(errorHandler).then(responseHandler); catch의 위치는 자유롭게 지정.
function trackUserHandler() {
  let positionData;
  getPosition()
    .catch((err) => {
      console.log(err); // catch의 위치는 자유롭게 올 수 있어.
    })
    .then((posData) => {
      positionData = posData;
      return setTimer();
    })
    .then(
      (data) => console.log(data, positionData),
      (err) => console.log(err)
    );

  setTimer(1000).then(() => console.log("timer done"));
  console.log("getting position..");
}
/*
catch(e=>console.log(e)) // catch문에서 return할 경우, return을 resolve하는 new Promise를 실행하여 다음 then에서 처리. 
.then(data=>console.log(data))

promise()
.then(data=>console.log(data))
catch(e=>console.log(e)) // error가 발생해도 다음 then을 계속 이어 나가게 됨.
.then(data=>console.log(data))
.then(data=>console.log(data))

promise()
.then(data=>console.log(data))
.then(data=>console.log(data))
.then(data=>console.log(data))
catch(e=>console.log(e)) // 이렇게 위치하면, 앞에서 error가 발생할 떄 다음 then이 실행되지 않고 바로 catch문으로 넝어옴.

promise()
.then(data=>console.log(data))
catch(e=>console.log(e)) // error가 발생해도 다음 then을 계속 이어 나가게 됨.
.then(data=>console.log(data))
catch(e=>console.log(e)) // error가 발생해도 다음 then을 계속 이어 나가게 됨.
.then(data=>console.log(data))

You learned about the different promise states:

PENDING => Promise is doing work, neither then() nor catch() executes at this moment
RESOLVED => Promise is resolved => then() executes
REJECTED  => Promise was rejected => catch() executes

When you have another then() block after a catch() or then() block, the promise re-enters PENDING mode
(keep in mind: then() and catch() always return a new promise - 
either not resolving to anything or resolving to what you return inside of then()). 
Only if there are no more then() blocks left, it enters a new, final mode: SETTLED.

Once SETTLED, you can use a special block - finally() - to do final cleanup work. 
finally() is reached no matter if you resolved or rejected before.

Here's an example:

somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
You don't have to add a finally() block (indeed we haven't in the lectures).

*/

// // promise로 구현될 뿐
// async function trackUserHandler() {
//   const posData = await getPos();
//   const timerData = await setTime(2000);
//   console.log(timerData, posData);
// }

// 근데.. 에러 핸들링은요?
async function trackUserHandler() {
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch {
    error;
  }
  console.log(posData);
  console.log(timerData);

  setTimer(1000).then(() => {
    console.log("as soon as possible");
  });
  // 순차적으로 실행하기 때문에, setTimer는 await가 모두 끝난 후에 실행됨.
}

// 두 프로미스 중 앞서 resolve된 값만 처리
Promise.race([getPosition(), setTimer(100)]).then((data) => console.log(data));

Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
Promise.allSettled([getPosition(), setTimer(1000)]).then((data) =>
  console.log(data)
);
