const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const credentials = require("./credentials");

const serviceAccountAuth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(
    "1W3PhnJDv4h0VdzX0X9PDO9GzPJ1ANFKkTSzaaBk7U5s",
    serviceAccountAuth
  );

  await doc.loadInfo(); 

   console.log(doc.title);
  // await doc.updateProperties({ title: "renamed doc" });

  const sheet = doc.sheetsByIndex[1];
  console.log(sheet.title);
  console.log(sheet.rowCount);
  const firstRows = await sheet.getRows()

  // await newSheet.delete();

  // await doc.loadInfo();
  console.log(sheet.headerValues, firstRows);
}

async function readInputSheet() {

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
  
    const sheet = doc.sheetsByTitle['Районы'];
  
    const data = {};
  
    rows.forEach(row => {
      const район = row['Район']?.trim(); 
      const подрайон = row['Подрайон']?.trim();
  
      if (район) {
        if (!data[район]) {
          data[район] = [];
        }
        if (подрайон) {
          data[район].push(подрайон); 
        }
      }
    });
  
    return data;
  }
  

  /*
   Функция обращается к листу "Районы",
   Забирает оттуда данные и возвращает
   в виде { район: подрайоны[], ..., район: подрайоны[] }
  */


async function writeNewRequest(request_data) {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle['Заявки'];
  await sheet.addRow(request_data);
  /*
   Функция обращается к листу "Заявки",
  ** Добавляет новую строку с request_data
  */
}


accessSpreadsheet().catch(console.error);