import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     AvionInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Avión de prueba
 *         asientos_economica:
 *           type: integer
 *           example: 200
 *         asientos_negocios:
 *           type: integer
 *           example: 50
 *     Avion:
 *       type: object
 *       properties:
 *         id_avion:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Avión de prueba
 *         asientos_economica:
 *           type: integer
 *           example: 200
 *         asientos_negocios:
 *           type: integer
 *           example: 50
 */

/**
 * @openapi
 * /api/aviones:
 *   get:
 *     tags:
 *       - Aviones
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
 *                     $ref: '#/components/schemas/Avion'
 */
router.get("/", async (req, res) => {
  try {
    const aviones = await prisma.aviones.findMany();
    res.json(aviones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los aviones" });
  }
});

/**
 * @openapi
 * /api/aviones:
 *   post:
 *     tags:
 *       - Aviones
 *     requestBody:
 *       description: Datos del avión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvionInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avion'
 */
router.post("/", async (req, res) => {
  try {
    const nuevoAvion = await prisma.aviones.create({
      data: req.body,
    });
    res.json(nuevoAvion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el avión" });
  }
});

/**
 * @openapi
 * /api/aviones/{id_avion}:
 *   get:
 *     tags:
 *       - Aviones
 *     description: Obtiene un avión por su ID
 *     parameters:
 *       - name: id_avion
 *         in: path
 *         description: ID del avión
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avion'
 */
router.get("/:id_avion", async (req, res) => {
  try {
    const avion = await prisma.aviones.findUnique({
      where: {
        id_avion: parseInt(req.params.id_avion),
      },
    });
    res.json(avion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el avión" });
  }
});

/**
 * @openapi
 * /api/aviones/{id_avion}:
 *   put:
 *     tags:
 *       - Aviones
 *     description: Actualiza un avión por su ID
 *     parameters:
 *       - name: id_avion
 *         in: path
 *         description: ID del avión
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos del avión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvionInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avion'
 */
router.put("/:id_avion", async (req, res) => {
  try {
    const avion = await prisma.aviones.update({
      where: {
        id_avion: parseInt(req.params.id_avion),
      },
      data: req.body,
    });
    res.json(avion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el avión" });
  }
});

/**
 * @openapi
 * /api/aviones/{id_avion}:
 *   delete:
 *     tags:
 *       - Aviones
 *     description: Elimina un avión por su ID
 *     parameters:
 *       - name: id_avion
 *         in: path
 *         description: ID del avión
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avion'
 */
router.delete("/:id_avion", async (req, res) => {
  try {
    const avion = await prisma.aviones.delete({
      where: {
        id_avion: parseInt(req.params.id_avion),
      },
    });
    res.json(avion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el avión" });
  }
});

export default router;
