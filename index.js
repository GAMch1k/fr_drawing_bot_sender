const TelegramBot = require('node-telegram-bot-api');
const db = require("./daatbase.js")


require('dotenv').config()

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if(text == "/info") {
        let info = await db.info()
        await bot.sendMessage(chatId, info)
        return
    }

    let users = await db.getUsers()

    users.forEach(async(user) => {
        try {
            await bot.copyMessage(user.userId, chatId, msg.message_id)
        } catch{}
    })

    console.log("finished sending")
});


