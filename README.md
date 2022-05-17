# Reproduction of possible bug in Accounts.requestLoginTokenForUser

After `meteor create case-sensitive-email-bug` updated `client/main.jsx`:

```
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
```

The server never logs any output for 'Bob' only for 'bill'. The client logs both results as if they completed without error.

### Server output:

```
Meteor server restarted
====== BEGIN MAIL #0 ======
(Mail not sent; to enable sending, set the MAIL_URL environment variable.)
Content-Type: multipart/alternative;
boundary="--_NmP-800b8ef2d0a11ca2-Part_1"
To: bill@example.com
Subject: Your login token for undefined
Message-ID: <ebfe57f1-ce0b-a32e-e68a-ad015c14566a@macbook-pro.lan>
Date: Tue, 17 May 2022 07:55:23 +0000
MIME-Version: 1.0

----_NmP-800b8ef2d0a11ca2-Part_1
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: quoted-printable

Hello!

Type the following token in our login form to get logged in:
3E4CC4
Or if you want, you can click the following link to be automatically logged=
in:
http://localhost:3000/?loginToken=3D3E4CC4&selector=3Dbill@example.com

Thank you!

----_NmP-800b8ef2d0a11ca2-Part_1
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

Hello!<br/>

Type the following token in our login form to get logged =
in:<br/><br/>
3E4CC4<br/><br/>
Or if you want, you can click the following =
link to be automatically logged in:<br/><br/>
http://localhost:3000/?=
loginToken=3D3E4CC4&selector=3Dbill@example.com<br/>

Thank you!

----_NmP-800b8ef2d0a11ca2-Part_1--
====== END MAIL #0 ======

Login Token url: http://localhost:3000/?loginToken=3E4CC4&selector=bill@example.com
```

### Client Output:

```
[Log] result – {selector: {email: "bill@example.com"}, userData: {email: "bill@example.com"}, isNewUser: false} (app.js, line 241)
[Log] result – {selector: {email: "Bob@example.com"}, userData: {email: "Bob@example.com"}, isNewUser: false} (app.js, line 241)
```