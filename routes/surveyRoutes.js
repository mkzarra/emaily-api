const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');

module.exports = async app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for your feedback!');
  })
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
}