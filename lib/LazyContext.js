const EntityReferenceType = 'EntityReference:http://schemas.microsoft.com/xrm/2011/Contracts';
const OptionSetValueType = 'OptionSetValue:http://schemas.microsoft.com/xrm/2011/Contracts';

function getType(target) {
  return Object.prototype.toString.call(target);
}

function isObject(target) {
  return getType(target) === '[object Object]';
}

function isString(target) {
  return getType(target) === '[object String]';
}

function isDate(target) {
  return isString(target) && target.startsWith('/Date(') && target.endsWith(')/');
}

function isEntityReference(target) {
  return isObject(target) && target.__type === EntityReferenceType; // eslint-disable-line no-underscore-dangle
}

function isOptionSetValue(target) {
  return isObject(target) && target.__type === OptionSetValueType; // eslint-disable-line no-underscore-dangle
}

function translate(key, value) {
  if (isEntityReference(value)) {
    return { [`_${key}_value`]: value.Id };
  }
  if (isOptionSetValue(value)) {
    return { [key]: value.Value };
  }
  if (isDate(value)) {
    const timestamp = Number.parseInt(value.slice(6, -2), 10);
    return { [key]: (new Date(timestamp)).toISOString() };
  }
  return { [key]: value };
}

function assemble(attributes) {
  return attributes.reduce((acc, { key, value }) =>
    ({ ...acc, ...translate(key, value) }), {});
}

function findTarget(payload) {
  if (!payload || !isString(payload)) { return null; }
  const parsed = JSON.parse(payload);
  if (!parsed || !parsed.InputParameters) { return null; }
  return parsed.InputParameters.find(({ key }) => key === 'Target');
}

class LazyContext {
  constructor(payload) {
    this.target = findTarget(payload);
  }

  get entity() {
    if (!this.target) { return null; }
    return assemble(this.target.value.Attributes || []);
  }

  get id() {
    if (!this.target) { return null; }
    return this.target.value.Id;
  }
}

module.exports = LazyContext;
