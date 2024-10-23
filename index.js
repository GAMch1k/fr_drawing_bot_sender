const TelegramBot = require('node-telegram-bot-api');
const db = require("./daatbase.js")


require('dotenv').config()

const token = process.env.TOKEN;
const token2 = process.env.TOKEN2;


const bot = new TelegramBot(token, {polling: true});
const bots = new TelegramBot(token2, {polling: false});


bot.on('message', async (msg) => {
    let image = 0
    const chatId = msg.chat.id;
    try {
        const text = msg.text
        
            image = await bot.downloadFile(msg.photo.pop().file_id, "." );
            // bots.sendPhoto(chatId, , {caption: msg.caption})
            
            
    } catch (e) {}
        
    console.log(image);

    if(msg.text == "/info") {
        let info = await db.info()
        await bot.sendMessage(chatId, info)
        return
    }

    let users = await db.getUsers()

    let length = users.length

    let caption = ""

    if (msg.text) {
        caption = msg.text
    } else if (msg.caption) {
        caption = msg.caption
    }

    

    

    for (let i = 0; i <= length; i++) {
        try {
            if (image == 0) {
                await bots.sendMessage(users[i].userId, caption)
            } else {
                await bots.sendPhoto(users[i].userId, image, {caption: caption})
            }
            console.log("sent to " + users[i].userId)
        } catch (e) {
            console.log(e)
        }
    }

    // users.forEach(async(user) => {
    //     try {
    //         await bot.copyMessage(user.userId, chatId, msg.message_id)
    //     } catch{}
    // })

    console.log("finished sending")
});


