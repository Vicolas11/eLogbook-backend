import bcryptjs from "bcryptjs";

const generatedSalt = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcryptjs.genSalt(12, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await generatedSalt();
  return new Promise<string>(async (resolve, reject) => {
    try {
      bcryptjs.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    } catch (err) {
      reject(err);
    }
  });
};

type valPwd = { pwd: string; hashPwd: string };

export const validatePassword = async({pwd, hashPwd}: valPwd): Promise<boolean> => {
  const hasHashed = bcryptjs.compare(pwd, hashPwd);
  return hasHashed;
};
