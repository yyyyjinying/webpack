import BigNumber from 'BignNumber.js'

export const bigNumber = () => {
  let x = new BigNumber("1111222233334444555566");
  console.log(x.toString());
  console.log(x.toFixed());
  console.log(b);

  let a = new BigNumber(0.56785);
  let b = a.times(100);

  console.log(b.toFixed(2) + "%");
};
