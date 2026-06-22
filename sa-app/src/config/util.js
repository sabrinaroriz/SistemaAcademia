function formatarMoeda(valor) {
    if (valor === null || valor === undefined) return 'R$ 0,00';
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  export default formatarMoeda;