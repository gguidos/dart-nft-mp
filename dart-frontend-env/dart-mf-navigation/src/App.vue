<template>
    <Nav />
</template>


<script>
import Nav from './components/Main-navigation'


export default {
  name: "Main-nav",
  data: () => ({
    subscription: ''
  }),
  components: {
    Nav
  }
}
</script>
