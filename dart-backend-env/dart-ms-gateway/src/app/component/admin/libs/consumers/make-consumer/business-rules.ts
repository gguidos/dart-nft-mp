const rules = require('./admin.rules');

const businessRules = ({ useCase }) => rules[useCase]

export { businessRules }
