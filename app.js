require('dotenv').config(); //initialize dotenv

function getRandomNumber(){
    return Math.floor(Math.random() * 100);
}

function startGame(){
    randomNumber = getRandomNumber();
    isGameRunning = true;
}

function checkNumber(number, randomNumber){
    return number>randomNumber? {msg: "is smaller", isCorrect: false }: (number < randomNumber? {msg: "is greater", isCorrect: false } : {msg: "ok, its correct, "+number+" is the number", isCorrect: true });
}

const { Client, GatewayIntentBits } = require('discord.js');
var isGameRunning;
var randomNumber = getRandomNumber();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on('ready', () => {
    console.log(`Is runnnig`);
});

client.on('messageCreate', response=> {
    var message = response.content;
    if(isGameRunning){
        if(!response.author.bot){
            var result = checkNumber(message, randomNumber);
            if(result.isCorrect){
                isGameRunning = false;
            }

            response.reply(result.msg);
        }
    }else{
        if(message === "let me try"){
            response.reply('lesgo, guess the number');
            startGame();
        }
    }
});

client.login(process.env.CLIENT_TOKEN);