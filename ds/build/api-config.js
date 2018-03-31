const HOST =  'http://alpha-api.test.bestsnake.com'
const baseURL = `${HOST}/api/static-data/`

const oauthParms = {
  "grant_type": "password",
  "client_id": "3",
  "client_secret": "yT9D2aN4h4fhkxhPRxglRlLo66fs28197STRXl8M",
  "username": "api-test01@email.com",
  "password": "1234"
}

module.exports = {
  HOST,
  baseURL,
  oauthParms
}