# Author: Heemal Morakhia

# ShiftWise:

An webapp aimed to generate shift schedules. This is a small part of the app using some AWS services.

# Services:

- EC2 instance - to host my frontend
- AWS Cognito - Sign In/SignUp
- API Gateway - backend apis connected to lambda so serverless
- Lambda - Save to db, auto confirm users, send messages
- RDS - Aurora MySQL - database for app
- SNS - to send emails.

# References:

1. AWS documentation. AutoConfirmUsers. Link: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html#aws-lambda-triggers-pre-registration-example-2. Date Accessed: 1 August 2023.
2. Evan Does Tech. AWS Cognito + React JS Tutorial - Sessions and Logging out (2020) [Ep. 3]. Link: https://www.youtube.com/watch?v=R-3uXlTudSQ. Date Accessed: 1 August 2023.
3. Canva. Created logo with it. Link: https://www.canva.com/. Date Accessed: 1 August 2023.
4. Bootstrap. For styling various parts of the website. Link: https://getbootstrap.com/docs/5.3/getting-started/introduction/. Date Accessed: 1 August 2023.
5. Datomic. For CORS blocking issue. Link: https://docs.datomic.com/cloud/tech-notes/cors-lambda-proxy.html. Date Accessed: 1 August 2023.
6. pch vector. Freepik. Background image used in the home page on the right. Link: https://www.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_9174355.htm#query=calendar&position=16&from_view=search&track=sph. Date Accessed: 1 August 2023.
