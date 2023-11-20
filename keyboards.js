const {Telegraf, Markup} = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make([
        ['Контакты','Способы оплаты'],
        ['Наш телеграмм', 'Информация']
    ]).reply()

module.exports.keyboard = keyboard








