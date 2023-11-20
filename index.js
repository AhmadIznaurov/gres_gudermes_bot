const {Telegraf, Markup} = require('telegraf')
const {message} = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')
const keyboards = require('./keyboards')
const { Keyboard, Key } = require('telegram-keyboard')


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', async (ctx) => {
    try {
      const message = await ctx.replyWithHTML(
        `<b>Привет ${ctx.from.first_name ? ctx.from.first_name : "пользователь"} что вам подсказать 👇</b>`,
      );
    } catch (error) {
      console.log(error);
    }
  });


bot.hears('Контакты', async(ctx) => {
        await ctx.replyWithHTML(`
        ⚡️Гудермесские ГЭС⚡️

📍 Адрес: г.Гудермес, Школьная, 22

Режим работы
ГЭС: Пн Вт Ср Чт Пт
Касса: Пн Вт Ср Чт Пт Сб
-----
🕖 8:00-17:00
🕛 12:00-13:00 Обед

📨 E-mail: gudermes-gres@chechenergo.ru

☎️ Телефон диспетчера:

📬 Официальный канал в Телеграмм - https://t.me/gudermesGES`,
Keyboard.make([
    ['⬅️ Меню']
]).reply())
})

bot.hears('Способы оплаты', async(ctx) =>{

  await ctx.reply(`
✅ В любом кассе АО "Чеченэнерго"

✅ В приложении вашего банка

✅ В официальном приложении для телефона👇`, Keyboard.make([
    ['Программа для apple'],['Программа для android'],['⬅️ Меню']]).reply());
});

bot.hears('Программа для apple', async (ctx) => {
  try {
    await ctx.reply(
      `https://clicks.su/9alOLV` )
  } catch (error) {
    console.log(error)
  }
})

bot.hears('Программа для android', async (ctx) => {
  try {
    await ctx.reply(
      `https://clicks.su/y5Bkvd`)
  } catch (error) {
    console.log(error)
  }
})

bot.action('back_to_menu', (async ctx =>{
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(
           `<b>${ctx.from.first_name
               ? ctx.from.first_name
               : "пользователь"} мы можем ответить на следующие ваши вопросы</b>`,
           keyboards.keyboard)
   } catch (error) {
       console.log(error)
   }
}))


bot.hears('⬅️ Меню', async (ctx) => {
    try {
         await ctx.replyWithHTML(
            `<b>${ctx.from.first_name
                ? ctx.from.first_name
                : "пользователь"} у вас остались вопросы по следующим пунктам?</b>`,
            keyboards.keyboard)
    } catch (error) {
        console.log(error)
    }
})



bot.hears('Наш телеграмм', async(ctx) => {
        await ctx.replyWithHTML(`Официальный канал в Телеграмм - https://t.me/gudermesGES`,
        Keyboard.make([['⬅️ Меню']]).reply())
})

bot.hears('Информация', async(ctx) =>{

        await ctx.replyWithHTML(`Основные сведения по:`, Keyboard.make([
            ['Тариф'],
            ['Как снять показания с умного счетчика?'],
            ['Как зарегистрироваться в приложении?'],
            ['⬅️ Меню']
        ]).reply())

})

bot.hears('Тариф', async(ctx) => {

        await ctx.replyWithHTML(`
Коммерция - уточняйте в ГЭС
~7,26 - НН  
~6,59 - СН-2  

Население  
3,36 - город  
2,35 - село`, Keyboard.make([['⬅️ Меню']]).reply())
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))