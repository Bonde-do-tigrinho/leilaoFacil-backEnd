export interface Imovel {
  _id:             string,
  cidade:         string,
  estado:         string,
  banco:          string,
  numero_imovel:   string, // Número do imóvel no leilão
  imagem:         string,
  link:           string,
  valor_avaliacao: number,
  tipoImovel:     string,
  endereco:       string,
  datas_leiloes: Date[], // Datas dos leilões
  valor_minimo_1_leilao: number | null, // Valor mínimo de venda no primeiro leilão
  valor_minimo_2_leilao: number | null, // Valor mínimo de venda no segundo leilão
  formas_pagamento: string[], // Formas de pagamento disponíveis
}
