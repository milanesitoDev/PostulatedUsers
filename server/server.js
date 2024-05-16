require("dotenv").config();
const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
//const { fetchApplicants } = require('../node_modules/service/linkedinAPI'); //

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor de simulación de PDFs!");
});

app.get("/api/generate-pdf", async (req, res) => {
  try {
    // const jobId = req.query.jobId;  // Asumiendo que recibes un jobId como query param
    // const data = await fetchApplicants(jobId);

    // if (!data) {
    //     return res.status(404).send('No applicants data found');
    // }

    const dataPath = path.join(__dirname, "data", "SimulatedData.json"); // Asegúrate de que la ruta es correcta
    const data = require(dataPath); // Carga los datos del archivo JSON

    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, "output.pdf");
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    doc.font("Helvetica");
    doc.fontSize(12);
    doc.text(JSON.stringify(data.applicants, null, 2), {
      align: "left",
      indent: 20,
      height: 300,
      ellipsis: true,
    });
    doc.end();

    stream.on("finish", () => {
      res.sendFile(pdfPath);
    });

    stream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).send("Error creating PDF stream");
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
