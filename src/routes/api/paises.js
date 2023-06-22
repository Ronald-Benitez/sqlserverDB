import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *   PaisInput:
 *      type: object
 *      properties:
 *          codigo_iso:
 *              type: string
 *              example: US
 *          nombre:
 *              type: string
 *              example: United States
 * definitions:
 *      Pais:
 *          type: object
 *          properties:
 *              codigo_iso:
 *                  type: string
 *                  example: US
 *              nombre:
 *                  type: string
 *                  example: United States
 *
 */

/**
 * @openapi
 * /api/paises:
 *   get:
 *     tags:
 *       - Paises
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
 *                     $ref: '#/definitions/Pais'
 */
router.get("/", async (req, res) => {
  try {
    const paises = await prisma.paises.findMany();
    res.json(paises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los paises" });
  }
});

/**
 * @openapi
 * /api/paises:
 *   post:
 *     tags:
 *       - Paises
 *     requestBody:
 *          description: Datos del pais
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/PaisInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Pais'
 */
router.post("/", async (req, res) => {
  try {
    const pais = await prisma.paises.create({
      data: req.body,
    });
    res.json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el pais" });
  }
});

/**
 * @openapi
 * /api/paises/{codigo_iso}:
 *  get:
 *    tags:
 *      - Paises
 *    description: Obtiene un pais por su código ISO
 *    parameters:
 *      - name: codigo_iso
 *        in: path
 *        description: Código ISO del pais
 *        required: true
 *        schema:
 *          type: string
 *          example: US
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pais'
 */
router.get("/:codigo_iso", async (req, res) => {
  try {
    const pais = await prisma.paises.findUnique({
      where: {
        codigo_iso: req.params.codigo_iso,
      },
    });
    res.json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el pais" });
  }
});

/**
 * @openapi
 * /api/paises/{codigo_iso}:
 *  put:
 *    tags:
 *      - Paises
 *    description: Actualiza un pais por su código ISO
 *    parameters:
 *      - name: codigo_iso
 *        in: path
 *        description: Código ISO del pais
 *        required: true
 *        schema:
 *          type: string
 *          example: US
 *    requestBody:
 *      description: Datos del pais
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PaisInput'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pais'
 */
router.put("/:codigo_iso", async (req, res) => {
  try {
    const pais = await prisma.paises.update({
      where: {
        codigo_iso: req.params.codigo_iso,
      },
      data: req.body,
    });
    res.json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el pais" });
  }
});

/**
 * @openapi
 * /api/paises/{codigo_iso}:
 *  delete:
 *    tags:
 *      - Paises
 *    description: Elimina un pais por su código ISO
 *    parameters:
 *      - name: codigo_iso
 *        in: path
 *        description: Código ISO del pais
 *        required: true
 *        schema:
 *          type: string
 *          example: US
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Pais'
 */
router.delete("/:codigo_iso", async (req, res) => {
  try {
    const pais = await prisma.paises.delete({
      where: {
        codigo_iso: req.params.codigo_iso,
      },
    });
    res.json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el pais" });
  }
});

export default router;
