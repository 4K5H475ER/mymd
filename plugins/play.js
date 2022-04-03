const { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, isOwner, isPrems, command, text, usedPrefix }) => {
    if(!text) throw `Contoh: ${usedPrefix}${command} i see your monster`
    m.reply2(wait)
    let anu = await youtubeSearch(text)
    let vid = anu.video
    let vide 
    if (/playrand(om)?$/i.test(command)) vide = conn.rand(vid)
    else vide = vid[0]
    if(!vide) return conn.sendB(m.chat, await conn.trans('Video/Audio Tidak ditemukan'), wm, null, [[await conn.trans('Coba Lagi'), `.play ${text} lainnya`]], m) 
    let { authorName, authorAvatar, title, description, url, thumbnail, videoId, durationH, viewH, publishedTime } = vide
    let capt = `🎬 *YouTube Play*
  
📌 *Title:* ${title}
📮 *ID:* ${videoId}
⌚ *Duration:* ${durationH}
👁️ *Viewers:* ${viewH}
⏲️ *Uploaded:* ${publishedTime}
👑 *Author Name:* ${authorName}
🚀 *Source:* ${url}
📝 *Description:* ${description}`
    await conn.sendBD(m.chat, capt, wm, img, [['🎧 Audio 🎧', `${usedPrefix}yta ${url}`], ['📽 Video 📽', `${usedPrefix}ytv ${url}`], [`🔎 Play ${await conn.trans('Acak')} 🔍`, `${usedPrefix}playrand ${text}`]], m, {
     fileName: await conn.trans('Selamat menonton')+` ${m.name} 🤩`, mimetype: global.td, fileLength: global.fsdx, pageCount: global.pcdx,
     contextInfo: {
     jpegThumbnail: await(await fetch(thumbd)).buffer(),
     mentionedJid: [m.sender],
     externalAdReply :{
     mediaUrl: `${url}`,
     mediaType: 2,
     description: deslink, 
     title: titlink+'ツ', 
     body: bodlink,
     thumbnail: await(await fetch(thumbnail)).buffer()
     }} 
    })
    
  let limit
  if((isOwner || isPrems)) limit = 150
  else limit = 50
  try {
  let audi = await youtubedl(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
  try {
  let audi = await youtubedlv2(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
  try {
 let audi = await youtubedlv3(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  }  catch {
  try {
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb: thumbnail, title, filesize, filesizeF } = await yta(url, servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < filesize
  if (!isLimit) await sock.sendMessage(m.chat, { document: { url: dl_link}, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
    throw false 
        }
      }
    }
  }
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play(rand(om)?)?$/i

module.exports = handler

