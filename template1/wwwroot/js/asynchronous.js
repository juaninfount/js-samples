"use strict";

(() => {
  const doBlock = function () {
    // (A)
    displayStatus("Blocking...");
    mySleep(5000); // (B)
    displayStatus("Done");
  };

  const mySleep = function (milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
  };

  const displayStatus = function (status) {
    document.getElementById("statusMessage").textContent = status;
  };

  const timeout = function(){
    console.log('start');
    setTimeout(() => {
      console.log('callback');
    }, 0);
    console.log('end');
  };

  const init = function () {
    document.getElementById("block").addEventListener("click", doBlock);
    timeout();
  };

  const dbBrowser = function(){
    const openRequest = indexedDB.open('MyDatabase',1);
    openRequest.onsuccess = (event) => {
      const db = event.target.result;
    };

    openRequest.onerror = (event) => {
      console.error(error);
    };
  };

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open('GET', 'https://restcountries.com/v3.1/name/aruba?fullText=true');
  xhr.onload = () => {
    if(xhr.status === 200){
        processData(xhr.responseText);
    }else {
      console.error(new Error(xhr.statusText));
    }
  };

  xhr.onerror = () => {
    console.error(new Error('Network error'));
  };

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
  xhr.send();

  const processData = function(str){
    console.log(str);
  };

  init();

  return {
    doBlock: doBlock
  };
})();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

/*
function assertExamples() {
  const myArr = ["Orange", "Banana", "Mango", "Kiwi"];
  console.assert(x + y == 11, myArr);
} */

const main = {
  divideCallback: (12, 3,
    (err, result) => {
      if (err) {
        console.error("error");
      } else {
        console.log(result + " " + 4);
      }
    }),
};

function dividePromise(x, y) {
  return x / y;
}

function promise2() {
  // dividePromise(12, 3)
  //   .then((result) => assert.equal(result, 4))
  //   .catch((err) => assert.fail(err));
}

const slowAPI = {
  getUsers: (callback) => {
    setTimeout(() => {
      callback(null, {
        status: "OK",
        data: {
          users: [
            {
              name: "Miku",
            },
            {
              name: "Len",
            },
            {
              name: "Kaito",
            },
            {
              name: "Luka",
            },
          ],
        },
      });
    }, 1000);
  },
  getCart: (username, callback) => {
    setTimeout(() => {
      if (username === "Miku") {
        callback(null, {
          status: "OK",
          data: {
            cart: ["Leek", "Cake"],
          },
        });
      } else if (username === "Rin") {
        callback(null, {
          status: "OK",
          data: {
            cart: ["Banana", "Cake"],
          },
        });
      } else if (username === "Kaito") {
        callback(null, {
          status: "OK",
          data: {
            cart: ["Ice Cream", "Cake"],
          },
        });
      } else {
        callback(new Error("User not found"));
      }
    }, 500);
  },
};

function runRequests() {
  slowAPI.getUsers((error, response) => {
    if (error) {
      console.error("Error occured when running getUsers");
      throw new Error("Error occurred");
    }
    slowAPI.getCart(response.data.users[3].name, (error, result) => {
      if (error) {
        console.error(error);
        throw new Error("Error occurred");
      }
      console.log(result);
    });
  });
}

//assertExamples();
main.divideCallback();
promise2();
//runRequests();
