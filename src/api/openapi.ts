// import { Type } from '@sinclair/typebox';
// import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

// const LookupSchema = Type.Object(
//   {
//     id: Type.Number({ title: 'Identifier of the lookup' }),
//     name: Type.String({ title: 'Name of the lookup' }),
//   },
//   {
//     examples: {
//       id: 1,
//       name: 'Toyota',
//     },
//   }
// );

// const components: OpenAPIV3.ComponentsObject = {
//   schemas: {
//     LookupModel: LookupSchema,
//   },
// };

// const createSchemasRef = (
//   schema: keyof (typeof components)['schemas']
// ): OpenAPIV3.ReferenceObject => {
//   return {
//     $ref: `#/components/schemas/${schema}`,
//   };
// };

// export const document: OpenAPIV3.DocumentV3_1 = {
//   openapi: '3.1.0',
//   info: {
//     title: 'vPIC API',
//     version: '1.0.0',
//     summary: 'API for NHTSA vPIC database',
//   },
//   paths: {
//     '/makes': {
//       get: {
//         summary: 'Get home',
//         parameters: [
//           {
//             name: 'contains',
//             in: 'query',
//             schema: {
//               type: 'string',
//               title: 'Name of the make contains',
//             },
//           },
//         ],
//         responses: {
//           '200': {
//             description: 'Successful response',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'array',
//                   items: createSchemasRef('LookupModel'),
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   components,
//   webhooks: {},
// };
