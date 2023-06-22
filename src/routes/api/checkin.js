import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   CheckinInput:
 *      type: object
 *      properties:
 *          id_boleto:
 *              type: integer
 *              example: 1
 *          pasaporte_pasajero:
 *              type: string
 *              example: ABC123
 *          n_vuelo:
 *              type: string
 *              example: FL-1
 *          fecha:
 *              type: string
 *              format: date
 *              example: "2023-06-20"
 *          hora:
 *              type: string
 *              format: time
 *              example: "10:30:00"
 *          estado:
 *              type: string
 *              example: Pendiente
 * definitions:
 *      Checkin:
 *          type: object
 *          properties:
 *              id_boleto:
 *                  type: integer
 *                  example: 1
 *              pasaporte_pasajero:
 *                  type: string
 *                  example: ABC123
 *              n_vuelo:
 *                  type: string
 *                  example: FL-1
 *              fecha:
 *                  type: string
 *                  format: date
 *                  example: "2023-06-20"
 *              hora:
 *                  type: string
 *                  format: time
 *                  example: "10:30:00"
 *              estado:
 *                  type: string
 *                  example: Pendiente
 *
 */

/**
 * @openapi
 * /api/checkins:
 *   get:
 *     tags:
 *       - Checkins
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
 *                     $ref: '#/definitions/Checkin'
 */
router.get("/", async (req, res) => {
  try {
    const checkins = await prisma.checkin.findMany();
    res.json(checkins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los check-ins" });
  }
});

/**
 * @openapi
 * /api/checkins:
 *   post:
 *     tags:
 *       - Checkins
 *     requestBody:
 *          description: Datos del check-in
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CheckinInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Checkin'
 */
router.post("/", async (req, res) => {
  try {
    const { fecha, hora, ...data } = req.body;
    const nuevaFecha = new Date(fecha);
    const nuevaHora = new Date("1970-01-01T" + hora);
    nuevaHora.setHours(nuevaHora.getHours() - 6);
    const nuevoCheckin = await prisma.checkin.create({
      data: { ...data, fecha: nuevaFecha, hora: nuevaHora },
    });
    res.json(nuevoCheckin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el check-in" });
  }
});

/**
 * @openapi
 * /api/checkins/{id}:
 *  get:
 *    tags:
 *      - Checkins
 *    description: Obtiene un check-in por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del check-in
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
 *              $ref: '#/definitions/Checkin'
 */
router.get("/:id", async (req, res) => {
  try {
    const checkin = await prisma.checkin.findUnique({
      where: {
        id_boleto: parseInt(req.params.id),
      },
    });
    res.json(checkin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el check-in" });
  }
});

/**
 * @openapi
 * /api/checkins/n_vuelo/{n_vuelo}:
 *   get:
 *     tags:
 *       - Checkins
 *     description: Obtiene los datos de un check-in por el número de vuelo
 *     parameters:
 *       - name: n_vuelo
 *         in: path
 *         description: Número de vuelo del check-in
 *         required: true
 *         schema:
 *           type: string
 *           example: "FL-1"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkin'
 */
router.get("/n_vuelo/:n_vuelo", async (req, res) => {
  try {
    const checkin = await prisma.checkin.findMany({
      where: {
        n_vuelo: req.params.n_vuelo,
      },
    });
    res.json(checkin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el check-in" });
  }
});

/**
 * @openapi
 * /api/checkins/{id}:
 *  put:
 *    tags:
 *      - Checkins
 *    description: Actualiza un check-in por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del check-in
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      description: Datos del check-in
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CheckinInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Checkin'
 */
router.put("/:id", async (req, res) => {
  try {
    const { fecha, hora, ...data } = req.body;
    const nuevaFecha = new Date(fecha);
    const nuevaHora = new Date("1970-01-01T" + hora);
    nuevaHora.setHours(nuevaHora.getHours() - 6);
    const checkin = await prisma.checkin.update({
      where: {
        id_boleto: parseInt(req.params.id),
      },
      data: { ...data, fecha: nuevaFecha, hora: nuevaHora },
    });
    res.json(checkin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el check-in" });
  }
});

/**
 * @openapi
 * /api/checkins/{id}:
 *  delete:
 *    tags:
 *      - Checkins
 *    description: Elimina un check-in por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del check-in
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
 *              $ref: '#/definitions/Checkin'
 */
router.delete("/:id", async (req, res) => {
  try {
    const checkin = await prisma.checkin.delete({
      where: {
        id_boleto: parseInt(req.params.id),
      },
    });
    res.json(checkin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el check-in" });
  }
});

export default router;
