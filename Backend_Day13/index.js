const bcrypt = require("bcrypt");

const password = "dipun123";
//  hashcode + salt
// console.time("hash");

async function hashing() {
  const solt = await bcrypt.genSalt(10);

  const hashpass = await bcrypt.hash(password, solt);

  //   console.timeEnd("hash")
  //   console.log(hashpass);

  const ans =  await bcrypt.compare(password, hashpass);
  console.log(ans);

  console.log(solt);
  console.log(hashpass);
  // ! salt
  // $2b$10$/A/yGoxYCtNaKNPPAarVh.
  // ! hashcode password
  // $2b$10$/A/yGoxYCtNaKNPPAarVh.oLYkYVut1KuhKSjkJkK3EUfFlxU9sne
}

hashing();

// $2b$10$FuKZDAaj86hl5OC9z67LyewMjM.LTa8OGBXedQPIgZq4FLxcBOZ.K
// $2b$10$TYlOp1DgqPdSRRjYhmTixumo2xZjlpHlZd55yvMkL.nU.iMFEF1ia
