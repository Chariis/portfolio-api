// Using AWS SDK v3
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configuration
const REGION = "us-east-1";
const SENDER_EMAIL = "charisnnadi15@gmail.com";
const RECIPIENT_EMAIL = "charisnnadi15@gmail.com";


// Create the SES client
const sesClient = new SESClient({ region: REGION });

/**
 * Main Lambda handler function.
 * @param {object} event - The event object from API Gateway.
 */
export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    let body;
    try {
        // API Gateway HTTP API sends the body as a JSON string
        body = JSON.parse(event.body);
    } catch (e) {
        console.error("Failed to parse body", e);
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Invalid request body. JSON expected." }),
        };
    }

    // --- Basic Validation ---
    if (!body.name || !body.email || !body.message) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Missing required fields: name, email, or message." }),
        };
    }

    const { name, email, message } = body;

    // --- Prepare the Email ---
    const emailParams = {
        Source: SENDER_EMAIL,
        Destination: {
            ToAddresses: [RECIPIENT_EMAIL],
        },
        Message: {
            Subject: {
                Data: `New Portfolio Contact from ${name}`,
            },
            Body: {
                Text: {
                    Data: `You received a new message from your portfolio:
                    
                    Name: ${name}
                    Email: ${email}
                    
                    Message:
                    ${message}
                    `,
                },
            },
        },
    };

    // --- Send the Email ---
    try {
        const command = new SendEmailCommand(emailParams);
        await sesClient.send(command);

        console.log("Email sent successfully.");

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Message sent successfully!" }),
        };

    } catch (error) {
        console.error("Failed to send email:", error);

        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Internal server error. Failed to send message." }),
        };
    }
};