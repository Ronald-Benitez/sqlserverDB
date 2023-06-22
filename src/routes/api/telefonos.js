import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   TelefonoInput:
 *      type: object
 *      properties:
 *          pasaporte_pasajero:
 *              type: string
 *              example: ABC123
 *          telefono:
 *              type: string
 *              example: 123456789
 * definitions:
 *      Telefono:
 *          type: object
 *          properties:
 *              id_telefono:
 *                  type: integer
 *                  example: 1
 *              pasaporte_pasajero:
 *                  type: string
 *                  example: ABC123
 *              telefono:
 *                  type: string
 *                  example: 123456789
 *
 */

/**
 * @openapi
 * /api/telefonos:
 *   get:
 *     tags:
 *       - Telefonos
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
 *                     $ref: '#/definitions/Telefono'
 */
router.get("/", async (req, res) => {
  try {
    const telefonos = await prisma.telefonos.findMany();
    res.json(telefonos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los telefonos" });
  }
});

/**
 * @openapi
 * /api/telefonos:
 *   post:
 *     tags:
 *       - Telefonos
 *     requestBody:
 *          description: Datos del telefono
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/TelefonoInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Telefono'
 */
router.post("/", async (req, res) => {
  try {
    const nuevoTelefono = await prisma.telefonos.create({
      data: req.body,
    });
    res.json(nuevoTelefono);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el telefono" });
  }
});

/**
 * @openapi
 * /api/telefonos/{id}:
 *  get:
 *    tags:
 *      - Telefonos
 *    description: Obtiene un telefono por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del telefono
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
 *              $ref: '#/definitions/Telefono'
 */
router.get("/:id", async (req, res) => {
  try {
    const telefono = await prisma.telefonos.findUnique({
      where: {
        id_telefono: parseInt(req.params.id),
      },
    });
    res.json(telefono);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el telefono" });
  }
});

/**
 * @openapi
 * /api/telefonos/{id}:
 *  put:
 *    tags:
 *      - Telefonos
 *    description: Actualiza un telefono por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del telefono
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      description: Datos del telefono
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TelefonoInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Telefono'
 */
router.put("/:id", async (req, res) => {
  try {
    const telefono = await prisma.telefonos.update({
      where: {
        id_telefono: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(telefono);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el telefono" });
  }
});

/**
 * @openapi
 * /api/telefonos/{id}:
 *  delete:
 *    tags:
 *      - Telefonos
 *    description: Elimina un telefono por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del telefono
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
 *              $ref: '#/definitions/Telefono'
 */
router.delete("/:id", async (req, res) => {
  try {
    const telefono = await prisma.telefonos.delete({
      where: {
        id_telefono: parseInt(req.params.id),
      },
    });
    res.json(telefono);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el telefono" });
  }
});

export default router;
