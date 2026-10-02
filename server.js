
// const express = require('express');
// const app = express()
// const fs = require('fs/promises')
// const path = require('path')
// const PathToFile = path.join(__dirname,"db.json")
// const port = 3000
// async function readFile(){
//     try{
//         let data = await fs.readFile(PathToFile,"utf-8")
//         return JSON.parse(data)
//     }catch(error){
//         console.log(error)
//     }
    
// }

// app.get('/products',async (req, res) => {
//     let product = await readFile()
//   res.send(product)
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require('express');
const app = express()
const fs = require('fs/promises')
const path = require('path')
const PathToFile = path.join(__dirname, "db.json")
const port = 3000
async function readFile(){
    try{
        let data = await fs.readFile(PathToFile, "utf-8")
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}
async function readFileWithDelay(){
    try{
        await new Promise((res, rej) => {
            setTimeout(res, 1500)
        })

        return await readFile()

    }catch(err){
        console.log(err)
    }
}
app.get('/products/:id', async (req, res) => {
    try{
        let id = req.params.id
        id = Number(id)

        let products = await readFileWithDelay()

        let product = products.find((item) => item.id == id)

        res.send(product)

    }catch(err){
        res.status(500).send("server error")
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
