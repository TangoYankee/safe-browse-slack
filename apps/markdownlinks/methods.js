const request = require("request");
const { format } = require("./format.js");
const messages = require("./messages.js");
const methods = {};

methods.publish = (request_body, res) => {
  /* control the workflow of a response to a slash command */
  let text = request_body.text;
  let response_url = request_body.response_url;
  let user_id = request_body.user_id;
  if (checkHelp(text)) {
    res.json(messages.data.helpMessage(user_id));
  } else if (text) {
    res.send();
    let formatted_text = format(text);
    let markdown_message = messages.data.markdownMessage(formatted_text, user_id);
    postMessage(response_url, markdown_message);
  } else {
    res.json(messages.data.errorMessage(":warning:please provide input"));
  }
}

var checkHelp = (text) => {
  /* if the user inputted only 'help', they will recieve a help message */
  text = text.trim();
  text = text.toLowerCase();
  return text === "help";
}

var postMessage = (response_url, response_message) => {
  /* send a reply to a message generated by a slack slash command */
  request.post({
    url: response_url,
    body: response_message,
    json: true,
  }, function (error, response, body) {
    if (error) {
      console.log(`Error: ${error}`);
    } else {
      console.log(`Body: ${body}, Response ${response}`);
    }
  });
}

exports.data = methods;
