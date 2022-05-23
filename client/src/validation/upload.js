import isEmpty from "./is-empty";

const validateUploadInput = (files) => {
  const errors = {};

  errors.issues = [];

  const tooLarge = isFileTooLarge(files);
  if (tooLarge) {
    errors.FileTooLarge = "A file is too large";
    errors.issues.push(...tooLarge);
  }

  const invalid = isValidImageType(files);
  if (invalid.length > 0) {
    errors.invalidFiles = "Please only upload jpeg, jpg and png images";
    errors.issues.push(...invalid);
  }

  if (isTooManyFiles(files)) {
    errors.tooManyFiles = "Please upload a maximum of 30 files at a time";
  }

  if (isEmpty(files)) {
    errors.required = "Please select some files to upload";
  }

  return errors;
}

const allowedImageTypes = ['image/jpeg', 'image/png'];

const isValidImageType = (files) => {
  var res = [];
  files.forEach((file) => {
    const filetype = file.type;
    if (allowedImageTypes.indexOf(filetype) === -1) {
      res.push(file.name);
    }
  });
  return res;
}

const isFileTooLarge = (files) => {
  var res = [];
  files.forEach((file) => {
    const fileSize = file.size;
    if (fileSize >= 1000000) {
      res.push(file.name);
    }
  });
  return res;
}

const isTooManyFiles = (files) => {
  return files.length > 30;
}

export default validateUploadInput;