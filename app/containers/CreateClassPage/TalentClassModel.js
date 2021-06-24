import { defaultClassAttributes } from './defaultClassModel';

class Model {
  constructor(defaultAttributes, attributes) {
    this.defaultAttributes = defaultAttributes;
    this.attributes = {
      ...defaultAttributes,
      ...attributes,
    };
  }

  getDefault = name => this.attributes[name];

  update = attributes => {
    this.attributes = {
      ...this.attributes,
      ...attributes,
    };
  };
}

export default class TalentClassModel extends Model {
  constructor(attributes) {
    super(defaultClassAttributes, attributes);
    this.fixExtraDefaultValues();
  }

  fixExtraDefaultValues = () => {
    this.attributes.title = 'Title fixed after initialize';
  };
}
