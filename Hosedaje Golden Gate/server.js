const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Ruta para obtener las opiniones guardadas
app.get("/opiniones", (req, res) => {
    fs.readFile("opiniones.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para guardar una nueva opinión
app.post("/opiniones", (req, res) => {
    const nuevaOpinion = req.body;

    // Leer el archivo y actualizarlo
    fs.readFile("opiniones.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }

        let opiniones = JSON.parse(data);
        opiniones.push(nuevaOpinion);

        fs.writeFile("opiniones.json", JSON.stringify(opiniones, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error al guardar la opinión" });
            }
            res.json({ mensaje: "Opinión guardada correctamente" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
