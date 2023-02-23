const responseList = {};

function response(event) {
  const source = GetPlayerServerId(PlayerId());
  if (!responseList[event]) {
    log("[RES] NEW " + event);
    responseList[event] = [];
    onNet(`${event}:response`, (res) => {
      log(`[RES] ${source} ${event} DONE`);
      responseList[event].push(res);
    });
  }
}

function request(resource, action, args = []) {
  const event = `${resource}:${action}`;
  const source = GetPlayerServerId(PlayerId());
  const ID = Date.now();
  log(`[REQ] ${source} ${event}`);
  response(event);
  let cancel;
  let search;
  return new Promise((resolve) => {
    emitNet(event, {
      source: source,
      args: args,
      ts: ID,
    });
    cancel = setTimeout(() => {
      resolve({
        error: true,
        message: "timeout 3000ms",
      });
    }, 3000);
    /*
            search
        */
    search = setInterval(() => {
      let check = responseList[event].findIndex((res) => res.id == ID);
      if (check != -1) {
        let res = responseList[event][check];
        responseList[event].splice(check, 1);
        clearTimeout(cancel);
        clearInterval(search);
        resolve(res.data);
      }
    }, 20);
    // if (responseList[event]) {
    //     log("[RES] OLD " + event);
    //     responseList[event] = `${event}:response`
    // } else {
    //     log("[RES] NEW " + event);
    //     responseList[event] = `${event}:response`
    //     onNet(`${event}:response`, (res) => {
    //         log(`[RES] ${source} ${event} DONE`);
    //         // clearTimeout(cancel)
    //         // responseList[event](source, args)
    //         resolve(res);
    //     });
    // }
  });
}

$lib.request = request;
