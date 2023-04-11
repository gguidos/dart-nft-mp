export default function makeMainNav({ loader }) {
  return Object.freeze({ mainNav })
  function mainNav() {
    return [
        {
          type: "application",
          name: "@app/navigation",
          props: {
            user: { fname: "Jane" }
          }
        },
    ]
  }
}