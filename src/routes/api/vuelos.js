import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   VueloInput:
 *      type: object
 *      properties:
 *          codigo_aerolinea:
 *              type: string
 *              example: UA
 *          id_avion:
 *              type: integer
 *              example: 1
 *          codigo_origen:
 *              type: string
 *              example: LAX
 *          codigo_destino:
 *              type: string
 *              example: JFK
 *          fecha:
 *              type: string
 *              format: date
 *              example: "2023-06-20"
 *          hora_salida:
 *              type: string
 *              format: time
 *              example: "10:30:00"
 *          hora_llegada:
 *              type: string
 *              format: time
 *              example: "11:30:00"
 * definitions:
 *      Vuelo:
 *          type: object
 *          properties:
 *              n_vuelo:
 *                  type: string
 *                  example: FL-0
 *              codigo_aerolinea:
 *                  type: string
 *                  example: UA
 *              id_avion:
 *                  type: integer
 *                  example: 1
 *              codigo_origen:
 *                  type: string
 *                  example: LAX
 *              codigo_destino:
 *                  type: string
 *                  example: JFK
 *              distancia:
 *                  type: number
 *                  example: 3000.50
 *              fecha:
 *                  type: string
 *                  format: date
 *                  example: "2023-06-20"
 *              hora_salida:
 *                  type: string
 *                  format: time
 *                  example: "10:30:00"
 *              hora_llegada:
 *                  type: string
 *                  format: time
 *                  example: "11:30:00"
 *
 */

/**
 * @openapi
 * /api/vuelos:
 *   get:
 *     tags:
 *       - Vuelos
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
 *                     $ref: '#/definitions/Vuelo'
 */
router.get("/", async (req, res) => {
  try {
    //set order by n_vuelo

    const vuelos = await prisma.vuelos.findMany({
      orderBy: {
        fecha: "asc",
      },
    });
    res.json(vuelos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los vuelos" });
  }
});

/**
 * @openapi
 * /api/vuelos:
 *   post:
 *     tags:
 *       - Vuelos
 *     requestBody:
 *          description: Datos del vuelo
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/VueloInput'
 *     responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Vuelo'
 *        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 */
router.post("/", async (req, res) => {
  try {
    const { hora_llegada, hora_salida } = req.body;
    req.body.fecha = new Date(req.body.fecha);
    const nuevaLlegada = new Date("1970-01-01T" + hora_llegada);
    const nuevaSalida = new Date("1970-01-01T" + hora_salida);
    nuevaLlegada.setHours(nuevaLlegada.getHours() - 6);
    nuevaSalida.setHours(nuevaSalida.getHours() - 6);
    req.body.hora_llegada = nuevaLlegada;
    req.body.hora_salida = nuevaSalida;

    const nuevoVuelo = await prisma.vuelos.createMany({
      data: req.body,
    });
    res.status(201).json(nuevoVuelo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el vuelo" });
  }
});

/**
 * @openapi
 * /api/vuelos/{n_vuelo}:
 *  get:
 *    tags:
 *      - Vuelos
 *    description: Obtiene un vuelo por su número de vuelo
 *    parameters:
 *      - name: n_vuelo
 *        in: path
 *        description: Número de vuelo
 *        required: true
 *        schema:
 *          type: string
 *          example: FL-0
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Vuelo'
 */
router.get("/:n_vuelo", async (req, res) => {
  try {
    const vuelo = await prisma.vuelos.findUnique({
      // Corregido de 'prisma.vuelos.findUnique()'
      where: {
        n_vuelo: req.params.n_vuelo,
      },
    });
    res.json(vuelo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el vuelo" });
  }
});

/**
 * @openapi
 * /api/vuelos/{n_vuelo}:
 *  put:
 *    tags:
 *      - Vuelos
 *    description: Actualiza un vuelo por su número de vuelo
 *    parameters:
 *      - name: n_vuelo
 *        in: path
 *        description: Número de vuelo
 *        required: true
 *        schema:
 *          type: string
 *          example: FL-0
 *    requestBody:
 *      description: Datos del vuelo
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VueloInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Vuelo'
 */
router.put("/:n_vuelo", async (req, res) => {
  try {
    const { hora_llegada, hora_salida } = req.body;
    req.body.fecha = new Date(req.body.fecha);
    const nuevaLlegada = new Date("1970-01-01T" + hora_llegada);
    const nuevaSalida = new Date("1970-01-01T" + hora_salida);
    nuevaLlegada.setHours(nuevaLlegada.getHours() - 6);
    nuevaSalida.setHours(nuevaSalida.getHours() - 6);
    const vuelo = await prisma.vuelos.update({
      // Corregido de 'prisma.vuelos.update()'
      where: {
        n_vuelo: req.params.n_vuelo,
      },
      data: {
        ...req.body,
        hora_llegada: nuevaLlegada,
        hora_salida: nuevaSalida,
      },
    });
    res.json(vuelo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el vuelo" });
  }
});

/**
 * @openapi
 * /api/vuelos/{n_vuelo}:
 *  delete:
 *    tags:
 *      - Vuelos
 *    description: Elimina un vuelo por su número de vuelo
 *    parameters:
 *      - name: n_vuelo
 *        in: path
 *        description: Número de vuelo
 *        required: true
 *        schema:
 *          type: string
 *          example: FL-0
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Vuelo'
 */
router.delete("/:n_vuelo", async (req, res) => {
  try {
    const vuelo = await prisma.vuelos.delete({
      // Corregido de 'prisma.vuelos.delete()'
      where: {
        n_vuelo: req.params.n_vuelo,
      },
    });
    res.json(vuelo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el vuelo" });
  }
});

export default router;
