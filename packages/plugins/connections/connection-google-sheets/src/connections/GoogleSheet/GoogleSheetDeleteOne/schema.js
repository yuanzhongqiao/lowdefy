export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - GoogleSheetDeleteOne',
  type: 'object',
  required: ['filter'],
  properties: {
    filter: {
      type: 'object',
      description:
        'A MongoDB query expression to filter the data. The first row matched by the filter will be deleted.',
      errorMessage: {
        type: 'GoogleSheetDeleteOne request property "filter" should be an object.',
      },
    },
    options: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'The maximum number of rows to fetch.',
          errorMessage: {
            type: 'GoogleSheetDeleteOne request property "options.limit" should be a number.',
          },
        },
        skip: {
          type: 'number',
          description: 'The number of rows to skip from the top of the sheet.',
          errorMessage: {
            type: 'GoogleSheetDeleteOne request property "options.skip" should be a number.',
          },
        },
      },
    },
  },
  errorMessage: {
    type: 'GoogleSheetDeleteOne request properties should be an object.',
    required: {
      filter: 'GoogleSheetDeleteOne request should have required property "filter".',
    },
  },
};
