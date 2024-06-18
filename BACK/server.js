const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure body-parser pour augmenter la limite de taille maximale
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/send-email', async (req, res) => {
    const { selectedLabel, comment, city, street, image } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abc1234@gmail.com',
            pass: 'abc1234'
        }
    });

    const mailOptions = {
        from: 'abc1234@gmail.com',
        to: 'abc1234@gmail.com',
        subject: 'Rapport de problème',
        html: `
      <p><strong>Valeur sélectionnée :</strong> ${selectedLabel}</p>
      ${comment ? `<p><strong>Commentaire :</strong> ${comment}</p>` : ''}
      <p><strong>Commune :</strong> ${city}</p>
      <p><strong>Rue :</strong> ${street}</p>
    `,
        attachments: [
            {
                filename: 'photo.jpg',
                path: image,
                cid: 'photo@cid'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email envoyé avec succès');
    } catch (error) {
        console.error(error);
        res.status(500).send('Échec de l\'envoi de l\'email');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
