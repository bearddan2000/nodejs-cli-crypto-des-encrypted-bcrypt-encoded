const bcrypt = require("bcrypt");
const crypto = require('crypto');
let original = 'myPassword';
let test = "somePassword";

let main = async () => {

  function encryptTmp(password) {
    const algorithm = 'des-ecb';

    // use a hex key here
    const key = Buffer.from("d0e276d0144890d3", "hex");
    // const key = crypto.randomBytes(8).toString("hex");

    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    return cipher.final('hex');
  }

  let originalEncrypted = await encryptTmp(original);
  let testEncrypted = await encryptTmp(test);

  bcrypt.hash(originalEncrypted, 10, function(err, hash) {
    // Store hash
    console.log("Password: %s hashed", original);
    bcrypt.compare(testEncrypted, hash, function(err, res) {
      console.log("Compare password %s to %s", test, original);
      if (res) {
       // Passwords match
       console.log("Match: true");
      } else {
       // Passwords don't match
       console.log("Match: false");
      }
    });
    bcrypt.compare(originalEncrypted, hash, function(err, res) {
      console.log("Compare password %s to %s", original, original);
      if (res) {
       // Passwords match
       console.log("Match: true");
      } else {
       // Passwords don't match
       console.log("Match: false");
      }
    });
  });
}

main();
