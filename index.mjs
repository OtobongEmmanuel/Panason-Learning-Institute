"use strict";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const s3 = new S3Client({ region: "us-east-1" });
const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, courses } = body; // courses is an array

    // Upload to S3
    const s3Params = {
      Bucket: "panason-registration-data", // ✅ Replace with your bucket name
      Key: `registrations/${Date.now()}_${name}.json`,
      Body: JSON.stringify(body),
      ContentType: "application/json",
    };

    await s3.send(new PutObjectCommand(s3Params));

    // Send confirmation email
    const courseList = Array.isArray(courses) ? courses.join(", ") : "No courses selected";

    const emailParams = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Hi ${name},\n\nThank you for registering for the following courses: ${courseList}.\n\nBest regards,\nPANASON Learning Institute`,
          },
        },
        Subject: {
          Data: "Course Registration Confirmation",
        },
      },
      Source: "otobongemmanuelsn@gmail.com", // 🔁 Replace with your verified SES email
    };

    await ses.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved to S3 and email sent successfully." }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process registration", error: err.message }),
    };
  }
};
