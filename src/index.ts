import axios, { AxiosRequestConfig } from 'axios'
import * as https from "https";

export interface SetFormatData {
  method?: string;
  url?: string;
  headers: Header;
  data: string;
  httpsAgent: any;
}
export interface Header {
  "Content-Type": string;
  "Content-Length": string;
  Host: string;
  SOAPAction: string;
}

export const CheckTaxID = async (TAXID: string): Promise<string> => {
  TAXID = TAXID.replace(/[^\w\s]/gi, "")
  const headers = {
    'Content-Type': 'text/xml; charset=utf-8',
    'Content-Length': 'length',
    Host: 'rdws.rd.go.th',
    SOAPAction: 'https://rdws.rd.go.th/JserviceRD3/checktinpinservice/ServiceTIN',
  };
  const httpsAgent = new https.Agent({
    ciphers: 'AES128-SHA',
    rejectUnauthorized: false, 
  });
  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <ServiceTIN xmlns="https://rdws.rd.go.th/JserviceRD3/checktinpinservice">
        <username>anonymous</username>
        <password>anonymous</password>
        <TIN>${TAXID}</TIN>
      </ServiceTIN>
    </soap:Body>
  </soap:Envelope>`;

  const data : SetFormatData = {
    url: "https://rdws.rd.go.th/jsonRD/checktinpinservice.asmx",
    headers,
    data: xml,
    httpsAgent,
  }
  const tax = await getResult(data)
  if(tax && tax.MessageErr && tax.MessageErr.length > 0){
    return tax.MessageErr[0]
  }else if(tax && tax.IsExist && tax.IsExist.length > 0){
    return tax.IsExist[0]
  }else{
    return tax
  }
}

export const getResult = (data: SetFormatData): Promise<any> => {
  const config : AxiosRequestConfig = {
    method: 'post',
    url: data.url,
    data: data.data,
    headers: data.headers,
    httpsAgent: data.httpsAgent 
  }
  return new Promise((resolve, reject) => {
    axios({
      ...config
    }).then((response: any) => {
        const result = response.data;
        resolve(JSON.parse(result.replace(/<[^>]*>/g, "")));
    })
    .catch(error => {
      reject(error);
    });
  });
}