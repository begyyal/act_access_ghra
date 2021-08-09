const core = require('@actions/core');
const axios = require('axios');

const DOMAIN = 'https://api.github.com/';

function owata_(promise) {
  return promise.catch(err => {
    core.setFailed(err instanceof Error ? err.message : err);
    process.exit(-1);
  });
}

function eqIgnoreCase(a, b) {
  return new RegExp(a, 'i').test(b);
}

async function run() {

  const url = core.getInput('url', { required: true });
  const method = core.getInput('method', { required: true });
  const args = JSON.parse(core.getInput('args'));

  if (!new RegExp('^' + DOMAIN).test(url))
    throw 'The url of inputs does not contain a correct domain.';

  const conf = {
    url: url,
    baseURL: DOMAIN,
    method: method,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token ' + core.getInput('token')
    }
  };

  if (args)
    if (eqIgnoreCase(method, 'GET'))
      conf.params = args;
    else
      conf.data = args;

  const res = await owata_(axios.request(conf));
  core.setOutput('status', res.status);
  core.setOutput('data', res.data);
}

owata_(run());
