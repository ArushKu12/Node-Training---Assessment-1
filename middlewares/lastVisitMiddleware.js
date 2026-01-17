export const trackLastVisit = (req, res, next) => {
  res.locals.lastVisit = req.cookies.lastVisit;
  res.cookie("lastVisit", new Date().toLocaleString());
  next();
};
