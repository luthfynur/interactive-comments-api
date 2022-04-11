const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const asyncScrypt = promisify(scrypt);

class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    const buf = await asyncScrypt(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = await asyncScrypt(suppliedPassword, salt, 64);

    return buf.toString('hex') === hashedPassword;
  }
}

module.exports = { Password };
