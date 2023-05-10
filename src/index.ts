import axios from 'axios';
import cheerio from 'cheerio';

type Platform = 'instagram' | 'soundcloud';

const instagramApiUrl = 'https://igdownloader.app/api/ajaxSearch';
const soundcloudApiUrl = 'https://api.downloadsound.cloud/track';

/**
 * Provides a download link to the requested content
 *
 * @returns {string} download url
 */

export default async function ({ platform, url }: { platform: Platform; url: string }) {
  if (platform === 'instagram') {
    if (!url.includes('instagram.com')) {
      throw new Error(`Invalid Instagram post link: ${url}`);
    }

    const options = {
      method: 'POST',
      url: instagramApiUrl,
      headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
      data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="q"\r\n\r\n${url}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="t"\r\n\r\nmedia\r\n-----011000010111000001101001--\r\n`,
    };

    const res = await axios.request(options);
    const response = res.data.data;
    const $ = cheerio.load(response);
    const $res = $('li .download-items__thumb img').attr('src');

    return $res;
  } else if (platform === 'soundcloud') {
    if (!url.includes('soundcloud.com')) {
      throw new Error(`Invalid SoundCloud track!`)
    }

    const res = await axios.post(soundcloudApiUrl, { url });
    return res.data.url;
  } 
}
