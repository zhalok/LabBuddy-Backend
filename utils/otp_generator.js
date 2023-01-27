const otp_generator = {};

otp_generator.generate = (digits) => {
  let otp = 0;
  for (let i = 0; i < digits; i++) {
    let cur = Math.floor(Math.random() * 9);
    otp *= 10;
    otp += cur;
  }

  const expiration_time = Math.floor(new Date().getTime() / 1000) + 60;
  return { otp, expiration_time };
};

// console.log(otp_generator.generate(10));

module.exports = otp_generator;
