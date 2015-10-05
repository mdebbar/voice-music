var twilio = require('twilio');
var contacts = require('./contacts');

function getUser(req) {
  var number = req.query.From;
  return {
    id: number,
    name: contacts.getName(number),
  };
}

module.exports = {
  /**
   * How to use:
   * app.get('/path', twiml.Responder(function(resp, user) {
   *   resp.say('...').play('...');
   * }));
   */
  Responder: function(fn) {
    return function(req, res) {
      var user = getUser(req);
      var twimlResponse = new twilio.TwimlResponse();
      fn(twimlResponse, user);

      res.set('Content-Type', 'text/html');
      res.send(twimlResponse.toString());
    };
  },
};