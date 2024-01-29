import useAxios from 'hooks/useAxios';
import { date } from 'yup/lib/locale';

export const getAllTemplates = async () => {
  const api = useAxios();
  try {
    return await api.get('/sendgrid/get-all-templates?generations=dynamic&pageSize=200');
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getTemplate = async (id) => {
  const api = useAxios();
  try {
    return await api.get(`/sendgrid/${id}`);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const sendCustomEmail = async (emails, customEmailTemplate, subject) => {
  const api = useAxios();
  try {
    return await api.post('/sendgrid/send-user-custom-email', {
      emails,
      customEmailTemplate,
      subject
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const sendTemplateEmails = async (emails, templateId) => {
  const api = useAxios();
  try {
    return await api.post('/sendgrid/send-user-template-email', {
      emails,
      templateId
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const creteTemplate = async (templateName, htmlContent, subject, active, versionName, generation) => {
  const api = useAxios();
  try {
    const data = {
      templateName,
      htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (versionName) {
      date.versionName = versionName;
    }
    return await api.post('/sendgrid/crete-template', data);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const editTemplate = async (templateId, templateName, htmlContent, subject, active, versionName, generation) => {
  const api = useAxios();
  try {
    const data = {
      templateName: templateName,
      htmlContent: htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (versionName) {
      date.versionName = versionName;
    }
    return await api.patch(`/sendgrid/${templateId}`, data);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteTemplate = async (templateId) => {
  const api = useAxios();
  try {
    return await api.delete(`/sendgrid/${templateId}`);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
