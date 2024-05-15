require('dotenv').config();

const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;  // Utiliza una variable de entorno para el puerto

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

// Ruta GET para la raíz del servidor
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de CVs!');
});

// Ruta POST para subir y procesar archivos PDF
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || req.file.mimetype !== 'application/pdf') {
        return res.status(400).send('No file uploaded or file is not a PDF.');
    }

    try {
        const data = await pdf(req.file.buffer);
        const text = data.text;

        console.log("Extracted Text:", text); // Esto te mostrará en consola lo que se extrajo del PDF

        // Extracción de datos
        const nameMatch = text.match(/^Nombre:\s*(.+)$/im);
        const skillsMatch = text.match(/Habilidades:\s*(.+)/i);
        const experienceMatch = text.match(/Experiencia:([\s\S]*?)(Educación|Certificaciones|Referencias|$)/i);

        const cvData = {
            nombre: nameMatch ? nameMatch[1].trim() : null,
            habilidades: skillsMatch ? skillsMatch[1].split(/,\s*/) : [],
            experiencia: experienceMatch ? experienceMatch[1].trim() : null
        };

        res.json(cvData);
    } catch (error) {
        console.error('Error processing PDF', error);
        res.status(500).send(`Error processing PDF: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
