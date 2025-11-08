# Serverless Contact Form API

A highly available, cost-effective, and 100% serverless API built on AWS to handle my portfolio's contact form submissions.

## 🚀 Project Summary

This project is a complete backend-as-a-service for a static website. Instead of relying on a traditional, stateful server, this API is built on event-driven, cloud-native services. It's designed to be infinitely scalable, extremely low-cost (fits entirely within the AWS Free Tier), and requires zero server management.

The API exposes a single `POST` endpoint that:
1.  Receives JSON data (name, email, message) from a client.
2.  Validates the incoming data.
3.  Uses the AWS Simple Email Service (SES) to format and send the message to my personal email.
4.  Returns a success or error message to the client.

## 🛠️ Key Technologies
1. Compute: AWS Lambda (Node.js)

2. API & Endpoint: AWS API Gateway

3. Email Service: AWS SES (Simple Email Service)

4. Security: AWS Certificate Manager (ACM) for SSL/TLS

5. DNS: Namecheap (for custom domain)

6. CI/CD: GitHub Actions

7. Permissions: AWS IAM (Identity and Access Management)

---

## 🏗️ Architecture

`![Architecture Diagram](images/architecture_diagram.png)`

**The data flow is as follows:**
1.  A `POST` request is sent to `https.api.chigoziennadi.com/contact`.
2.  **API Gateway** receives the request, validates it's for a custom domain, and passes it to the integrated Lambda function.
3.  The **AWS Lambda** function (written in Node.js) executes the core logic: validating the JSON body and building an email.
4.  Lambda invokes the **AWS SES** service, giving it permission to send the formatted email.
5.  **AWS SES** delivers the email to my verified personal inbox.
6.  Lambda returns a `200` (success) or `400`/`500` (error) status code to the client.

---

## 🔬 Live API Endpoint

The API is live and can be tested directly.

**Endpoint:** `POST https://api.chigoziennadi.com/contact`

### Test with `curl`

You can send a test message from your terminal:

```sh
curl -X POST 'https://api.chigoziennadi.com/contact' \
-H 'Content-Type: application/json' \
-d '{
    "name": "Your name",
    "email": "test@example.com",
    "message": "This is a test of my new live API!"
}'
```

### Success Response (200):

```JSON
{
  "message": "Message sent successfully!"
}
```

