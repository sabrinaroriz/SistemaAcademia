import api from '../api';

export const autenticar = async (credenciais) => {

  const response = await api.post(
    '/usuarios/auth',
    credenciais
  );

  return response.data;
};

export const cadastrar = async (usuario) => {

  const response = await api.post(
    '/usuarios',
    usuario
  );

  return response.data;
};
export const logout = () => {
  sessionStorage.removeItem('token_academia');
  sessionStorage.removeItem('usuario');
  sessionStorage.removeItem('admin');
};