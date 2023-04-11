import { businessRules } from './business-rules';
import makeConsumer from './make-consumer';

const rules = ({ useCase }) => businessRules({ useCase });
const consumers = ({ options }) => makeConsumer()({ options });

export { rules, consumers }