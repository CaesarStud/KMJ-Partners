const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure the email sender
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com", // 🔴 Replace with your Gmail
        pass: "your-app-password" // 🔴 Use App Password, not your Gmail password
    }
});

// Firebase function triggered on new form submission
exports.sendEmailNotification = functions.database.ref("formSubmissions/{pushId}")
    .onCreate((snapshot, context) => {
        const data = snapshot.val();

        const mailOptions = {
            from: "your-email@gmail.com", // 🔴 Replace with sender email
            to: "julaenw@gmail.com", // 🔴 The recipient email
            subject: "New Form Submission",
            text: `
                Name: ${data.name}
                Email: ${data.email}
                Instagram: ${data.instagram}
                TikTok: ${data.tiktok}
                Twitter: ${data.twitter}
                Other Socials: ${data.otherSocials}
                Description: ${data.description}
            `
        };

        return transporter.sendMail(mailOptions)
            .then(() => console.log("Email sent successfully"))
            .catch(error => console.error("Error sending email:", error));
    });
