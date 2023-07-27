export const fetchMoney = async (inputValor: string = 'EUR') => {
  const reponse = await fetch(`https://api.exchangerate.host/latest?base=${inputValor}`)
  const data = await reponse.json()

  return data;
};