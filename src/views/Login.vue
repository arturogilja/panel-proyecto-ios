<template>
  <div class="container">
    <div class="login">
      <div class="title bold">
        Waiter
      </div>
      <div class="subtitle normal">
        Iniciar Sesión
      </div>
      <form @submit.prevent="send" class="form">
        <div class="group">
          <div class="label semi">
            Nombre de usuario
          </div>
          <div class="input">
            <input class="field normal" type="text" v-model="identifier" />
          </div>
        </div>
        <div class="group">
          <div class="label semi">
            Contraseña
          </div>
          <div class="input">
            <input class="field normal" type="password" v-model="password" />
          </div>
        </div>

        <div class="group normal">
          <div v-if="loginState.error" class="error">{{ loginState.error }}</div>
        </div>

        <div class="group">
          <button class="login-btn" type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      identifier: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      loginState: (state) => state.login,
    }),
  },
  methods: {
    send() {
      this.login({ identifier: this.identifier, password: this.password })
    },
    ...mapActions('login', {
      login: 'login',
      logout: 'logout',
    }),
  },
}
</script>

<style scoped>
.container {
  background-color: #0a2463;
  width: 100%;
  min-height: 700px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.login {
  background-color: #c4d7f2;
  height: 400px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.title {
  font-size: 1.8rem;
  margin: 10px 0;
}

.subtitle {
  font-size: 1.3rem;
}

.form {
  margin-top: 50px;
}

.group {
  margin-bottom: 15px;
}

.label {
  font-size: 0.7rem;
}

.field {
  outline: none;
  font-size: 0.8rem;
  padding: 5px;
  width: 75%;
}

.input {
  margin-top: 5px;
}

.login-btn {
  background-color: #d9024b;
  color: white;
  border: none;
  font-size: 0.8rem;
  padding: 8px 16px;
  outline: none;
  border-radius: 5px;
}
</style>
