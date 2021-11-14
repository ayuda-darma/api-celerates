const express = require("express");
const templateSchema = require("../models/template");

const router = express.Router();

// create template
/**
 * @swagger
 * components:
 *   schemas:
 *     TemplatePayload:
 *        type: object
 *        properties:
 *           data:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                checklist:
 *                   type: object
 *                   required:
 *                      - description
 *                   properties:
 *                      description:
 *                        type: string 
 *                      due_interval:
 *                        type: integer
 *                      due_unit:
 *                        type: string
 *                        enum: [minute, hour, day, week, month]
 *                items:
 *                   type: array   
 *                   items:
 *                      type: object 
 *                      required:
 *                        - description
 *                      properties:
 *                        description:
 *                          type: string 
 *                        urgency:
 *                          type: integer
 *                        due_interval:
 *                          type: integer
 *                        due_unit:
 *                          type: string
 *                          enum: [minute, hour, day, week, month]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TemplateAttribute:
 *        type: object
 *        properties:
 *           data:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                checklist:
 *                   type: object
 *                   required:
 *                      - description
 *                   properties:
 *                      description:
 *                        type: string 
 *                      due_interval:
 *                        type: integer
 *                      due_unit:
 *                        type: string
 *                        enum: [minute, hour, day, week, month]
 *                items:
 *                   type: array   
 *                   items:
 *                      type: object 
 *                      required:
 *                        - description
 *                      properties:
 *                        description:
 *                          type: string 
 *                        urgency:
 *                          type: integer
 *                        due_interval:
 *                          type: integer
 *                        due_unit:
 *                          type: string
 *                          enum: [minute, hour, day, week, month]
 */

/**
 * @swagger
 * /templates:
 *    post:
 *      summary: Create checklist template
 *      tags: [Template]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                $ref: '#/components/schemas/TemplatePayload'
 *      responses:
 *        201:
 *          description: The checklist template successfully created
 *          content:
 *             application/json:
 *                schema:
 *                $ref: '#/components/schemas/TemplatePayload'
 */
router.post("/templates", (req, res) => {
  const template = templateSchema(req.body);
  template
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all templates
/**
 * @swagger
 * /templates:
 *   get:
 *     summary: List all checklists templates
 *     tags: [Template]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         required: true
 *         description: filter data
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: page_offset
 *         schema:
 *           type: string
 *         required: true
 *         description: limit returned resource
 *       - in: query
 *         name: page_limit
 *         schema:
 *           type: string
 *         required: true
 *         description: limit returned resource
 *     responses:
 *       200:
 *         description: The list all checklists template
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TemplatePayload'
 */
router.get("/templates", (req, res) => {
  templateSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a template
/**
 * @swagger
 * /templates/{templateId}:
 *   get:
 *     summary: Get checklist template by given templateId
 *     tags: [Template]
 *     parameters:
 *       - in: path
 *         name: templateID
 *         schema:
 *           type: string
 *         required: true
 *         description: checklist template ID
 *     responses:
 *       200:
 *         description: The checklist template by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemplatePayload'
 *       404:
 *         description: The book was not found
 */
router.get("/templates/:templateId", (req, res) => {
  const { templateId } = req.params;
  templateSchema
    .findById(templateId)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a template
/**
 * @swagger
 * /templates/{templateId}:
 *   delete:
 *     summary: Remove the checklist template by templateId
 *     tags: [Template]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The templateId
 * 
 *     responses:
 *       204:
 *         description: The book was deleted
 */
router.delete("/templates/:templateId", (req, res) => {
  const { templateId } = req.params;
  templateSchema
    .remove({ _id: templateId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a template
/**
 *@swagger
 * /templates/{templateId}:
 *  put:
 *    summary: Edit Checklist Template by given templateId
 *    tags: [Template]
 *    parameters:
 *      - in: path
 *        name: templateID
 *        schema:
 *          type: string
 *        required: true
 *        description: checklist template ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TemplatePayload'
 *    responses:
 *      200:
 *        description: The checklist template was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TemplatePayload'
 */
router.put("/templates/:templateId", (req, res) => {
  const { templateId } = req.params;
  const { name, age, email } = req.body;
  templateSchema
    .updateOne({ _id: templateId }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;