require('dotenv').config();

exports.createRandomString = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.replaceTemplateVariables = (text, variableObj) => {
  let j = JSON.stringify(text);

  for (var k in variableObj) {
    j = j.split('${' + k + '}').join(variableObj[k]);
  }
  return JSON.parse(j);
};

exports.unixTimestampToDate = (timestamp) => {
  const dt = new Date(timestamp * 1000);

  return dt.getDate() + '.' + (dt.getMonth() + 1) + '.' + dt.getFullYear();
};

exports.validURL = (str) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
};

exports.checkBasicAuth = (name, pass) => {
  let valid = true;

  valid = compare(name, process.env.BASICAUTHPASSWORD) && valid;
  valid = compare(pass, process.env.BASICAUTHPASSWORD) && valid;

  return valid;
};
