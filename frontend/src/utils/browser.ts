import axios from 'axios';

/**
 * Inject script into the page
 * @param src
 */
export async function injectJs(src: string): Promise<void> {
  const { data } = await axios({
    url: src,
    method: 'GET',
    responseType: 'text',
  });

  // eslint-disable-next-line no-eval
  eval(data);
}
