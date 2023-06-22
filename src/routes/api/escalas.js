import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   EscalaInput:
 *      type: object
 *      properties:
 *          n_vuelo:
 *              type: string
 *              example: FL-0
 *          codigo_aeropuerto:
 *              type: string
 *              example: HND
 *          fecha:
 *              type: string
 *              format: date
 *              example: "2023-06-20"
 *          hora_llegada:
 *              type: string
 *              format: time
 *              example: "10:30:00"
 *          hora_salida:
 *              type: string
 *              format: time
 *              example: "11:30:00"
 *          orden:
 *              type: integer
 *              example: 1
 * definitions:
 *      Escala:
 *          type: object
 *          properties:
 *              id_escala:
 *                  type: integer
 *                  example: 1
 *              n_vuelo:
 *                  type: string
 *                  example: FL-0
 *              codigo_aeropuerto:
 *                  type: string
 *                  example: HND
 *              fecha:
 *                  type: string
 *                  format: date
 *                  example: "2023-06-20"
 *              hora_llegada:
 *                  type: string
 *                  format: time
 *                  example: "10:30:00"
 *              hora_salida:
 *                  type: string
 *                  format: time
 *                  example: "11:30:00"
 *              orden:
 *                  type: integer
 *                  example: 1
 *
 */

/**
 * @openapi
 * /api/escalas:
 *   get:
 *     tags:
 *       - Escalas
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
 *                     $ref: '#/definitions/Escala'
 */
router.get("/", async (req, res) => {
  try {
    const escalas = await prisma.escalas.findMany();
    res.json(escalas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las escalas" });
  }
});

/**
 * @openapi
 * /api/escalas/vuelo/{n_vuelo}:
 *   get:
 *     tags:
 *       - Escalas
 *     parameters:
 *       - name: n_vuelo
 *         in: path
 *         description: Número de vuelo
 *         required: true
 *         schema:
 *           type: string
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
 *                     $ref: '#/definitions/Escala'
 */
router.get("/vuelo/:n_vuelo", async (req, res) => {
  try {
    const escalas = await prisma.escalas.findMany({
      where: {
        n_vuelo: req.params.n_vuelo,
      },
    });
    res.json(escalas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las escalas" });
  }
});


/**
 * @openapi
 * /api/escalas:
 *   post:
 *     tags:
 *       - Escalas
 *     requestBody:
 *          description: Datos de la escala
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/EscalaInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Escala'
 */
router.post("/", async (req, res) => {
  try {
    const { hora_llegada, hora_salida } = req.body;
    req.body.fecha = new Date(req.body.fecha);
    const nuevaLlegada = new Date("1970-01-01T" + hora_llegada);
    const nuevaSalida = new Date("1970-01-01T" + hora_salida);
    nuevaLlegada.setHours(nuevaLlegada.getHours() - 6);
    nuevaSalida.setHours(nuevaSalida.getHours() - 6);

    console.log(req.body);

    const nuevaEscala = await prisma.escalas.create({
      data: {
        ...req.body,
        hora_llegada: nuevaLlegada,
        hora_salida: nuevaSalida,
      },
    });
    res.json(nuevaEscala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la escala" });
  }
});

/**
 * @openapi
 * /api/escalas/{id}:
 *  get:
 *    tags:
 *      - Escalas
 *    description: Obtiene una escala por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID de la escala
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
 *              $ref: '#/definitions/Escala'
 */
router.get("/:id", async (req, res) => {
  try {
    const escala = await prisma.escalas.findUnique({
      where: {
        id_escala: parseInt(req.params.id),
      },
    });
    res.json(escala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la escala" });
  }
});

/**
 * @openapi
 * /api/escalas/{id}:
 *  put:
 *    tags:
 *      - Escalas
 *    description: Actualiza una escala por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID de la escala
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      description: Datos de la escala
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EscalaInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Escala'
 */
router.put("/:id", async (req, res) => {
  try {
    const { hora_llegada, hora_salida } = req.body;
    req.body.fecha = new Date(req.body.fecha);
    const nuevaLlegada = new Date("1970-01-01T" + hora_llegada);
    const nuevaSalida = new Date("1970-01-01T" + hora_salida);
    nuevaLlegada.setHours(nuevaLlegada.getHours() - 6);
    nuevaSalida.setHours(nuevaSalida.getHours() - 6);
    const escala = await prisma.escalas.update({
      where: {
        id_escala: parseInt(req.params.id),
      },
      data: {
        ...req.body,
        hora_llegada: nuevaLlegada,
        hora_salida: nuevaSalida,
      },
    });
    res.json(escala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la escala" });
  }
});

/**
 * @openapi
 * /api/escalas/{id}:
 *  delete:
 *    tags:
 *      - Escalas
 *    description: Elimina una escala por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID de la escala
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
 *              $ref: '#/definitions/Escala'
 */
router.delete("/:id", async (req, res) => {
  try {
    const escala = await prisma.escalas.delete({
      where: {
        id_escala: parseInt(req.params.id),
      },
    });
    res.json(escala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la escala" });
  }
});

export default router;
