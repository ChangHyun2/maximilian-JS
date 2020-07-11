const ATTACK_VALUE = 10;
// never change > ATTACK_VALUE (global value인 것을 명시화)
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTCK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME OVER';

let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
  const enteredvalue = prompt(
    'type your maximum health value for you and the monster',
    '100'
    // prompt('alert string', default 입력값)
  );
  const parsedValue = parseInt(enteredvalue);
  //javascript에서는, enteredvalue가 parseInt할 수 없더라도, error가 발생하지 않고, isNaN이 출력됨.

  //chosenMaxLife는 user가 webpage에서 값을 할당할 예정.
  //따라서, global value가 아님.
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw 'error occured!';
    throw { message: 'invalid user input, not a number!' };
    //throw error 어떤 형태든 올 수 있음.
    //error발생 시, throw로 여러 타입을 throw한다.
  }
  return parsedValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('you entered something wrong, deault value of 100 was used');
}
// finally{

// }
//try > finally , try > catch > finally 모두 가능
//try > catch error > throw error > finally 이런 structure를 사용하기도 함.
//위 structure는 서버와의 연동에서 필요한 구조로, 이 후에 배움

// #3.110 Quiz
/*

try-catch가 handle할 수 있는 eror는?
  network errors.
There are errors (like network errors) which are beyond your control - handle them via try-catch to avoid runtime script crashes and possibly provide a fallback.

what goes into the try{} block?
  the code that could throw an error

what goes into the catch{} block?
  the error handling and fallback logic

*/

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };

  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        finalPlayerHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

//   if (ev === LOG_EVENT_PLAYER_ATTACK) {
//     logEntry.target = 'MONSTER';
//   } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
//     logEntry = {
//       event: ev,
//       value: val,
//       target: 'MONSTER',
//       finalMonsterHealth: monsterHealth,
//       finalPlayerHealth: playerHealth
//     };
//   } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
//     logEntry = {
//       event: ev,
//       value: val,
//       target: 'PLAYER',
//       finalMonsterHealth: monsterHealth,
//       finalPlayerHealth: playerHealth
//     };
//   } else if (ev === LOG_EVENT_PLAYER_HEAL) {
//     logEntry = {
//       event: ev,
//       value: val,
//       target: 'PLAYER',
//       finalMonsterHealth: monsterHealth,
//       finalPlayerHealth: playerHealth
//     };
//   } else if (ev === LOG_EVENT_GAME_OVER) {
//     logEntry = {
//       event: ev,
//       value: val,
//       finalPlayerHealth: monsterHealth,
//       finalPlayerHealth: playerHealth
//     };
//   }
//   battleLog.push(logEntry);
// }

// function attackMonster(attackIntensity) {
//   const damage = dealMonsterDamage(attackIntensity);
//   //local constant
//   currentMonsterHealth -= damage;

//   const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
//   currentPlayerHealth -= PlayerDamage;
//   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
//     alert('you won!');
//   } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
//     alert('you lost!');
//   } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
//     alert('you have a draw!');
//   }
// }

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
  //removeBonusLife에서 요소를 없애서 bonuslife는 복구 못 해.
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('you would be daed but the bonus life saved you!');
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('you won!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('you lost!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('you have a draw!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAw!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  // 삼항식 안에 들어가는 값들을 nesting할 수 있다.
  let logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTCK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  const damage = dealMonsterDamage(maxDamage);
  //local constant
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

// function attackHandler() {
//   attackMonster(ATTACK_VALUE);
// }
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

// function strongAttackHandler() {
//   attackMonster(STRONG_ATTACK_VALUE);
// }
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTCK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('you cant heal to more than your max initial increasePlayerHealth.');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }

  // for (const index of battleLog) {
  //   console.log(index);
  // }

  i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      //battleLog는 배열
      for (const key in logEntry) {
        //logEntry는 객체
        console.log(`${key} : ${logEntry[key]}`);
        //logEntry.key를 하게 되면, undefined가 출력됨.
        // for문에서, key를 string으로 받기 때문에, .key를하면 error발생.
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
  console.log(battleLog);
}

function breakLoop() {
  let j = 0;
  outerWhile: do {
    console.log('outer', j);
    innerFor: for (let k = 0; k < 5; k++) {
      if (k === 3) {
        break outerWhile;
        continue outerWhile; // dangerous outerwhile로 돌아가기 때문에
        //아래에 있는 j++에 도달할 수 없어서 loop가 inifinite가 됨
      }
      console.log('inner', k);
    }
    j++;
  } while (j < 3);
}
breakLoop();
// labeled statements

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

/* for문의 유형

for loop
>> 정해진 횟수 동안
for of loop
>> array에 사용, 배열의 각 요소에 대해 같은 반복문 적용
for(const el of array){
  el이 각 어레이의 0번째부터 마지막번째까지를 나타냄
}
for in loop
>> object에 사용, 객체의 각 요소에 대해 같은 반복문을 적용
for(const key in obj){
  console.log(key);
  console.log(obj[key]);
}
while loop
>> condition이 true일 때까지 실행
while(!finished){
  let finished = false;
  let rndNumbers = [];
  const rndNumber = Math.random();
  const rndNumbers.push(rndNumber);
  if(rndNumber>0.5){
    finished=true;
    console.logrndNumbers;
  }
}
do while loop
let j=3;
do{
  console.log(j);
  j++;
}while(j<3);

*/
