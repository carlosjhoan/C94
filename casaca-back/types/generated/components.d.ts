import type { Schema, Struct } from '@strapi/strapi';

export interface SizesSizeOption extends Struct.ComponentSchema {
  collectionName: 'components_sizes_size_options';
  info: {
    displayName: 'Size Option';
  };
  attributes: {
    in_stock: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    size: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sizes.size-option': SizesSizeOption;
    }
  }
}
