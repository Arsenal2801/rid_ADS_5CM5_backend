const CelulasTrabajo = require("../models/CelulasTrabajo");

// Obtener todas las celdas de trabajo
exports.getAllCelulas = async (req, res) => {
  try {
    const celulas = await CelulasTrabajo.findAll();
    res.json(celulas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una celula de trabajo por ID
exports.getCelulaById = async (req, res) => {
  try {
    const celula = await CelulasTrabajo.findByPk(req.params.id);
    if (celula) {
      res.json(celula);
    } else {
      res.status(404).json({ message: "Celula not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva celula de trabajo
exports.createCelula = async (req, res) => {
  try {
    const newCelula = await CelulasTrabajo.create(req.body);
    res.status(201).json(newCelula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una celula de trabajo existente
exports.updateCelula = async (req, res) => {
  try {
    const [updated] = await CelulasTrabajo.update(req.body, {
      where: { id_celula: req.params.id },
    });
    if (updated) {
      const updatedCelula = await CelulasTrabajo.findByPk(req.params.id);
      res.json(updatedCelula);
    } else {
      res.status(404).json({ message: "Celula not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una celula de trabajo
exports.deleteCelula = async (req, res) => {
  try {
    const deleted = await CelulasTrabajo.destroy({
      where: { id_celula: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Celula not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
