var https = require("https");
const functions = require("firebase-functions");
const dummypaymentgateway = "https://dummypaymentgateway.com"
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const action =request.body.result.action;
  const params = request.body.result.parameters;
  const inputcontext = request.body.result.contexts;
  const outputcontext = response.body.result.contexts;

  response.setHeader("Content-Type", "application/json" );


  if (action == "input.seat" && params.seat.match(/[abc][1-5]/gi)) {
    response.send(chatResponse(`Thanks for selecting your seat as ${params.seat}. Please go to ${dummypaymentgateway} to complete payment`));
    outputcontext = "snacks";
    console.log(outputcontext);
  } else {
    outputcontext = "seating"
    response.send(chatResponse("Please try selecting seat as a1, b2 etc to proceed successfully."));
  }


});


function chatResponse(chat){
  return JSON.stringify({"speech": chat, "displayText" : chat});
}
