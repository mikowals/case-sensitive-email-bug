import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
  ['bill@example.com', 'Bob@example.com'].forEach(email => {
    Accounts.requestLoginTokenForUser({
      selector: email,
      userData: {email},
    }, (err, res) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('result', res);
      }
    });
  });
});
