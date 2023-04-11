export default  {
  type: "route",
  path: "/settings/profile",
  routes: [
  {
    type: "application",
    name: "@app/settings"
  }],
  exact: true,
  default: false
}