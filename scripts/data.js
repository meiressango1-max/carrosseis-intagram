// Conteúdo dos carrosséis — O Corpo Responde™ (Método MP4)
// Cada carrossel tem 7 cards: capa + 5 itens + fechamento.
// type 'mv'    = Mito ou Verdade (items: n, mito, verdade)
// type 'lista' = lista de sinais/erros (items: n, titulo, texto)

const PAIRS = [
  {
    n: '01',
    mito: 'Depois dos 40, é normal perder força e ganhar gordura.',
    verdade: 'A perda de força vem da falta do estímulo certo — não da idade. Corpo treinado responde em qualquer fase.',
  },
  {
    n: '02',
    mito: "Treino de força deixa mulher “grande” e masculinizada.",
    verdade: 'Hipertrofia feminina saudável significa mais metabolismo, mais osso forte e mais autonomia no dia a dia.',
  },
  {
    n: '03',
    mito: 'Cardio é o jeito mais eficiente de emagrecer depois dos 40.',
    verdade: 'Sem massa muscular, o corpo queima menos parado. Força emagrece mais — e mantém o resultado.',
  },
  {
    n: '04',
    mito: 'Proteína em excesso sobrecarrega os rins.',
    verdade: 'Em pessoas saudáveis, não há essa evidência. E é justamente na menopausa que a proteína mais protege.',
  },
  {
    n: '05',
    mito: 'Se não sentir dor no dia seguinte, o treino não funcionou.',
    verdade: 'Dor não é sinônimo de resultado. Progressão inteligente é o que constrói corpo forte, sem sacrifício.',
  },
];

const TOTAL_CARDS = 7;

const CLOSING_DEFAULT = {
  title: 'Salva esse post e manda pra amiga que precisa ouvir isso hoje',
  subtitle: 'Segue @meiresango para mais conteúdo de treino e proteína para mulheres 40+.',
  button: 'Salve. Compartilhe. Siga.',
  quote: 'Mulher forte é mulher livre.',
};

// ---------------- Semana 1 (16–22/11/2026) — versão 2 (conteúdo prático) ----------------
// type de card: 'mv' (mito/verdade) | 'duo' (sinal + o que fazer) | 'info' (título + texto ou bullets)
const BYLINE = 'Meire Sango · Educação Física · Pós em Nutrição · 25+ anos';

const SEMANA1 = [
  {
    slug: 'guia-proteina-40',
    cover: {
      title: 'Quanta proteína você precisa depois dos 40? O guia simples',
      subtitle: '(com números e exemplos para salvar)',
    },
    cards: [
      { type: 'info', n: '01', eyebrow: 'Por que importa', titulo: 'Por que a proteína pesa mais depois dos 40',
        texto: 'Com o passar dos anos o corpo perde massa muscular aos poucos, principalmente sem treino de força e sem proteína suficiente. Músculo é força, equilíbrio, metabolismo ativo e ossos mais protegidos.' },
      { type: 'info', n: '02', eyebrow: 'Quanto comer', titulo: 'Quanto comer por dia',
        texto: 'Referência geral para mulheres saudáveis que treinam: cerca de 1,2 a 1,6 g de proteína por kg de peso. Exemplo: 65 kg = de 78 a 104 g por dia. É uma faixa geral: seu caso pede ajuste individual.' },
      { type: 'info', n: '03', eyebrow: 'Como dividir', titulo: 'Como dividir ao longo do dia',
        bullets: ['3 a 4 refeições com proteína', 'Mire cerca de 25 a 30 g em cada uma', 'Não deixe tudo para o jantar', 'Distribuir ajuda na saciedade'] },
      { type: 'info', n: '04', eyebrow: 'Na prática', titulo: 'Quanto é 25 a 30 g de proteína?',
        bullets: ['100 g de frango, carne ou peixe cozido ≈ 25 a 30 g', '4 ovos ≈ 24 g', '1 xícara de lentilha cozida ≈ 18 g', 'Iogurte e queijos variam: confira o rótulo'] },
      { type: 'info', n: '05', eyebrow: 'Exemplo', titulo: 'Exemplo de dia (ajuste ao seu peso)',
        bullets: ['Café: ovos + iogurte', 'Almoço: frango ou peixe + feijão', 'Lanche: queijo ou iogurte', 'Jantar: ovos ou carne + legumes'] },
      { type: 'info', n: '06', eyebrow: 'Atenção', titulo: 'Quem precisa de orientação individual',
        texto: 'Se você tem doença renal, está grávida ou tem outra condição de saúde, ajuste a quantidade com seu médico ou nutricionista. Para a maioria das pessoas saudáveis, essas faixas são consideradas seguras.' },
    ],
    closing: {
      title: 'Salva este guia e marca a amiga que treina e come pouca proteína',
      subtitle: BYLINE,
      button: 'Salve. Marque. Siga.',
      quote: 'Mulher forte é mulher livre.',
    },
  },
  {
    slug: 'sinais-e-solucoes',
    cover: {
      title: 'Seu corpo parou de responder ao treino? 5 causas e o que fazer',
      subtitle: '(cada sinal vem com a solução)',
    },
    cards: [
      { type: 'duo', n: '01', a: 'Você treina igual há meses', b: 'Aumente a carga ou as repetições aos poucos, a cada 2 a 4 semanas. Mude um exercício por vez.' },
      { type: 'duo', n: '02', a: 'Você treina muito e come pouco', b: 'Coma o suficiente para sustentar o treino e inclua proteína em todas as refeições. Procure um nutricionista antes de cortar calorias.' },
      { type: 'duo', n: '03', a: 'Você só faz cardio', b: 'Inclua 2 a 3 treinos de força por semana. Treino de corpo inteiro é um bom começo.' },
      { type: 'duo', n: '04', a: 'Você dorme mal e quase não se recupera', b: 'Fixe um horário para dormir e reduza telas à noite. Se o sono ruim persiste, converse com seu médico.' },
      { type: 'duo', n: '05', a: 'Você treina sem plano', b: 'Escolha um plano com progressão e anote carga e repetições por 4 semanas.' },
    ],
    closing: {
      title: 'Qual desses 5 mais te pegou? Comenta o número e marca uma amiga',
      subtitle: BYLINE,
      button: 'Salve. Comente. Siga.',
      quote: 'Mulher forte é mulher livre.',
    },
  },
  {
    slug: 'menopausa-e-treino-v2',
    cover: {
      title: '5 mitos sobre menopausa e treino (e o que fazer no lugar)',
      subtitle: '(com um plano mínimo para a semana)',
    },
    cards: [
      { type: 'mv', n: '01', mito: 'Com a menopausa, engordar é inevitável.', verdade: 'Os hormônios mudam, mas treino de força, proteína e sono ajudam a manter a composição corporal. Comece com 2 treinos de força na semana.' },
      { type: 'mv', n: '02', mito: 'Na menopausa, treino de força não é indicado.', verdade: 'Bem orientado, ele ajuda a preservar músculos e ossos. Comece leve e aumente a carga aos poucos.' },
      { type: 'mv', n: '03', mito: 'Se o peso na balança não muda, nada mudou.', verdade: 'A balança não mede músculo nem energia. A cada 4 semanas, registre cintura, fotos, força e disposição.' },
      { type: 'mv', n: '04', mito: 'É tarde demais para começar a treinar.', verdade: 'Quem começa depois dos 40, 50 ou 60 ainda ganha força e equilíbrio. O melhor dia é hoje, com um treino simples.' },
      { type: 'mv', n: '05', mito: 'Treinar todos os dias faz o corpo responder mais.', verdade: 'Descanso faz parte do resultado. Alterne os dias e reserve pelo menos 1 dia de descanso completo.' },
      { type: 'info', n: '06', eyebrow: 'Resumo', titulo: 'Seu plano mínimo da semana',
        bullets: ['2 treinos de força (30 a 40 min)', 'Proteína em todas as refeições', 'Sono como prioridade: busque 7 horas ou mais', '1 dia de descanso completo'] },
    ],
    closing: {
      title: 'Manda pra amiga que está na menopausa e precisa desse plano',
      subtitle: BYLINE,
      button: 'Salve. Compartilhe. Siga.',
      quote: 'Mulher forte é mulher livre.',
    },
  },
];

module.exports = { PAIRS, TOTAL_CARDS, CLOSING_DEFAULT, SEMANA1 };
