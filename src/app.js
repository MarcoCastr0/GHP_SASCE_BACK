// src/app.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import rolRoutes from "./routes/rolRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import estudianteRoutes from "./routes/estudianteRoutes.js"
import profesorRoutes from "./routes/profesorRoutes.js"
import especialidadProfesorRoutes from "./routes/especialidadProfesorRoutes.js"
import ocupacionProfesorRoutes from "./routes/ocupacionProfesorRoutes.js"
import periodoAcademicoRoutes from "./routes/periodoAcademicoRoutes.js"
import nivelAcademicoRoutes from "./routes/nivelAcademicoRoutes.js"
import grupoEstudianteRoutes from "./routes/grupoEstudianteRoutes.js"
import estudianteGrupoRoutes from "./routes/estudianteGrupoRoutes.js"
import ocupacionEstudianteRoutes from "./routes/ocupacionEstudianteRoutes.js"
import caracteristicaGrupoRoutes from "./routes/caracteristicaGrupoRoutes.js"
import ocupacionGrupoRoutes from "./routes/ocupacionGrupoRoutes.js"
import edificioRoutes from "./routes/edificioRoutes.js"
import salonRoutes from "./routes/salonRoutes.js"
import tipoRecursoRoutes from "./routes/tipoRecursoRoutes.js"
import recursoSalonRoutes from "./routes/recursoSalonRoutes.js"
import ocupacionSalonRoutes from "./routes/ocupacionSalonRoutes.js"
import franjaHorariaRoutes from "./routes/franjaHorariaRoutes.js"
import tipoAsignacionRoutes from "./routes/tipoAsignacionRoutes.js"
import asignacionRoutes from "./routes/asignacionRoutes.js"
import restriccionRoutes from "./routes/restriccionRoutes.js"
import conflictoRoutes from "./routes/conflictoRoutes.js"
import registroAuditoriaRoutes from "./routes/registroAuditoriaRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/roles", rolRoutes)
app.use("/api/usuarios", userRoutes)
app.use("/api/estudiantes", estudianteRoutes)
app.use("/api/profesores", profesorRoutes)
app.use("/api/especialidades-profesor", especialidadProfesorRoutes)
app.use("/api/ocupaciones-profesor", ocupacionProfesorRoutes)
app.use("/api/periodos-academicos", periodoAcademicoRoutes)
app.use("/api/niveles-academicos", nivelAcademicoRoutes)
app.use("/api/grupos-estudiante", grupoEstudianteRoutes)
app.use("/api/estudiantes-grupo", estudianteGrupoRoutes)
app.use("/api/ocupaciones-estudiante", ocupacionEstudianteRoutes)
app.use("/api/caracteristicas-grupo", caracteristicaGrupoRoutes)
app.use("/api/ocupaciones-grupo", ocupacionGrupoRoutes)
app.use("/api/edificios", edificioRoutes)
app.use("/api/salones", salonRoutes)
app.use("/api/tipos-recurso", tipoRecursoRoutes)
app.use("/api/recursos-salon", recursoSalonRoutes)
app.use("/api/ocupaciones-salon", ocupacionSalonRoutes)
app.use("/api/franjas-horarias", franjaHorariaRoutes)
app.use("/api/tipos-asignacion", tipoAsignacionRoutes)
app.use("/api/asignaciones", asignacionRoutes)
app.use("/api/restricciones", restriccionRoutes)
app.use("/api/conflictos", conflictoRoutes)
app.use("/api/registros-auditoria", registroAuditoriaRoutes)

app.get("/", (req, res) => res.send("🚀 API GHP_SASCE (Supabase) - Sistema de Asignación de Salones"))

export default app
