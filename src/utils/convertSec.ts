export const convertSec = (sec: number) => {
  //   const date = new Date();

  const minutes = Math.floor(sec / 60);
  const secExtra = Math.floor(sec % 60);

  const result = `${minutes < 10 ? `0${minutes}` : minutes}:${
    secExtra < 10 ? `0${secExtra}` : secExtra
  }`;

  return result;
};
