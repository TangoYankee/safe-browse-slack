'use strict'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  return res
}

const mockCodeRequest = (code) => {
  return {
    query: {
      code: code
    }
  }
}

const mockTokenRequest = () => {
  return {
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
}



module.exports = {
  mockResponse,
  mockCodeRequest,
  mockTokenRequest
}
