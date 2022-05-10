const path = require('path')
const fs = require('fs')

const deleteTemplate = path.resolve(__dirname, 'deletetemplate.txt')
const getListTemplate = path.resolve(__dirname, 'getlisttemplate.txt')
const messageDeleterTemplate = path.resolve(__dirname, 'deleter.js')
const deleteTemplateContents = fs.readFileSync(deleteTemplate).toString().trim()
const getListTemplateContents = fs.readFileSync(getListTemplate).toString().trim()
const messageDeleterTemplateContents = fs.readFileSync(messageDeleterTemplate).toString().trim()
const matches = deleteTemplateContents.match(/(.*channels\/)(.*messages\/)(.*?")([^]*)/)
// .*?messages\/.*?"(.*)

// console.log(matches)
// console.log(matches[1])
// console.log(matches[2])
// console.log(matches[3])
// console.log(matches[4])

const outDelete = `var deleterfetch = \`${matches[1]}DUMMYCHAN/messages/DUMMYMSG"${matches[4]}\`

var getList = \`${getListTemplateContents}\`

${messageDeleterTemplateContents}

var messageDeleter = new MessageDeleter(deleterfetch,getList,6000)
messageDeleter.start()
`

console.log(outDelete)
