import isEmpty from "./is-empty";

const validateExcelUploadInput = (files) => {
  const errors = {};

  errors.issues = [];

  const invalid = isValidType(files);
  if (invalid.length > 0) {
    errors.invalidFiles = "Please only upload xlsl or csv files";
    errors.issues.push(...invalid);
  }

  if (isEmpty(files)) {
    errors.required = "Please select a file to upload";
  }

  return errors;
}

const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

const isValidType = (files) => {
  var res = [];
  files.forEach((file) => {
    const filetype = file.type;
    if (allowedTypes.indexOf(filetype) === -1) {
      res.push(file.name);
    }
  });
  return res;
}

export default validateExcelUploadInput;