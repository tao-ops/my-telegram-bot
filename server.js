const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_7868460629:AAELGOAy9sWY1XYLnuC1LVbNjYIVKHl3JFk)
const fs = require('fs')

let users = {}
try { 
  users = JSON.parse(fs.readFileSync('data.json'))
} catch {}

function saveData() { 
  fs.writeFileSync('data.json', JSON.stringify(users))
}

bot.start(ctx => ctx.reply('🌟 发送 /sign 签到'))

bot.command('sign', ctx => {
  const userId = ctx.from.id
  const today = new Date().toISOString().split('T')[0]
  
  if (users[userId]?.date === today) {
    ctx.reply('⚠️ 今日已签到！')
  } else {
    users[userId] = { 
      date: today, 
      streak: (users[userId]?.streak || 0) + 1
    }
    saveData()
    ctx.reply(`✅ 签到成功！连续 ${users[userId].streak} 天`)
  }
})

bot.launch()
console.log('🤖 机器人已启动')
setInterval(saveData, 300000)