const { CheckTaxID } = require('../lib/index')

const TAXID = ""
CheckTaxID(TAXID)
.then(result => {
  // console.log('result1:',result)
})

async function getData() {
  let result = await CheckTaxID(TAXID)
  // console.log('result2:',result)
}

getData()