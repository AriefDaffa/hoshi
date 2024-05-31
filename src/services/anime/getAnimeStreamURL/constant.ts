export const defaultVal = {
  headers: {
    Referer: '',
    watchsb: '', // or null, since only provided with server being equal to "streamsb".
    'User-Agent': '', // or null
  },
  sources: [
    {
      url: '',
      quality: 'a',
      isM3U8: true,
    },
  ],
};
