import axios from 'axios'

export const getPedidos = (token) => {
  return axios.get('https://arturogil.com.mx/api/pedidos?status_eq=pendiente&status_eq=preparacion', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updatePedidoStatus = (token, id, status) => {
  return axios.put(
    `https://arturogil.com.mx/api/pedidos/${id}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
