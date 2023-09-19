const { hash, compare } = require("bcryptjs");

const hashPassword = async (password) => {
  const hashesdPassword = await hash(password, 12);
  return hashesdPassword;
};

const verifyPassword = async (password, hashesdPassword) => {
  const isValid = await compare(password, hashesdPassword);
  return isValid;
};

export { hashPassword, verifyPassword };
