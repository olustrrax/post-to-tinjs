var axios = require('axios')
var https = require('https')

async function verifiedTIN(tax_id){
  let url = "https://rdws.rd.go.th/jsonRD/checktinpinservice.asmx";
  let headers = {
    "Content-Type": "text/xml; charset=utf-8",
    "Content-Length": "length",
    "Host": "rdws.rd.go.th",
    "SOAPAction":
      "https://rdws.rd.go.th/JserviceRD3/checktinpinservice/ServiceTIN"
  };
  const httpsAgent = new https.Agent({
    ciphers: "AES128-SHA", //DES-CBC3-SHA
    rejectUnauthorized: false
  });
  let xml =
  `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <ServiceTIN xmlns="https://rdws.rd.go.th/JserviceRD3/checktinpinservice">
        <username>anonymous</username>
        <password>anonymous</password>
        <TIN>${tax_id}</TIN>
      </ServiceTIN>
    </soap:Body>
  </soap:Envelope>`;

  axios({
    method: "post",
    url: url,
    headers,
    data: xml,
    httpsAgent: httpsAgent
  }).then(response => {
    let result = response.data;
    result = JSON.parse(result.replace(/<[^>]*>/g, ""))
    console.log('result:',result)
  })
  .catch(error => {
    console.log('error --',error)
  });
}

verifiedTIN("0135556015413")
module.exports = verifiedTIN 