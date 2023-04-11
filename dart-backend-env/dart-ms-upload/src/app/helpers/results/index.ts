export function buildResults({ params, payload, action, data }) {
  return {
    error: 0,
    action,
    ip: params.user.ip,
    params: payload,
    username: params.user.username,
    message: {
      data
    }
  };
}