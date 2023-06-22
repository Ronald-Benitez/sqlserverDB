import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   PasajeroInput:
 *      type: object
 *      properties:
 *          n_pasaporte:
 *              type: string
 *              example: ABC123
 *          nombres:
 *              type: string
 *              example: John
 *          apellidos:
 *              type: string
 *              example: Doe
 *          fecha_nacimiento:
 *              type: string
 *              format: date-time
 *              example: "1990-01-01T00:00:00Z"
 *          genero:
 *              type: string
 *              example: Masculino
 *          pais:
 *              type: string
 *              example: US
 * definitions:
 *      Pasajero:
 *          type: object
 *          properties:
 *              n_pasaporte:
 *                  type: string
 *                  example: ABC123
 *              nombres:
 *                  type: string
 *                  example: John
 *              apellidos:
 *                  type: string
 *                  example: Doe
 *              fecha_nacimiento:
 *                  type: string
 *                  format: date-time
 *                  example: "1990-01-01T00:00:00Z"
 *              genero:
 *                  type: string
 *                  example: Masculino
 *              pais:
 *                  type: string
 *                  example: US
 *
 */

/**
 * @openapi
 * /api/pasajeros:
 *   get:
 *     tags:
 *       - Pasajeros
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
 *                     $ref: '#/definitions/Pasajero'
 */
router.get("/", async (req, res) => {
  try {
    const pasajeros = await prisma.pasajeros.findMany();
    res.json(pasajeros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los pasajeros" });
  }
});

/**
 * @openapi
 * /api/pasajeros:
 *   post:
 *     tags:
 *       - Pasajeros
 *     requestBody:
 *          description: Datos del pasajero
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/PasajeroInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Pasajero'
 */
router.post("/", async (req, res) => {
  try {
    const pasajero = await prisma.pasajeros.create({
      data: req.body,
    });
    res.json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el pasajero" });
  }
});

/**
 * @openapi
 * /api/pasajeros/{n_pasaporte}:
 *  get:
 *    tags:
 *      - Pasajeros
 *    description: Obtiene un pasajero por su número de pasaporte
 *    parameters:
 *      - name: n_pasaporte
 *        in: path
 *        description: Número de pasaporte del pasajero
 *        required: true
 *        schema:
 *          type: string
 *          example: ABC123
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pasajero'
 */
router.get("/:n_pasaporte", async (req, res) => {
  try {
    const pasajero = await prisma.pasajeros.findUnique({
      where: {
        n_pasaporte: req.params.n_pasaporte,
      },
    });
    res.json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el pasajero" });
  }
});

/**
 * @openapi
 * /api/pasajeros/{n_pasaporte}:
 *  put:
 *    tags:
 *      - Pasajeros
 *    description: Actualiza un pasajero por su número de pasaporte
 *    parameters:
 *      - name: n_pasaporte
 *        in: path
 *        description: Número de pasaporte del pasajero
 *        required: true
 *        schema:
 *          type: string
 *          example: ABC123
 *    requestBody:
 *      description: Datos del pasajero
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PasajeroInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pasajero'
 */
router.put("/:n_pasaporte", async (req, res) => {
  try {
    const pasajero = await prisma.pasajeros.update({
      where: {
        n_pasaporte: req.params.n_pasaporte,
      },
      data: req.body,
    });
    res.json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el pasajero" });
  }
});

/**
 * @openapi
 * /api/pasajeros/{n_pasaporte}:
 *  delete:
 *    tags:
 *      - Pasajeros
 *    description: Elimina un pasajero por su número de pasaporte
 *    parameters:
 *      - name: n_pasaporte
 *        in: path
 *        description: Número de pasaporte del pasajero
 *        required: true
 *        schema:
 *          type: string
 *          example: ABC123
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pasajero'
 */
router.delete("/:n_pasaporte", async (req, res) => {
  try {
    const pasajero = await prisma.pasajeros.delete({
      where: {
        n_pasaporte: req.params.n_pasaporte,
      },
    });
    res.json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el pasajero" });
  }
});

export default router;
