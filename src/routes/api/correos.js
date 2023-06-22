import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   CorreoInput:
 *      type: object
 *      properties:
 *          pasaporte_pasajero:
 *              type: string
 *              example: ABC123
 *          correo:
 *              type: string
 *              example: example@example.com
 * definitions:
 *      Correo:
 *          type: object
 *          properties:
 *              id_correo:
 *                  type: integer
 *                  example: 1
 *              pasaporte_pasajero:
 *                  type: string
 *                  example: ABC123
 *              correo:
 *                  type: string
 *                  example: example@example.com
 *
 */

/**
 * @openapi
 * /api/correos:
 *   get:
 *     tags:
 *       - Correos
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
 *                     $ref: '#/definitions/Correo'
 */
router.get("/", async (req, res) => {
  try {
    const correos = await prisma.correos.findMany();
    res.json(correos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los correos" });
  }
});

/**
 * @openapi
 * /api/correos:
 *   post:
 *     tags:
 *       - Correos
 *     requestBody:
 *          description: Datos del correo
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CorreoInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Correo'
 */
router.post("/", async (req, res) => {
  try {
    const nuevoCorreo = await prisma.correos.create({
      data: req.body,
    });
    res.json(nuevoCorreo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el correo" });
  }
});

/**
 * @openapi
 * /api/correos/{id}:
 *  get:
 *    tags:
 *      - Correos
 *    description: Obtiene un correo por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del correo
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
 *              $ref: '#/definitions/Correo'
 */
router.get("/:id", async (req, res) => {
  try {
    const correo = await prisma.correos.findUnique({
      where: {
        id_correo: parseInt(req.params.id),
      },
    });
    res.json(correo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el correo" });
  }
});

/**
 * @openapi
 * /api/correos/{id}:
 *  put:
 *    tags:
 *      - Correos
 *    description: Actualiza un correo por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del correo
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      description: Datos del correo
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CorreoInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Correo'
 */
router.put("/:id", async (req, res) => {
  try {
    const correo = await prisma.correos.update({
      where: {
        id_correo: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(correo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el correo" });
  }
});

/**
 * @openapi
 * /api/correos/{id}:
 *  delete:
 *    tags:
 *      - Correos
 *    description: Elimina un correo por su ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del correo
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
 *              $ref: '#/definitions/Correo'
 */
router.delete("/:id", async (req, res) => {
  try {
    const correo = await prisma.correos.delete({
      where: {
        id_correo: parseInt(req.params.id),
      },
    });
    res.json(correo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el correo" });
  }
});

export default router;
