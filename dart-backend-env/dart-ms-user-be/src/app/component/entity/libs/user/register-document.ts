export default function buildMakeDocument({ md5, sanitize }) {
	return Object.freeze({ makeDocument });

	function makeDocument({ info }) {
		let {
			email,
			name,
			password,
			username,
			source
		} = info;

		let hash;

		return Object.freeze({
			getName: () => sanitize(name),
      getEmail: () => email,
      getUsername: () => sanitize(username),
			getPassword: () => makeHash(password),
      getSource: () => source,
      getEmailHash: () => makeHash(email),
      getUsernameHash: () => makeHash(username),
			getLongHash: () => hash || (hash = makeHash(sanitize(username) + email)),
		});
	}

	function makeHash(data) {
		return md5(data);
	}
}

