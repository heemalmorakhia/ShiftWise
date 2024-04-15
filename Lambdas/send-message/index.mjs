import AWS from "aws-sdk";

export const handler = async (event) => {
  // Datomic. For CORS blocking issue. Link: https://docs.datomic.com/cloud/tech-notes/cors-lambda-proxy.html. Date Accessed: 1 August 2023.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify("CORS Preflight Request Handled"),
    };
  }

  const sns = new AWS.SNS({ region: "us-east-1" });
  const topicArn =
    "arn:aws:sns:us-east-1:712419171054:shift-wise-contact-admin";

  try {
    const userEmail = JSON.parse(event.body).userEmail;
    const userMessage = JSON.parse(event.body).userMessage;

    let emailString = "From: " + userEmail + "\nMessage: " + userMessage;

    await sns
      .publish({
        TopicArn: topicArn,
        Message: emailString,
      })
      .promise();

    return {
      statusCode: "200",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: "500",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(error),
    };
  }
};
