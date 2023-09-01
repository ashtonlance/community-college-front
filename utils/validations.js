const INVALID_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com"];

export const validateEmail = (email) => {
  if (!email) {
    return false;
  }
  return isDomainValid(email) && isEmailFormatValid(email);
};

const isDomainValid = (email) => {
  //check email for invalid domains
  const emailDomain = email.split("@")[1];
  const isValid = !INVALID_DOMAINS.includes(emailDomain);
  return isValid;
};

const isEmailFormatValid = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
