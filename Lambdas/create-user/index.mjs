import mysql from "mysql2/promise";

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

  let email = JSON.parse(event.body).email;

  try {
    const rds = await mysql.createConnection({
      host: process.env.dbhost,
      port: process.env.dbport,
      user: process.env.dbuser,
      password: process.env.dbpass,
      database: process.env.dbname,
    });

    let query = "INSERT INTO `mydb`.`users` (`email`) VALUES ('" + email + "')";

    await rds.query(query);

    rds.end();

    let resp = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };

    return resp;
  } catch (error) {
    console.error("Error: " + error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
  }
};
