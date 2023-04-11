export default function makeValidation({ Validator }) {
	return Object.freeze({
		validate,
	});
	function validate({ params, rules }) {
		let paramNames = Object.keys(params).map((param) => param);
		paramNames = paramNames.filter((param) => param !== 'user');
		let ruleNames = Object.keys(rules).map((rule) => rule);
		let trashParams = paramNames.filter(
			(param) => ruleNames.indexOf(param) === -1
		);
		let tpErrors = {};
		if (trashParams.length > 0) {
			tpErrors = { params: ['Trash parameters in the request'] };
		}
		let validation = new Validator(params, rules);

		if (validation.passes() || Object.keys(trashParams).length < 0) {
			return {};
		} else {
			let errors = validation.errors.all();
			errors = { ...errors, ...tpErrors };
			return { ...validation.errors.all(), ...tpErrors };
		}
	}
}
