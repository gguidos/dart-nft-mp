export default function makeConsumer() {
  return ({ options }) => {
    const {
      hostname,
      ip,
      apiKey,
      hostnameHash,
      createdBy,
      modifiedBy = createdBy,
      createdByHost,
      modifiedByHost = createdByHost,
      createdOn = Date.now(),
      modifiedOn = createdOn
    } = options;

    return Object.freeze({
      hostname: () => hostname,
      ip: () => ip,
      apiKey: () => apiKey,
      hostnameHash: () => hostnameHash,
      createdBy: () => createdBy,
      modifiedBy: () => modifiedBy,
      createdOn: () => createdOn,
      modifiedOn: () => modifiedOn,
      createdByHost: () => createdByHost,
      modifiedByHost: () => modifiedByHost
    })
  };
}