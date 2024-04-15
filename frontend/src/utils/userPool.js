import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "<userpoolid>",
  ClientId: "<clientid>",
};

export default new CognitoUserPool(poolData);
