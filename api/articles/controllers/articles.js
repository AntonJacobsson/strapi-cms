const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.articles.search(ctx.query);
        } else {
          entities = await strapi.services.articles.find(ctx.query);
        }
        var result = entities.map(entity => sanitizeEntity(entity, { model: strapi.models.articles }));
        result.forEach(element => {
            element.comments = []
        });
        return result;
    },
    async findOne(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.articles.findOne({ id });
        var result = sanitizeEntity(entity, { model: strapi.models.articles });
        result.comments = result.comments.filter(x => x.isPublished === true);
        return result;
      }
}
