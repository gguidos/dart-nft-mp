export default function buildMakeSource({ isValidIp }) {
	return function makeSource({ ip, browser }) {
		let errors = [];

		if (!ip) {
			errors.push('Dish source must contain an IP address.');
		} else if (!isValidIp(ip)) {
			errors.push('Dish source must contain a valid IP address.');
		}

		if (errors.length > 0) {
			return { ip: errors };
		}

		return Object.freeze({
			getIp: () => ip,
			getBrowser: () => browser,
		});
	};
}
