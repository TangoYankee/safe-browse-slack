'use strict'

const resApp = {
  status: '',
  redirect: '' 
}

const reqSlackCode = {
  query: {
    code: ''
  }
}

const reqSlackToken = {
  body: {
    ok: true,
    app_id: 'AHB2H4ABX',
    authed_user: {
      id: ''
    },
    scope: 'commands',
    token_type: 'bot',
    access_token: '',
    bot_user_id: '',
    team: {
      id: '',
      name: 'USAF Bots'
    },
    enterprise: null
  }
}


module.exports = {
  resApp,
  reqSlackCode,
  reqSlackToken
}
