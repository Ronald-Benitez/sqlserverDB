import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   AerolineaInput:
 *      type: object
 *      properties:
 *          nombre:
 *              type: string
 *              example: Aerolínea de prueba
 *          codigo_iata:
 *              type: string
 *              example: AP
 * definitions:
 *      Aerolinea:
 *          type: object
 *          properties:
 *              codigo_iata:
 *                  type: string
 *                  example: AP
 *              nombre:
 *                  type: string
 *                  example: Aerolínea de prueba
 *
 */

/**
 * @openapi
 * /api/aerolineas:
 *   get:
 *     tags:
 *       - Aerolineas
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
 *                     $ref: '#/definitions/Aerolinea'
 */
router.get("/", async (req, res) => {
  try {
    const aerolineas = await prisma.aerolineas.findMany();
    res.json(aerolineas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las aerolíneas" });
  }
});

/**
 * @openapi
 * /api/aerolineas:
 *   post:
 *     tags:
 *       - Aerolineas
 *     requestBody:
 *          description: Datos de la aerolínea
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AerolineaInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Aerolinea'
 */
router.post("/", async (req, res) => {
  try {
    const nuevaAerolinea = await prisma.aerolineas.create({
      data: req.body,
    });
    res.json(nuevaAerolinea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la aerolínea" });
  }
});

/**
 * @openapi
 * /api/aerolineas/{codigo_iata}:
 *  get:
 *    tags:
 *      - Aerolineas
 *    description: Obtiene una aerolínea por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA de la aerolínea
 *        required: true
 *        schema:
 *          type: string
 *          example: AP
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aerolinea'
 */
router.get("/:codigo_iata", async (req, res) => {
  try {
    const aerolinea = await prisma.aerolineas.findUnique({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
    });
    res.json(aerolinea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la aerolínea" });
  }
});

/**
 * @openapi
 * /api/aerolineas/{codigo_iata}:
 *  put:
 *    tags:
 *      - Aerolineas
 *    description: Actualiza una aerolínea por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA de la aerolínea
 *        required: true
 *        schema:
 *          type: string
 *          example: AP
 *    requestBody:
 *      description: Datos de la aerolínea
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AerolineaInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aerolinea'
 */
router.put("/:codigo_iata", async (req, res) => {
  try {
    const aerolinea = await prisma.aerolineas.update({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
      data: req.body,
    });
    res.json(aerolinea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la aerolínea" });
  }
});

/**
 * @openapi
 * /api/aerolineas/{codigo_iata}:
 *  delete:
 *    tags:
 *      - Aerolineas
 *    description: Elimina una aerolínea por su código IATA
 *    parameters:
 *      - name: codigo_iata
 *        in: path
 *        description: Código IATA de la aerolínea
 *        required: true
 *        schema:
 *          type: string
 *          example: AP
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Aerolinea'
 */
router.delete("/:codigo_iata", async (req, res) => {
  try {
    const aerolinea = await prisma.aerolineas.delete({
      where: {
        codigo_iata: req.params.codigo_iata,
      },
    });
    res.json(aerolinea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la aerolínea" });
  }
});

export default router;
