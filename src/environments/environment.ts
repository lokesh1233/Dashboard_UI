// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// 192.168.6.224
export const environment = {
  production: false,
  main_url: "http://10.32.0.93:5020/QABot/Qna",
  inbox_url:"http://10.32.0.93:5020/QABot/QABotInbox",
  model_url:"http://10.32.0.93:5021/webhooks/TransformerBot/Model",
  csvFile_url:"http://10.32.0.93:5020/QABot/QAFileUpload",
  employee_url:"http://10.32.0.93:5020/o360/onBoarding/userOnBoarding",
  email:"qnabuilder@speridian.com",
  password:"QnABuilder123#@"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
