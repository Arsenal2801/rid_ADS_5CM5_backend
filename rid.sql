-- Creación de la tabla de Roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- Creación de la tabla de Usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    curp VARCHAR(18) UNIQUE NOT NULL,
    rfc VARCHAR(13) UNIQUE,
    sexo ENUM('Hombre', 'Mujer', 'Otro') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255),
    id_rol INT,
    cedula_profesional VARCHAR(20),
    grado_estudios VARCHAR(100),
    titulo_obtenido VARCHAR(100),
    id_celula INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_celula) REFERENCES celulas_trabajo(id_celula) -- Solo si el usuario pertenece a una célula
);

-- Creación de la tabla de Células de Trabajo
CREATE TABLE celulas_trabajo (
    id_celula INT AUTO_INCREMENT PRIMARY KEY,
    nombre_celula VARCHAR(100) NOT NULL,
    id_director INT,
    FOREIGN KEY (id_director) REFERENCES usuarios(id_usuario) -- Solo los directores pueden gestionar células
);

-- Creación de la tabla de Casos con secciones I, V, VI, VII del FUD
CREATE TABLE casos (
    id_caso INT AUTO_INCREMENT PRIMARY KEY,
    id_celula INT,
    estado_orfandad BOOLEAN DEFAULT FALSE,
    fecha_creacion DATE NOT NULL,
    descripcion_caso TEXT,
    -- Sección I: Datos del solicitante
    datos_solicitante TEXT,
    -- Sección V: Lugar, fecha y relato de los hechos victimizantes
    lugar_hechos TEXT,
    fecha_hechos DATE,
    relato_hechos TEXT,
    -- Sección VI: Observaciones preliminares del servidor público o autoridad
    observaciones_preliminares TEXT,
    -- Sección VII: Autoridades que han conocido de los hechos victimizantes
    autoridades_conocen TEXT,
    FOREIGN KEY (id_celula) REFERENCES celulas_trabajo(id_celula)
);

-- Creación de la tabla de Diagnósticos del Entorno
CREATE TABLE diagnostico_entorno (
    id_diagnostico_entorno INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    fecha_diagnostico DATE NOT NULL,
    condiciones_entorno TEXT,
    factores_riesgo TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Creación de la tabla de Diagnósticos Iniciales
CREATE TABLE diagnostico_inicial (
    id_diagnostico_inicial INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    fecha_diagnostico DATE NOT NULL,
    estado_nna TEXT,
    estado_derechos TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Creación de la tabla para Derechos del Diagnóstico Inicial con su estado
CREATE TABLE diagnostico_derechos (
    id_derecho_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    id_diagnostico_inicial INT,
    id_derecho INT,
    estado_derecho ENUM('desactualizado', 'vulnerado', 'atendido', 'restituido'),
    FOREIGN KEY (id_diagnostico_inicial) REFERENCES diagnostico_inicial(id_diagnostico_inicial),
    FOREIGN KEY (id_derecho) REFERENCES derechos(id_derecho)
);

-- Creación de la tabla Plan de Restitución de Derechos
CREATE TABLE plan_restitucion (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    descripcion TEXT,
    fecha_plan DATE,
    nivel_coercion ENUM('bajo', 'medio', 'alto'),
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Relación del plan de restitución con los derechos vulnerados
CREATE TABLE plan_restitucion_derechos (
    id_plan_restitucion INT AUTO_INCREMENT PRIMARY KEY,
    id_plan INT,
    id_derecho INT,
    descripcion_accion TEXT, -- Descripción de la acción para restituir el derecho
    fecha_accion DATE,
    estado_accion ENUM('pendiente', 'en progreso', 'completado'),
    FOREIGN KEY (id_plan) REFERENCES plan_restitucion(id_plan),
    FOREIGN KEY (id_derecho) REFERENCES derechos(id_derecho)
);

-- Creación de la tabla Plan de Acción (para cubrir todos los aspectos del caso)
CREATE TABLE plan_accion (
    id_plan_accion INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    fecha_plan DATE NOT NULL,
    objetivo_general TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Creación de la tabla de Acciones
CREATE TABLE acciones (
    id_accion INT AUTO_INCREMENT PRIMARY KEY,
    id_plan_accion INT,
    descripcion_accion TEXT,
    responsable INT,
    fecha_ejecucion DATE,
    FOREIGN KEY (id_plan_accion) REFERENCES plan_accion(id_plan_accion),
    FOREIGN KEY (responsable) REFERENCES usuarios(id_usuario)
);

-- Creación de la tabla de Pasos de las Acciones
CREATE TABLE pasos (
    id_paso INT AUTO_INCREMENT PRIMARY KEY,
    id_accion INT,
    descripcion_paso TEXT,
    fecha_completado DATE,
    FOREIGN KEY (id_accion) REFERENCES acciones(id_accion)
);

-- Creación de la tabla de Derechos
CREATE TABLE derechos (
    id_derecho INT AUTO_INCREMENT PRIMARY KEY,
    tipo_derecho VARCHAR(100),
    derecho_especifico TEXT,
    descripcion TEXT,
    sustento_legal TEXT
);

-- Relación entre Derechos y Acciones
ALTER TABLE acciones ADD COLUMN id_derecho INT;
ALTER TABLE acciones ADD FOREIGN KEY (id_derecho) REFERENCES derechos(id_derecho);

-- Creación de la tabla de Alcaldías/Municipios
CREATE TABLE alcaldias_municipios (
    id_alcaldia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_alcaldia VARCHAR(100)
);

-- Creación de la tabla de Actores en Materia de Derechos
CREATE TABLE actores_derechos (
    id_actor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actor VARCHAR(255),
    direccion TEXT,
    id_alcaldia INT,
    tipo_actor VARCHAR(100),
    descripcion TEXT,
    datos_contacto TEXT,
    capacidad INT,
    fecha_deteccion DATE,
    FOREIGN KEY (id_alcaldia) REFERENCES alcaldias_municipios(id_alcaldia)
);

-- Creación de la tabla de Servicios
CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_actor INT,
    nombre_servicio VARCHAR(255),
    tipo_servicio VARCHAR(100),
    derechos_restitucion TEXT,
    capacidad INT,
    unidad_medida VARCHAR(50),
    precio DECIMAL(10, 2),
    FOREIGN KEY (id_actor) REFERENCES actores_derechos(id_actor)
);

-- Creación de la tabla de NNA (Niños, Niñas y Adolescentes)
CREATE TABLE nna (
    id_nna INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    nombre_completo VARCHAR(255),
    curp VARCHAR(18) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    sexo ENUM('Hombre', 'Mujer', 'Otro'),
    lugar_nacimiento TEXT,
    estado_civil ENUM('Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre', 'Concubinato', 'Separado/a'),
    nacionalidad VARCHAR(100),
    datos_contacto TEXT,
    direccion TEXT,
    datos_salud TEXT,
    antecedentes_victimizacion TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Creación de la tabla de Tutores
CREATE TABLE tutores (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    nombre_completo VARCHAR(255),
    sexo ENUM('Hombre', 'Mujer', 'Otro'),
    fecha_nacimiento DATE,
    curp VARCHAR(18),
    rfc VARCHAR(13),
    nivel_estudios VARCHAR(100),
    situacion_economica TEXT,
    idiomas TEXT,
    identificaciones_oficiales TEXT,
    domicilio TEXT,
    condiciones_domicilio TEXT,
    datos_contacto TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Nueva tabla para el Interés Superior del Niño
CREATE TABLE interes_superior_nna (
    id_interes INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    factores_evaluados TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Nueva tabla para Acompañamiento Judicial
CREATE TABLE acomp_judicial (
    id_acomp INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    descripcion TEXT,
    fecha DATE,
    resultado TEXT,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Nueva tabla para Reportes del Caso
CREATE TABLE reportes_caso (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    tipo_reporte VARCHAR(100),
    descripcion TEXT,
    fecha DATE,
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso)
);

-- Nueva tabla de actualizaciones generales para el caso
CREATE TABLE actualizaciones_generales (
    id_actualizacion_general INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    fecha_actualizacion DATETIME NOT NULL,
    descripcion TEXT NOT NULL, -- Descripción de la actualización general
    autor_actualizacion INT, -- Usuario que realiza la actualización
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso),
    FOREIGN KEY (autor_actualizacion) REFERENCES usuarios(id_usuario)
);

-- Nueva tabla de actualizaciones para cada derecho del niño
CREATE TABLE actualizaciones_derechos (
    id_actualizacion_derecho INT AUTO_INCREMENT PRIMARY KEY,
    id_caso INT,
    id_derecho INT, -- Derecho al que se refiere la actualización
    fecha_actualizacion DATETIME NOT NULL,
    descripcion TEXT NOT NULL, -- Descripción de la actualización específica para el derecho
    autor_actualizacion INT, -- Usuario que realiza la actualización
    FOREIGN KEY (id_caso) REFERENCES casos(id_caso),
    FOREIGN KEY (id_derecho) REFERENCES derechos(id_derecho),
    FOREIGN KEY (autor_actualizacion) REFERENCES usuarios(id_usuario)
);
