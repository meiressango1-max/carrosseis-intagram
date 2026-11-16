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

// ---------------- Semana 1 (16–22/11/2026) ----------------
const SEMANA1 = [
  {
    slug: 'proteina-mito-verdade',
    type: 'mv',
    cover: {
      title: '5 mitos sobre proteína que travam seu resultado depois dos 40',
      subtitle: '(o nº 4 muita gente nem questiona)',
    },
    items: [
      {
        n: '01',
        mito: 'Proteína é só para quem quer ganhar músculo.',
        verdade: 'Depois dos 40, ela ajuda a manter a massa muscular que o corpo tende a perder. Serve para quem treina e para quem quer envelhecer forte.',
      },
      {
        n: '02',
        mito: 'Na menopausa, comer o mínimo é o único jeito de controlar o peso.',
        verdade: 'Comer pouco demais costuma piorar a perda de massa muscular. Proteína suficiente e comida de verdade pesam mais do que cortar tudo.',
      },
      {
        n: '03',
        mito: 'Só dá para atingir a proteína do dia com suplemento.',
        verdade: 'Ovos, frango, peixe, iogurte, queijos, feijão e lentilha já ajudam muito. Suplemento é complemento, não obrigação.',
      },
      {
        n: '04',
        mito: 'Proteína no jantar engorda.',
        verdade: 'O que pesa é o total do dia, não o horário. Distribuir proteína nas refeições costuma ajudar na saciedade.',
      },
      {
        n: '05',
        mito: 'Quanto mais proteína, melhor o resultado.',
        verdade: 'Mais não é sempre melhor. O que funciona é consistência e treino de força junto. Se tiver alguma condição de saúde, siga a orientação do seu médico ou nutricionista.',
      },
    ],
    closing: {
      ...CLOSING_DEFAULT,
      title: 'Salva esse post: proteína é o seu aliado depois dos 40',
    },
  },
  {
    slug: 'sinais-corpo-nao-responde',
    type: 'lista',
    cover: {
      title: '5 sinais de que seu corpo parou de responder ao treino',
      subtitle: '(o nº 2 quase ninguém percebe)',
    },
    items: [
      {
        n: '01',
        titulo: 'Você treina igual há meses',
        texto: 'Mesma carga, mesma série, mesmo resultado. O corpo se adapta: sem progressão, ele para de responder.',
      },
      {
        n: '02',
        titulo: 'Você treina muito e come pouco',
        texto: 'Cortar demais para compensar tira energia do treino e a massa muscular que sustenta o seu metabolismo.',
      },
      {
        n: '03',
        titulo: 'Você só faz cardio',
        texto: 'Cardio é ótimo, mas sem treino de força você perde a base muscular que mantém o corpo ativo e firme.',
      },
      {
        n: '04',
        titulo: 'Você dorme mal e quase não se recupera',
        texto: 'Sem sono e sem descanso, o treino vira só desgaste. É na recuperação que o corpo evolui.',
      },
      {
        n: '05',
        titulo: 'Você treina por culpa, não por estratégia',
        texto: 'Treino sem plano vira punição. O corpo responde melhor a método do que a esforço aleatório.',
      },
    ],
    closing: {
      ...CLOSING_DEFAULT,
      title: 'Se você se viu em algum sinal, salva esse post',
      subtitle: 'O corpo não parou: ele só pede outro estímulo. Segue @meiresango para aprender qual.',
    },
  },
  {
    slug: 'menopausa-e-treino',
    type: 'mv',
    cover: {
      title: '5 mitos sobre menopausa e treino que precisam acabar',
      subtitle: '(o nº 5 é o mais comum)',
    },
    items: [
      {
        n: '01',
        mito: 'Com a menopausa, engordar é inevitável.',
        verdade: 'As mudanças hormonais afetam o corpo, mas treino de força, proteína e sono ajudam a manter a composição corporal.',
      },
      {
        n: '02',
        mito: 'Na menopausa, treino de força não é indicado.',
        verdade: 'Treino de força bem orientado ajuda a preservar músculos e ossos nessa fase. O segredo é a progressão certa.',
      },
      {
        n: '03',
        mito: 'Se o peso na balança não muda, nada mudou.',
        verdade: 'A balança não mostra massa muscular, medidas nem energia. Observe também roupas, força e disposição.',
      },
      {
        n: '04',
        mito: 'É tarde demais para começar a treinar.',
        verdade: 'Mulheres que começam depois dos 40, 50 ou 60 anos ainda ganham força, equilíbrio e autonomia.',
      },
      {
        n: '05',
        mito: 'Treinar todos os dias é o que faz o corpo responder.',
        verdade: 'Descanso faz parte do resultado. O corpo responde ao estímulo e, principalmente, à recuperação.',
      },
    ],
    closing: {
      ...CLOSING_DEFAULT,
      title: 'Manda pra amiga que está na menopausa e precisa ouvir isso',
    },
  },
];

module.exports = { PAIRS, TOTAL_CARDS, CLOSING_DEFAULT, SEMANA1 };
