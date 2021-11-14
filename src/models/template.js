const { Int32 } = require("bson");
const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  data: {
    type: Object,
    properties: {
      name: {
        type: String
      },
      checklist: {
        type: Object,
        properties: {
          description: {
            type: String
          },
          due_interval: {
            type: Int32
          },
          due_unit: {
            type: String,
          }
        }
      },
      items: {
        type: Array,
        items: {
          type: Object,
          properties: {
            description: {
              type: String
            },
            urgency: {
              type: Int32
            },
            due_interval: {
              type: Int32
            },
            due_unit: {
              type: String,
            }
          }
        }
      }
    }
  }
});

module.exports = mongoose.model('Template', templateSchema);