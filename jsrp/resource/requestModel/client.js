$lib.requestModel = (model_name) => {
  let model = GetHashKey(model_name);
  RequestModel(model);
  return new Promise(r => {
    let load = setInterval(() => {
      if (HasModelLoaded(model)) {
        clearInterval(load);
        r();
      }
    }, 50);
  })
};
