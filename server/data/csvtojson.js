const csvtojson = require("csvtojson")
const fs = require("fs")

const csvpath = "ecom.csv"

csvtojson().fromFile(csvpath).then((json) => {
    fs.writeFileSync("prod.json", JSON.stringify(json), "utf-8", (err) => {
        console.log(err)
    })
})