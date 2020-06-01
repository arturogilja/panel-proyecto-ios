<template>
  <div>
    <div class="head">
      <div class="box title bold">Waiter</div>
      <div class="box logout semi">
        <button class="logout-btn" @click="logout">Cerrar Sesion</button>
      </div>
    </div>
    <div class="container">
      <div v-for="pedido in pedidos" :key="pedido.id" class="card">
        <div class="id bold">Pedido {{ pedido.id }}</div>
        <div class="platillos">
          <div v-for="platillo in pedido.platillos" :key="platillo.id" class="platillo">
            <span class="semi">{{ platillo.cantidad }}</span>
            <span class="semi">{{ ` ${platillo.platillo.nombre}` }}</span>
            <div class="platillo-comentario light">{{ platillo.comentarios }}</div>
          </div>
        </div>
        <div class="comentarios light">
          <div class="comentarios-title normal">Comentarios</div>
          {{ pedido.comentarios }}
        </div>
        <div class="status normal">
          Estado: {{ pedido.status }}
          <div class="status-container-btn" v-if="pedido.status === 'pendiente'">
            <button class="status-btn" @click="marcarPedido('preparacion', pedido)">Marcar en preparación</button>
          </div>
          <div class="status-container-btn" v-if="pedido.status === 'preparacion'">
            <button class="status-btn" @click="marcarPedido('servido', pedido)">Marcar servido</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getPedidos, updatePedidoStatus } from '../services/pedidos'
import io from 'socket.io-client'
import audioFile from '../assets/timbre.mp3'
export default {
  data() {
    return {
      pedidos: [],
      socket: null,
    }
  },
  computed: {
    ...mapState({
      loginState: (state) => state.login,
    }),
  },
  methods: {
    ...mapActions('login', {
      logout: 'logout',
    }),
    marcarPedido(status, pedido) {
      updatePedidoStatus(this.loginState.token, pedido.id, status).then((res) => {
        pedido.status = status
        if (status === 'servido') {
          pedido = undefined
          this.get()
        }
      })
    },
    get() {
      const token = this.loginState.token
      getPedidos(token)
        .then((res) => (this.pedidos = res.data))
        .catch((err) => {
          if (err.response.status === 401) this.logout()
        })
    },
  },
  mounted() {
    this.get()
    this.socket = io('https://arturogil.com.mx/', { path: '/socket/socket.io' })
    this.socket.on('nuevo_pedido', (pedido) => {
      let audio = new Audio(audioFile)
      audio.play()
      this.get()
    })
  },
}
</script>

<style scoped>
.head {
  background-color: #d9024b;
  display: flex;
  height: 65px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  text-align: center;
}

.title {
  font-size: 2rem;
  color: #fffaff;
}

.logout-btn {
  background-color: #0a2463;
  color: white;
  border: none;
  font-size: 0.8rem;
  padding: 8px 16px;
  outline: none;
  border-radius: 5px;
}

.container {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

.card {
  margin: 20px 20px 0 20px;
  background-color: #c4d7f2;
  width: 290px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.id {
  text-align: center;
  font-size: 1.2rem;
  padding: 10px 0;
  border-bottom: #0a2463 3px solid;
}

.platillos {
  padding: 0 10px;
  border-bottom: #0a2463 3px solid;
}

.platillo {
  padding: 8px 0;
}

.comentarios {
  padding: 10px;
  border-bottom: #0a2463 3px solid;
}

.comentarios-title {
  font-size: 0.8rem;
  margin-bottom: 3px;
}

.status {
  padding: 10px;
  text-align: center;
}

.status-btn {
  background-color: #4d7c8a;
  color: white;
  border: none;
  font-size: 0.8rem;
  padding: 8px 16px;
  outline: none;
  border-radius: 5px;
}

.status-container-btn {
  margin-top: 10px;
}
</style>
