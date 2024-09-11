import {
  type EnumListProps,
  type BaseSchemaDefinition,
  type ValidationBuilder,
  type StringRule,
} from 'sanity';

declare module 'sanity' {
  interface SymbolOptions extends EnumListProps<string> {}

  interface SymbolDefinition extends BaseSchemaDefinition {
    type: 'symbol';
    options: SymbolOptions;
    validation?: ValidationBuilder<StringRule, string>;
  }

  export interface IntrinsicDefinitions {
    symbol: SymbolDefinition;
  }
}
