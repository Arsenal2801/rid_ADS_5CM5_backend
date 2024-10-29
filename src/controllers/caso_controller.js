const Caso = require("../models/Casos"); // Asegúrate de importar tu modelo

// Crear un nuevo caso
const crearCaso = async (req, res) => {
  try {
    const {
      id_celula,
      estado_orfandad, // Asegúrate de que este valor sea 0 o 1
      fecha_creacion,
      descripcion_caso,
      datos_solicitante,
      lugar_hechos,
      fecha_hechos,
      relato_hechos,
      observaciones_preliminares,
      autoridades_conocen,
    } = req.body;

    // Validar que estado_orfandad sea 0 o 1
    const estado = estado_orfandad === 1 ? 1 : 0; // Convierte a 1 o 0

    const nuevoCaso = await Caso.create({
      id_celula,
      estado_orfandad: estado, // Establece el valor aquí
      fecha_creacion,
      descripcion_caso,
      datos_solicitante,
      lugar_hechos,
      fecha_hechos,
      relato_hechos,
      observaciones_preliminares,
      autoridades_conocen,
    });

    return res.status(201).json(nuevoCaso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el caso." });
  }
};

// Obtener todos los casos
const obtenerCasos = async (req, res) => {
  try {
    const casos = await Caso.findAll();
    return res.status(200).json(casos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener los casos." });
  }
};

// Obtener un caso por ID
const obtenerCasoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const caso = await Caso.findByPk(id);
    if (!caso) {
      return res.status(404).json({ error: "Caso no encontrado." });
    }
    return res.status(200).json(caso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el caso." });
  }
};

// Actualizar un caso por ID
const actualizarCaso = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      id_celula,
      estado_orfandad,
      fecha_creacion,
      descripcion_caso,
      datos_solicitante,
      lugar_hechos,
      fecha_hechos,
      relato_hechos,
      observaciones_preliminares,
      autoridades_conocen,
    } = req.body;

    const estado = estado_orfandad === 1 ? 1 : 0; // Convierte a 1 o 0

    const [updated] = await Caso.update(
      {
        id_celula,
        estado_orfandad: estado,
        fecha_creacion,
        descripcion_caso,
        datos_solicitante,
        lugar_hechos,
        fecha_hechos,
        relato_hechos,
        observaciones_preliminares,
        autoridades_conocen,
      },
      {
        where: { id_caso: id },
      }
    );

    if (!updated) {
      return res.status(404).json({ error: "Caso no encontrado." });
    }

    const casoActualizado = await Caso.findByPk(id);
    return res.status(200).json(casoActualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el caso." });
  }
};

// Eliminar un caso por ID
const eliminarCaso = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Caso.destroy({
      where: { id_caso: id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Caso no encontrado." });
    }

    return res.status(204).json(); // No content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar el caso." });
  }
};

module.exports = {
  crearCaso,
  obtenerCasos,
  obtenerCasoPorId,
  actualizarCaso,
  eliminarCaso,
};
