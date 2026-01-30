import { Problem } from '../../types/problem';

export const urlQueryParserProblem: Problem = {
  id: '120',
  title: 'URL Query Parser',
  slug: 'url-query-parser',
  difficulty: 'easy',
  category: 'Node.js',
  tags: ['Node.js', 'URL', 'Parsing'],
  description: `
Implement a function \`parseQueryString\` that parses a URL query string into an object.
Similar to \`querystring.parse\` or \`URLSearchParams\`.

- Handle decoding (decodeURIComponent).
- Handle multiple values for the same key (convert to array).

Example:
\`"foo=bar&abc=xyz&abc=123"\`
->
\`{ foo: 'bar', abc: ['xyz', '123'] }\`
  `,
  templateCode: `/**
 * @param {string} query
 * @return {object}
 */
function parseQueryString(query) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} query
 * @return {object}
 */
function parseQueryString(query) {
  if (!query) return {};
  if (query.startsWith('?')) query = query.slice(1);
  
  const res = {};
  const pairs = query.split('&');
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (!key) continue;
    
    if (res[key]) {
      if (Array.isArray(res[key])) {
        res[key].push(value);
      } else {
        res[key] = [res[key], value];
      }
    } else {
      res[key] = value;
    }
  }
  
  return res;
}`,
  testCases: [
    {
      input: ['foo=bar&abc=xyz&abc=123'],
      output: { foo: 'bar', abc: ['xyz', '123'] },
    },
    {
      input: ['a=1&b=2'],
      output: { a: '1', b: '2' },
    },
  ],
  hints: [
    'Split by `&` then by `=`.',
    'Use `decodeURIComponent`.',
    'Check if key exists to handle arrays.',
  ],
  createdAt: '2024-01-29',
};
