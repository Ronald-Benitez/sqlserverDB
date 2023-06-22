import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   AeropuertoInput:
 *      type: object
 *      properties:
 *          nombre:
 *              type: string
 *              example: Aeropuerto de prueba
 *          codigo_iata:
 *              type: string
 *              example: APX
 *          pais:
 *              type: string
 *              example: MX
 *          ciudad:
 *              type: string
 *              example: Ciudad de prueba
 *          latitud:
 *              type: number
 *              example: 25.12345678
 *          longitud:
 *              type: number
 *              example: -100.98765432
 * definitions:
 *      Aeropuerto:
 *          type: object
 *          properties:
 *              codigo_iata:
 *                  type: string
 *                  example: APX
 *              nombre:
 *                  type: string
 *                  example: Aeropuerto de prueba
 *              pais:
 *                  type: string
 *                  example: MX
 *              ciudad:
 *                  type: string
 *                  example: Ciudad de prueba
 *              latitud:
 *                  type: number
 *                  example: 25.12345678
 *              longitud:
 *                  type: number
 *                  example: -100.98765432
 *
 */

/**
 * @openapi
 * /api/aeropuertos:
 *   get:
 *     tags:
 *       - Aeropuertos
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
 *                     $ref: '#/definitions/Aeropuerto'
 */
router.get("/", async (req, res) => {
  try {
    const aeropuertos = await prisma.aeropuertos.findMany();
    res.json(aeropuertos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los aeropuertos" });
  }
});

/**
 * @openapi
 * /api/aeropuertos:
 *   post:
 *     tags:
 *       - Aeropuertos
 *     requestBody:
 *          description: Datos del aeropuerto
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AeropuertoInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Aeropuerto'
 */
router.post("/", async (req, res) => {
  try {
    const nuevoAeropuerto = await prisma.aeropuertos.create({
      data: req.body,
    });
    res.json(nuevoAeropuerto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el aeropuerto" });
  }
});

/**
 * @openapi
 * /api/aeropuertos/{codigo_iata}:
 *  get:
 *    tags:
 *      - Aeropuertos
 *    description: Obtiene un aeropuerto por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA del aeropuerto
 *        required: true
 *        schema:
 *          type: string
 *          example: APX
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aeropuerto'
 */
router.get("/:codigo_iata", async (req, res) => {
  try {
    const aeropuerto = await prisma.aeropuertos.findUnique({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
    });
    res.json(aeropuerto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el aeropuerto" });
  }
});

/**
 * @openapi
 * /api/aeropuertos/{codigo_iata}:
 *  put:
 *    tags:
 *      - Aeropuertos
 *    description: Actualiza un aeropuerto por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA del aeropuerto
 *        required: true
 *        schema:
 *          type: string
 *          example: APX
 *    requestBody:
 *      description: Datos del aeropuerto
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AeropuertoInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aeropuerto'
 */
router.put("/:codigo_iata", async (req, res) => {
  try {
    const aeropuerto = await prisma.aeropuertos.update({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
      data: req.body,
    });
    res.json(aeropuerto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el aeropuerto" });
  }
});

/**
 * @openapi
 * /api/aeropuertos/{codigo_iata}:
 *  delete:
 *    tags:
 *      - Aeropuertos
 *    description: Elimina un aeropuerto por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA del aeropuerto
 *        required: true
 *        schema:
 *          type: string
 *          example: APX
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aeropuerto'
 */
router.delete("/:codigo_iata", async (req, res) => {
  try {
    const aeropuerto = await prisma.aeropuertos.delete({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
    });
    res.json(aeropuerto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el aeropuerto" });
  }
});

export default router;
