export const validateJob = (req, res, next) => {
  const { title, company, description } = req.body;
  if (!title || !company || !description) {
    return res.send("All fields are required");
  }
  next();
};
