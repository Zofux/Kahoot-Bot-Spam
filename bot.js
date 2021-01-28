var Kahoot = require("kahoot.js-updated");
var prompt = require('prompt-sync')();

const pinInput = prompt('Game Pin : ')
if (isNaN(pinInput)) return console.log('The pin needs to be a number')
console.log(`Pin set to "${pinInput}"`)

const botName = prompt('Bot Name : ')
console.log(`Bot name set to "${botName}"`)

const botCount = prompt('How many bots would you like to send, (recomended 230) : ')
if (isNaN(botCount)) return console.log('Bot Count needs to be a number')
console.log(`Sending ${botCount} bots!`)


var kahoots = [];
var pin = `${pinInput}`;
var name = `${botName}`;
var bot_count = `${botCount}`;
for (var i = 0; i < bot_count; i++) {
    kahoots.push(new Kahoot);
    kahoots[i].join(pin, name+" "+String(i)).catch(error => {
        console.log("join failed because : " + error.description + " " + error.status)
    });
    kahoots[i].on("Joined", () => {
        console.log("successfully joined game")
    });
    kahoots[i].on("QuestionStart", (question) => {
        question.answer(
            Math.floor(
                Math.random() * question.quizQuestionAnswers[question.questionIndex]
            ) + 0
        );
    });
    kahoots[i].on("Disconnect", (reason) => {
        console.log("disconnected because " + reason);
    });
}
