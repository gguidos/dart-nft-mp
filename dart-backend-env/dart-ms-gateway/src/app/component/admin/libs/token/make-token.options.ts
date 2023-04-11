export default function makeTokenOptions({ md5 }) {
  return Object.freeze({ tokenOptions });
  function tokenOptions({ options }) {
    let {
      ip,
      hostname,
      created = Date.now()
    } = options;

    ip = validate(ip)

    if (!ip) throw new Error('Invalid IP address')

    return Object.freeze({
      ip: () => ip,
      hostname: () => hostname,
      hostnameHash: () => makeHash(hostname),
      created: () => created
    })
  }

  function makeHash(data) {
		return md5(data);
  }
  
  function validate(ip) {
    if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))
      return ip
    return undefined;
  }
}