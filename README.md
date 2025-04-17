# PANASON Learning Institute - Course Registration System

This is a fully serverless course registration system built for PANASON Learning Institute using AWS services. It allows students to register for up to 3 courses, saves the registration data to an S3 bucket, and sends a confirmation email via SES.

## 📦 Features

- 📄 Static website frontend hosted on Amazon S3
- ☁️ Serverless backend using AWS Lambda & API Gateway
- 📥 Registration data stored in an S3 bucket
- 📧 Confirmation emails sent using Amazon SES
- 🔐 CORS configured for secure API access from the frontend

## 🌐 Technologies Used

- Amazon S3 – Static site hosting and data storage
- Amazon API Gateway (HTTP API) – Routing form submissions to Lambda
- AWS Lambda – Backend logic to process form submissions
- Amazon SES – Send email confirmations
- JavaScript (frontend) – Form logic and API requests

## 🧠 Architecture Overview

		User (browser)
		 	↓ 
		HTML form (S3 static site)
			↓ 
		API Gateway (HTTP POST) 
			↓ 
		Lambda Function 
		       ↙ ↘ 
	      S3 (save)   SES (email)


## 📁 Project Structure

📁 project-root/ 
├── index.html 
├── script.js (inline or extracted) 
├── lambda/ 
│ 	└── index.mjs
├── README.md 
└── LICENSE


## 🚀 How to Deploy

1. **Frontend**
   - Upload `index.html` to your S3 bucket configured for static hosting.
   - Ensure the bucket policy allows public `GetObject` access for `index.html`.

2. **Backend**
   - Create an AWS Lambda function.
   - Set runtime to Node.js 18.x.
   - Paste the `index.mjs` code (with SES + S3 logic).
   - Create an API Gateway (HTTP API), POST method, and connect it to the Lambda.
   - Enable CORS for the API Gateway.

3. **SES**
   - Verify the sender email address.
   - (If in Sandbox Mode) Verify recipient email address for testing.

4. **Permissions**
   - Attach permissions for `s3:PutObject` and `ses:SendEmail` to the Lambda role.

## ✅ License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

---

### 👨🏽‍💻 Author

Built by [@OtobongEmmanuel](https://github.com/OtobongEmmanuel) for the PANASON Learning Institute 🚀

