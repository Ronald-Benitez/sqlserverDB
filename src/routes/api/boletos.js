import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     BoletoInput:
 *       type: object
 *       properties:
 *         pasaporte_pasajero:
 *           type: string
 *           example: ABC123
 *         n_vuelo:
 *           type: string
 *           example: FL-1
 *         fecha_compra:
 *           type: string
 *           format: date
 *           example: 2023-06-20
 *         clase:
 *           type: string
 *           example: Económica
 *         precio:
 *           type: number
 *           example: 100.5
 *     Boleto:
 *       type: object
 *       properties:
 *         id_boleto:
 *           type: integer
 *           example: 1
 *         pasaporte_pasajero:
 *           type: string
 *           example: ABC123
 *         n_vuelo:
 *           type: string
 *           example: VN123
 *         fecha_compra:
 *           type: string
 *           format: date
 *           example: 2023-06-20
 *         clase:
 *           type: string
 *           example: Económica
 *         precio:
 *           type: number
 *           example: 100.5
 *         n_boleto:
 *           type: string
 *           example: E1
 */

/**
 * @openapi
 * /api/boletos:
 *   get:
 *     tags:
 *       - Boletos
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
 *                     $ref: '#/components/schemas/Boleto'
 */
router.get("/", async (req, res) => {
  try {
    const boletos = await prisma.boleto.findMany();
    res.json(boletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los boletos" });
  }
});

/**
 * @openapi
 * /api/boletos:
 *   post:
 *     tags:
 *       - Boletos
 *     requestBody:
 *       description: Datos del boleto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoletoInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boleto'
 */
router.post("/", async (req, res) => {
  try {
    req.body.fecha_compra = new Date(req.body.fecha_compra);
    req.body.n_boleto = "U1";

    const nuevoBoleto = await prisma.boleto.create({
      data: req.body,
    });
    res.json(nuevoBoleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el boleto" });
  }
});

/**
 * @openapi
 * /api/boletos/{id_boleto}:
 *   get:
 *     tags:
 *       - Boletos
 *     description: Obtiene un boleto por su ID
 *     parameters:
 *       - name: id_boleto
 *         in: path
 *         description: ID del boleto
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
 *               $ref: '#/components/schemas/Boleto'
 */
router.get("/:id_boleto", async (req, res) => {
  try {
    const boleto = await prisma.boleto.findUnique({
      where: {
        id_boleto: parseInt(req.params.id_boleto),
      },
    });
    res.json(boleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el boleto" });
  }
});

/**
 * @openapi
 * /api/boletos/n_vuelo/{n_vuelo}:
 *   get:
 *     tags:
 *       - Boletos
 *     description: Obtiene un boleto por su número de vuelo
 *     parameters:
 *       - name: n_vuelo
 *         in: path
 *         description: Número de vuelo del boleto
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
 *               $ref: '#/components/schemas/Boleto'
 */
router.get("/n_vuelo/:n_vuelo", async (req, res) => {
  try {
    const boleto = await prisma.boleto.findMany({
      where: {
        n_vuelo: req.params.n_vuelo,
      },
    });
    res.json(boleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el boleto" });
  }
});

/**
 * @openapi
 * /api/boletos/{id_boleto}:
 *   put:
 *     tags:
 *       - Boletos
 *     description: Actualiza un boleto por su ID
 *     parameters:
 *       - name: id_boleto
 *         in: path
 *         description: ID del boleto
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos del boleto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoletoInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boleto'
 */
router.put("/:id_boleto", async (req, res) => {
  try {
    req.body.fecha_compra = new Date(req.body.fecha_compra);
    const boleto = await prisma.boleto.update({
      where: {
        id_boleto: parseInt(req.params.id_boleto),
      },
      data: req.body,
    });
    res.json(boleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el boleto" });
  }
});

/**
 * @openapi
 * /api/boletos/{id_boleto}:
 *   delete:
 *     tags:
 *       - Boletos
 *     description: Elimina un boleto por su ID
 *     parameters:
 *       - name: id_boleto
 *         in: path
 *         description: ID del boleto
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
 *               $ref: '#/components/schemas/Boleto'
 */
router.delete("/:id_boleto", async (req, res) => {
  try {
    const boleto = await prisma.boleto.delete({
      where: {
        id_boleto: parseInt(req.params.id_boleto),
      },
    });
    res.json(boleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el boleto" });
  }
});

export default router;
