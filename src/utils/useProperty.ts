let el = getComputedStyle(document.body);
const root = document.body.style;

function getPropertyValue(Property: string) {
  return el.getPropertyValue(Property);
}

function setProperty(property: string, value: string) {
  root.setProperty(property, value);
}

function removeProperty(property: string) {
  root.removeProperty(property);
}
export default {
  getPropertyValue,
  setProperty,
  removeProperty,
};
