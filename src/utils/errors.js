export const wrapAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((e) =>
    res.status(200).json({ status: false, message: e?.message })
  );
};

export const toAsyncRouter = (router) => {
  const methods = [
    "get",
    "post",
    "delete", // & etc.
  ];
  for (let key in router) {
    if (methods.includes(key)) {
      let method = router[key];
      router[key] = (path, ...callbacks) =>
        method.call(router, path, ...callbacks.map((cb) => wrapAsync(cb)));
    }
  }
  return router;
};
