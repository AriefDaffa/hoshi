export const kebabToNormal = (text: string) => {
  if (text === '') {
    return '';
  }

  return text.split('-').join(' ');
};
