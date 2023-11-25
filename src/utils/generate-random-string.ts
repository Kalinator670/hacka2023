export const generateRandomString = (length = 8) => {
  let string = '';
  const symbols
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    string += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return string;
};
