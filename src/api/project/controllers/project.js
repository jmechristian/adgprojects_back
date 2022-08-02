"use strict";

/**
 *  project controller
 */

// const collectionType = "project";

// const schema = require(`../content-types/${collectionType}/schema.json`);
// const createPopulatedController = require("../../../helpers/populate");

// module.exports = createPopulatedController(
//   `api::${collectionType}.${collectionType}`,
//   schema
// );

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::project.project");

"use strict";

/**
 *  page controller
 *
 *  info: https://forum.strapi.io/t/strapi-v4-populate-media-and-dynamiczones-from-components/12670/26
 */

const { createCoreController } = require("@strapi/strapi").factories;

// declare the uid for the controller
const uid = "api::project.project";

// see @urbandale's post for context: https://forum.strapi.io/t/strapi-v4-populate-media-and-dynamiczones-from-components/12670/26
const components = {
  hero: true,
  department: true,
  subcategory: true,
  building_type: true,
  project_types: { populate: { type: true } },
  above_quote: {
    populate: {
      full_width: true,
      vertical_left: true,
      horizontal_right: true,
      horizontal_left: true,
      vertical_right: true,
    },
  },
  below_text_content: {
    populate: {
      full_width: true,
      vertical_left: true,
      horizontal_right: true,
      horizontal_left: true,
      vertical_right: true,
    },
  },
  gallery: true,
};

module.exports = createCoreController(uid, () => {
  return {
    async find(ctx) {
      // overwrite default populate=* functionality
      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findMany(uid, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }
      // maintain default functionality for all other request
      return super.find(ctx);
    },
    async findOne(ctx) {
      const { id } = ctx.request.params;

      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findOne(uid, id, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }

      return super.findOne(ctx);
    },
  };
});
