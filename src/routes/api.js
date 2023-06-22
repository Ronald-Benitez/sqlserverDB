import { Router } from "express";

//Routes
import aerolineas from "./api/aerolineas";
import aeropuertos from "./api/aeropuertos";
import aviones from "./api/aviones";
import boletos from "./api/boletos";
import checkin from "./api/checkin";
import correos from "./api/correos";
import escalas from "./api/escalas";
import paises from "./api/paises";
import pasajeros_atrasados from "./api/pasajeros_atrasados";
import pasajeros from "./api/pasajeros";
import telefonos from "./api/telefonos";
import vuelos from "./api/vuelos";

const router = Router();

router.use("/aerolineas", aerolineas);
router.use("/aeropuertos", aeropuertos);
router.use("/aviones", aviones);
router.use("/boletos", boletos);
router.use("/checkins", checkin);
router.use("/correos", correos);
router.use("/escalas", escalas);
router.use("/paises", paises);
router.use("/pasajeros_atrasados", pasajeros_atrasados);
router.use("/pasajeros", pasajeros);
router.use("/telefonos", telefonos);
router.use("/vuelos", vuelos);

export default router;