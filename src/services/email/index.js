import useAxios from 'hooks/useAxios';
import { date } from 'yup/lib/locale';

export const getAllTemplates = async () => {
  const api = useAxios();
  try {
    return await api.get('/sendgrid/get-all-templates?generations=dynamic&page_size=200');
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
      template_id: templateId
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const creteTemplate = async (templateName, htmlContent, subject, active, version_name, generation) => {
  const api = useAxios();
  try {
    const data = {
      template_name: templateName,
      html_content: htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (version_name) {
      date.version_name = version_name;
    }
    return await api.post('/sendgrid/crete-template', data);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const editTemplate = async (
  templateId,
  templateName,
  htmlContent,
  subject,
  active,
  version_name,
  generation
) => {
  const api = useAxios();
  try {
    const data = {
      template_name: templateName,
      html_content: htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (version_name) {
      date.version_name = version_name;
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
