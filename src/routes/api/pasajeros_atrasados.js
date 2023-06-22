import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   PasajeroAtrasadoInput:
 *      type: object
 *      properties:
 *          pasaporte_pasajero:
 *              type: string
 *              example: ABC123
 *          id_boleto:
 *              type: integer
 *              example: 1
 *          motivo:
 *              type: string
 *              example: Retraso del vuelo
 *          fecha_registro:
 *              type: string
 *              format: date
 *              example: "2023-06-20"
 *          hora_registro:
 *              type: string
 *              format: time
 *              example: "10:30:00"
 *   PasajeroAtrasado:
 *          type: object
 *          properties:
 *              id_atrasado:
 *                  type: integer
 *                  example: 1
 *              pasaporte_pasajero:
 *                  type: string
 *                  example: ABC123
 *              id_boleto:
 *                  type: integer
 *                  example: 1
 *              motivo:
 *                  type: string
 *                  example: Retraso del vuelo
 *              fecha_registro:
 *                  type: string
 *                  format: date
 *                  example: "2023-06-20"
 *              hora_registro:
 *                  type: string
 *                  format: time
 *                  example: "10:30:00"
 *
 */

/**
 * @openapi
 * /api/pasajeros_atrasados:
 *   get:
 *     tags:
 *       - Pasajeros Atrasados
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/PasajeroAtrasado'
 */
router.get("/", async (req, res) => {
  try {
    const pasajerosAtrasados = await prisma.pasajeros_atrasados.findMany();
    res.json(pasajerosAtrasados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los pasajeros atrasados" });
  }
});

/**
 * @openapi
 * /api/pasajeros_atrasados/boleto:
 *   get:
 *     tags:
 *       - Pasajeros Atrasados
 *     summary: Obtiene la lista de pasajeros atrasados con información de los boletos.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/PasajeroAtrasado'
 */

router.get("/boleto", async (req, res) => {
  try {
    const pasajerosAtrasados = await prisma.pasajeros_atrasados.findMany({
      include: {
        boleto: true, // Realiza el inner join con la tabla boleto
      },
    });
    res.json(pasajerosAtrasados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los pasajeros atrasados" });
  }
});



/**
 * @openapi
 * /api/pasajeros_atrasados/{id}:
 *  get:
 *    tags:
 *      - Pasajeros Atrasados
 *    description: Obtiene un pasajero atrasado por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del pasajero atrasado
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/PasajeroAtrasado'
 */
router.get("/:id", async (req, res) => {
  try {
    const pasajeroAtrasado = await prisma.pasajeros_atrasados.findUnique({
      where: {
        id_atrasado: parseInt(req.params.id),
      },
    });
    res.json(pasajeroAtrasado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el pasajero atrasado" });
  }
});


/**
 * @openapi
 * /api/pasajeros_atrasados/{id}:
 *  delete:
 *    tags:
 *      - Pasajeros Atrasados
 *    description: Elimina un pasajero atrasado por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del pasajero atrasado
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/PasajeroAtrasado'
 */
router.delete("/:id", async (req, res) => {
  try {
    const pasajeroAtrasado = await prisma.pasajeros_atrasados.delete({
      where: {
        id_atrasado: parseInt(req.params.id),
      },
    });
    res.json(pasajeroAtrasado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el pasajero atrasado" });
  }
});

export default router;