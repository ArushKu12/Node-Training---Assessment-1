import { v4 as uuid } from "uuid";

const jobs = [];

export const JobModel = {
  create(job) {
    jobs.push({ ...job, id: uuid(), applicants: [] });
  },

  getAll() {
    return jobs;
  },

  getById(id) {
    return jobs.find((j) => j.id === id);
  },

  update(id, data) {
    const job = this.getById(id);
    if (job) Object.assign(job, data);
  },

  delete(id) {
    const index = jobs.findIndex((j) => j.id === id);
    if (index !== -1) jobs.splice(index, 1);
  },

  addApplicant(jobId, applicant) {
    const job = this.getById(jobId);
    job.applicants.push({ ...applicant, id: uuid() });
  },
};
