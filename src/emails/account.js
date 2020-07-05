//jshint esversion:9

const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

// sgMail.send({
//     to: 'as7220004@gmail.com',
//     from: 'as7220004@gmail.com',
//     subject: 'Second email from sendgrid!',
//     text: 'Hey, this is an e-mail sent using sendgrid!'
// });

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'as7220004@gmail.com',
        subject: 'Welcome! Thanks for believing in us.',
        text: `Hey, ${name}. Welcome! wonders are awaiting for you.`,
    });
};

const sendCancelationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'as722000@gmail.com',
        subject: 'Bye-Bye! you betrayed.',
        text: `Goodbye, ${name}, as you've decided to leave do let us know where we went wrong.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};