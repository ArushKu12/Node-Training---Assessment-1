import { JobModel } from "../models/JobModel.js";
import { transporter } from "../config/mailer.js";

export const listJobs = (req, res) => {
  const q = req.query.q || "";
  const jobs = JobModel.getAll().filter((j) =>
    j.title.toLowerCase().includes(q.toLowerCase())
  );
  res.render("jobs/list", { jobs, user: req.session.user });
};

export const createJob = (req, res) => {
  JobModel.create({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    recruiterId: req.session.user.id,
  });
  res.redirect("/jobs");
};

export const updateJob = (req, res) => {
  JobModel.update(req.params.id, req.body);
  res.redirect("/jobs");
};

export const deleteJob = (req, res) => {
  JobModel.delete(req.params.id);
  res.redirect("/jobs");
};

export const applyJob = (req, res) => {
  JobModel.addApplicant(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    resume: req.file.path,
  });

  transporter.sendMail({
    to: req.body.email,
    subject: "Application Submitted",
    text: "Your application was received successfully.",
  });

  res.send("Applied successfully");
};
