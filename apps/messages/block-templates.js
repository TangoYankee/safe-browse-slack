const contextTemplate = () => {
  return {
    type: 'context',
    elements: []
  }
}

const dividerTemplate = () => {
  return {
    type: 'divider'
  }
}

const mrkdwnTemplate = (text) => {
  return {
    type: 'mrkdwn',
    text: text
  }
}

const responseHeadTemplate = (responseType, blocks) => {
  return {
    response_type: responseType,
    blocks: blocks
  }
}

const sectionTemplate = (text) => {
  return {
    type: 'section',
    text: text
  }
}

const removeButton = () => {
  return {
    'type': 'actions',
    'elements': [
      {
        'type': 'button',
        'text': {
          'type': 'plain_text',
          'text': 'Remove Message'
        },
        'value': 'remove_message',
        'style': 'danger'
      }
    ]
}

module.exports = {
  contextTemplate,
  dividerTemplate,
  mrkdwnTemplate,
  responseHeadTemplate,
  sectionTemplate
}
