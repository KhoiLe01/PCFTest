const mariadb = require("mariadb")

export interface USINFO {
  ProjectID: string;
  Project: string;
  ClientID: string;
  ClientName: string;
  description_el: string;
}

export interface EUINFO {
  ProjectID: string;
  Project: string;
  ClientID: string;
  ClientName: string;
}

const UIDUS = (process.env.USER || "")+(process.env.US_HOST || "")
const UIDEU = (process.env.USER || "")+(process.env.EU_HOST || "")

const poolUS = mariadb.createPool({
    host: process.env.US_SERVER,
    user: UIDUS,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
const poolEU = mariadb.createPool({
  host: process.env.EU_SERVER,
  user: UIDEU,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

export default async function connectDB() {
    let connUS;
    let dataUS;

    let connEU;
    let dataEU;

    try {
      connUS = await poolUS.getConnection();
      const rows = await connUS.query("Select j.id As ProjectId, j.name As Project, c.id As ClientId, c.orga_name As ClientName, j.description_el From viewer_lvn_com.job j Join viewer_lvn_com.client c On c.id = j.client_id");
      // const temp = rows[0]
      // console.log("---US---")
      // console.log(temp)
      // for (var key in temp){
      //   console.log(key, typeof temp.key)
      // }
      dataUS = rows.map((element: USINFO) => {
        try {
          return element.Project
        } catch(err) {
          // do nothing
        }
      })
      connUS.end()
      poolUS.end()
    } catch (err) {
      throw err;
    }
    try {
      connEU = await poolEU.getConnection();
      const rows = await connEU.query("Select j.id As ProjectId, j.name As Project, c.id As ClientId, c.orga_name As ClientName From viewer_leverton_de.job j Join viewer_leverton_de.client c On c.id = j.client_id");
      // const temp = rows[0]
      // console.log("---EU---")
      // for (var key in temp){
      //   console.log(key, typeof temp.key)
      // }
      dataEU = rows.map((element: EUINFO) => {
        try {
          return element.Project
        } catch(err) {
          // do nothing
        }
      })
      connEU.end()
      poolEU.end()
    } catch (err) {
      throw err;
    }
    // console.log(dataUS)
    // console.log(dataEU)
    return [dataUS, dataEU]
  }
connectDB()