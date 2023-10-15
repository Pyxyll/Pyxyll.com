module.exports = async (req, res) => {

    const nodemailer = require('nodemailer');

    module.exports = async (req, res) => {
        const { name, email, domain, subject, message, file } = req.body;

        // Create a transporter using nodemailer (for this example, we'll use Gmail)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS  // your Gmail password
            }
        });

        // Mail options
        let mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: 'your-email@example.com', // list of receivers
            subject: 'New Contact Form Submission', // Subject line
            text: `Name: ${name}\nEmail: ${email}\nDomain: ${domain}\nSubject: ${subject}\nMessage: ${message}` // plaintext body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send({ status: 'Error sending email' });
            } else {
                res.status(200).send({ status: 'Form submitted successfully' });
            }
        });
    };

    res.status(200).send({ status: 'Form submitted successfully' });
};