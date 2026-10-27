/* O Dilema de Camilo — game da Verso
   Adaptação interativa inspirada em "A Cartomante", de Machado de Assis. */

(() => {
  'use strict';

  /* ---------- Dados do jogo ---------- */

  const STAT_LABELS = {
    crit: 'Pensamento crítico (ODS 4)',
    auton: 'Autonomia (ODS 5)',
    paz: 'Paz e justiça (ODS 16)'
  };

  const SCENES = [
    {
      place: 'Rio de Janeiro, século XIX',
      title: 'Cartas anônimas',
      text: 'Você é Camilo. Chegam cartas anônimas denunciando o seu caso com Rita, mulher do seu amigo de infância, Vilela. A ameaça é clara: alguém sabe de tudo. O que você faz?',
      choices: [
        {
          label: 'Ignorar as cartas e fingir que nada aconteceu.',
          effects: { crit: -10, auton: -5, paz: -5 },
          obra: 'No conto, o medo cresce em silêncio e as decisões passam a ser guiadas pelo desespero, não pela análise.',
          hoje: 'Ignorar sinais de alerta, como ameaças, golpes ou boatos, costuma piorar o problema. Pensamento crítico começa por analisar a situação.',
          ods: 'ODS 4'
        },
        {
          label: 'Analisar com calma quem poderia ter escrito e quais são os riscos reais.',
          effects: { crit: 15, auton: 5, paz: 5 },
          obra: 'Camilo se considera um homem racional, mas só no começo. Aqui você usa a razão de verdade: levanta hipóteses antes de agir.',
          hoje: 'Checar fontes e avaliar riscos antes de reagir é uma habilidade central da Educação de Qualidade.',
          ods: 'ODS 4'
        },
        {
          label: 'Mostrar as cartas a Rita para decidirem juntos o que fazer.',
          effects: { crit: 5, auton: 10, paz: 10 },
          obra: 'Rita fica no centro do conflito, mas quase nunca decide nada. Aqui ela participa.',
          hoje: 'Decisões que afetam duas pessoas pedem diálogo e transparência, e isso reduz conflitos.',
          ods: 'ODS 5'
        }
      ]
    },
    {
      place: 'Casa de Rita',
      title: 'A profecia de Rita',
      text: 'Rita conta que consultou a cartomante e que ela garantiu que nada de ruim vai acontecer. Ela quer que você acredite também.',
      choices: [
        {
          label: 'Debochar: "Isso é bobagem" — e encerrar a conversa.',
          effects: { crit: 0, auton: -10, paz: -5 },
          obra: 'Camilo debocha da superstição de Rita, mas sem conversar sobre o medo dela. É razão sem escuta.',
          hoje: 'Ridicularizar uma pessoa não a ajuda a pensar melhor. Desrespeitar a voz do outro enfraquece a autonomia.',
          ods: 'ODS 5'
        },
        {
          label: 'Ouvir o medo dela e propor buscar informação confiável sobre o que está acontecendo.',
          effects: { crit: 10, auton: 10, paz: 5 },
          obra: 'Em vez de confrontar a crença de Rita, você a convida a pensar junto.',
          hoje: 'Educar também é acolher dúvidas e oferecer meios de verificar informações, sem humilhar.',
          ods: 'ODS 4'
        },
        {
          label: 'Aceitar a profecia como garantia: "Então ficará tudo bem."',
          effects: { crit: -15, auton: -5, paz: -5 },
          obra: 'É a primeira rachadura na razão de Camilo: a promessa de segurança vira substituta da análise.',
          hoje: 'Promessas milagrosas, de horóscopos a golpes online, atraem quem está com medo. Garantia sem evidência é ilusão.',
          ods: 'ODS 4'
        }
      ]
    },
    {
      place: 'Casa de Rita',
      title: 'Decida por mim',
      text: 'Chorando, Rita pede: "Decida você o que vamos fazer. Eu faço o que você mandar."',
      choices: [
        {
          label: 'Decidir tudo por ela, já que ela está abalada.',
          effects: { crit: -5, auton: -15, paz: -5 },
          obra: 'A sociedade da época esperava que a mulher dependesse de um homem para decidir sobre a própria vida.',
          hoje: 'Decidir pelo outro, mesmo com boa intenção, reforça a dependência. Igualdade de gênero é garantir voz e escolha.',
          ods: 'ODS 5'
        },
        {
          label: 'Dizer que a decisão também é dela, ajudar a pensar nas opções e lembrar que ela pode buscar apoio de alguém de confiança.',
          effects: { crit: 5, auton: 15, paz: 5 },
          obra: 'Rita tinha poucas saídas autônomas. Você reconhece que ela é sujeito da própria história.',
          hoje: 'Apoiar sem controlar fortalece a autonomia e a rede de proteção da mulher.',
          ods: 'ODS 5'
        },
        {
          label: 'Sumir por alguns dias para "esfriar a cabeça".',
          effects: { crit: -5, auton: -5, paz: -10 },
          obra: 'Fugir adia o problema e deixa Rita sozinha com o medo, o que a empurra de novo para a cartomante.',
          hoje: 'Abandonar o diálogo é uma forma de evitar responsabilidade, e conflitos não resolvidos tendem a crescer.',
          ods: 'ODS 16'
        }
      ]
    },
    {
      place: 'Rua, a caminho',
      title: 'O bilhete de Vilela',
      text: 'Chega um bilhete do próprio Vilela: ele pede que você vá à casa dele imediatamente, sem explicar o motivo. O coração acelera. O que você faz?',
      choices: [
        {
          label: 'Correr até a cartomante para saber o que vai acontecer.',
          effects: { crit: -15, auton: 0, paz: -5 },
          obra: 'É exatamente o que Camilo faz no conto: o desespero vence a razão.',
          hoje: 'Sob pressão, é tentador procurar certezas rápidas. Mas decidir com medo costuma levar a erros.',
          ods: 'ODS 4'
        },
        {
          label: 'Respirar, listar o que pode estar acontecendo e decidir como se preparar.',
          effects: { crit: 15, auton: 0, paz: 5 },
          obra: 'Camilo poderia ter feito isso. Em vez de buscar profecia, você busca clareza.',
          hoje: 'Pensamento crítico também é controle emocional: pausar, levantar hipóteses e então agir.',
          ods: 'ODS 4'
        },
        {
          label: 'Inventar uma desculpa e não ir.',
          effects: { crit: -5, auton: 0, paz: -10 },
          obra: 'Evitar o confronto não elimina o conflito, só o torna mais perigoso.',
          hoje: 'Conflitos precisam de enfrentamento pacífico e responsável, não de fuga.',
          ods: 'ODS 16'
        }
      ]
    },
    {
      place: 'Diante da casa da cartomante',
      title: 'A porta da cartomante',
      text: 'No caminho, você passa pela porta da cartomante que Rita tanto frequenta. Entrar parece a forma mais rápida de acalmar o medo.',
      choices: [
        {
          label: 'Entrar e pedir que ela garanta o seu futuro.',
          effects: { crit: -15, auton: -5, paz: 0 },
          obra: 'No conto, Camilo entra, sai tranquilizado e confiante e segue direto para o desfecho trágico.',
          hoje: 'Confiar o futuro a quem promete certezas é abrir mão da própria responsabilidade.',
          ods: 'ODS 4'
        },
        {
          label: 'Seguir adiante e preparar o que vai dizer, assumindo a responsabilidade pelos seus atos.',
          effects: { crit: 10, auton: 5, paz: 5 },
          obra: 'Você quebra o ciclo do conto: a decisão volta a ser sua, e não de uma carta de baralho.',
          hoje: 'Autonomia é assumir as consequências das próprias escolhas, sem terceirizá-las.',
          ods: 'ODS 4'
        },
        {
          label: 'Ficar parado na rua, adiando a decisão.',
          effects: { crit: -5, auton: 0, paz: -5 },
          obra: 'O tempo corre e a ansiedade aumenta. Quem hesita demais acaba decidindo no impulso.',
          hoje: 'Adiar decisões importantes também é uma escolha, e geralmente pior que decidir com calma.',
          ods: 'ODS 4'
        }
      ]
    },
    {
      place: 'Casa de Vilela',
      title: 'A porta de Vilela',
      text: 'Você chega à casa de Vilela. Ele quer conversar, e você não sabe o que ele sabe nem como vai reagir. Este é o momento decisivo.',
      choices: [
        {
          label: 'Mentir e negar tudo.',
          effects: { crit: -5, auton: -5, paz: -15 },
          obra: 'A mentira sustenta a aparência moral, a mesma que torna a sociedade do conto tão frágil.',
          hoje: 'Sem verdade não há mediação possível. Instituições justas dependem de transparência.',
          ods: 'ODS 16'
        },
        {
          label: 'Assumir a verdade e propor uma conversa calma, buscando mediação se for preciso.',
          effects: { crit: 5, auton: 5, paz: 15 },
          obra: 'É o oposto do desfecho de Machado: o conflito vai para o diálogo, e não para a violência.',
          hoje: 'O ODS 16 defende a resolução pacífica de conflitos e o acesso à justiça, com instituições capazes de mediar.',
          ods: 'ODS 16'
        },
        {
          label: 'Reagir com raiva e acusar Vilela primeiro.',
          effects: { crit: -5, auton: 0, paz: -15 },
          obra: 'A raiva transforma um conflito em tragédia, como no conto.',
          hoje: 'Violência e agressividade nunca são solução. Conflitos exigem diálogo e, quando necessário, ajuda profissional ou institucional.',
          ods: 'ODS 16'
        }
      ]
    }
  ];

  const ENDINGS = {
    good: {
      badge: 'Final alternativo',
      title: 'A razão vence o medo',
      text: 'Ao decidir com calma, respeitar Rita e buscar o diálogo, Camilo muda o rumo da história. Não há garantias, mas há verdade, responsabilidade e a chance de resolver o conflito sem violência. Machado escreveu outro final; você mostrou que pensamento crítico, autonomia e mediação fazem diferença.'
    },
    mid: {
      badge: 'Final em aberto',
      title: 'Entre o medo e a razão',
      text: 'Algumas escolhas foram pensadas, outras foram movidas pelo medo. O desfecho fica em suspenso: o conflito ainda pode ser resolvido, mas a incerteza pesa. Reveja os indicadores e descubra onde faltou análise.'
    },
    bad: {
      badge: 'Final machadiano',
      title: 'A ilusão cobra seu preço',
      text: 'Guiado pelo medo e por atalhos, Camilo repete o caminho do conto: confia numa falsa segurança e chega despreparado. A tragédia se repete, na ironia amarga de quem trocou análise por superstição.'
    }
  };

  const TIPS = {
    crit: 'Seu ponto mais fraco foi o pensamento crítico (ODS 4): busque informação, questione promessas fáceis e analise antes de agir.',
    auton: 'Seu ponto mais fraco foi a autonomia (ODS 5): respeite a voz e a decisão de cada pessoa, sem decidir por ela.',
    paz: 'Seu ponto mais fraco foi paz e justiça (ODS 16): conflitos se resolvem com diálogo e instituições, não com violência.'
  };

  const QUIZ = [
    {
      q: 'A Cartomante pertence a qual movimento literário?',
      options: ['Romantismo', 'Realismo', 'Modernismo', 'Parnasianismo'],
      answer: 'Realismo',
      explain: 'Machado de Assis é o grande nome do Realismo brasileiro, marcado pela análise psicológica e pela crítica social.'
    },
    {
      q: 'Qual recurso marca o desfecho do conto, quando a profecia tranquilizadora antecede a tragédia?',
      options: ['Ironia', 'Idealização amorosa', 'Exaltação da natureza', 'Linguagem regionalista'],
      answer: 'Ironia',
      explain: 'A ironia machadiana está no contraste entre a falsa segurança de Camilo e a tragédia que o espera.'
    },
    {
      q: 'Camilo troca a análise da realidade por uma solução mágica. A qual ODS isso se relaciona mais diretamente?',
      options: [
        'ODS 4 – Educação de Qualidade',
        'ODS 5 – Igualdade de Gênero',
        'ODS 16 – Paz, Justiça e Instituições Eficazes',
        'ODS 2 – Fome Zero'
      ],
      answer: 'ODS 4 – Educação de Qualidade',
      explain: 'A falta de pensamento crítico, que deixa a pessoa refém de soluções fáceis, dialoga com a Educação de Qualidade.'
    },
    {
      q: 'A dependência e as poucas saídas autônomas de Rita dialogam com qual ODS?',
      options: [
        'ODS 4 – Educação de Qualidade',
        'ODS 5 – Igualdade de Gênero',
        'ODS 16 – Paz, Justiça e Instituições Eficazes',
        'ODS 2 – Fome Zero'
      ],
      answer: 'ODS 5 – Igualdade de Gênero',
      explain: 'A situação de Rita reflete a dependência psicológica e social da mulher no século XIX, tema do ODS 5.'
    },
    {
      q: 'A justiça feita com as próprias mãos, no desfecho do conto, contraria qual ODS?',
      options: [
        'ODS 4 – Educação de Qualidade',
        'ODS 5 – Igualdade de Gênero',
        'ODS 16 – Paz, Justiça e Instituições Eficazes',
        'ODS 2 – Fome Zero'
      ],
      answer: 'ODS 16 – Paz, Justiça e Instituições Eficazes',
      explain: 'O ODS 16 defende a resolução pacífica de conflitos por meio de instituições justas e eficazes.'
    }
  ];

  /* ---------- Estado ---------- */

  const state = { i: 0, stats: {}, quizIdx: 0, quizScore: 0 };
  let keyHandler = null;

  const stage = document.getElementById('stage');
  const metersEl = document.getElementById('meters');

  /* ---------- Utilitários ---------- */

  function h(tag, props = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    kids.flat().filter(k => k !== null && k !== undefined && k !== false).forEach(k => el.append(k));
    return el;
  }

  const clamp = n => Math.max(0, Math.min(100, n));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function setMeters() {
    Object.keys(STAT_LABELS).forEach(k => {
      document.getElementById('f-' + k).style.width = state.stats[k] + '%';
      document.getElementById('v-' + k).textContent = state.stats[k];
    });
  }

  function render(...nodes) {
    stage.replaceChildren(...nodes);
    const focusEl = stage.querySelector('[data-focus]');
    if (focusEl) focusEl.focus({ preventScroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('keydown', e => {
    if (!keyHandler) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) keyHandler(n - 1);
  });

  /* ---------- Telas ---------- */

  function showStart() {
    keyHandler = null;
    metersEl.hidden = true;
    render(
      h('section', { class: 'card' },
        h('span', { class: 'badge' }, 'Game · Verso'),
        h('h1', { tabindex: '-1', 'data-focus': '' }, 'O Dilema de Camilo'),
        h('p', { class: 'lead' }, 'Uma adaptação interativa de A Cartomante, de Machado de Assis. Você assume o lugar de Camilo e toma decisões em seis momentos-chave da história.'),
        h('p', {}, 'Suas escolhas movem três indicadores ligados aos Objetivos de Desenvolvimento Sustentável: pensamento crítico (ODS 4), autonomia (ODS 5) e paz e justiça (ODS 16). Será que dá para escrever um final diferente do conto? No fim, há um quiz no estilo vestibular.'),
        h('p', {}, 'Dica: você pode escolher usando as teclas 1, 2 e 3.'),
        h('div', { class: 'actions' },
          h('button', { class: 'btn btn-primary', onclick: startGame }, 'Começar'),
          h('a', { class: 'btn btn-secondary', href: 'index.html' }, 'Voltar ao site')
        )
      )
    );
  }

  function startGame() {
    state.i = 0;
    state.quizIdx = 0;
    state.quizScore = 0;
    state.stats = { crit: 50, auton: 50, paz: 50 };
    metersEl.hidden = false;
    setMeters();
    showScene();
  }

  function showScene() {
    const s = SCENES[state.i];
    const pct = (state.i / SCENES.length) * 100;

    render(
      h('div', { class: 'progress' },
        'Cena ' + (state.i + 1) + ' de ' + SCENES.length,
        h('div', { class: 'bar' }, h('div', { class: 'fill', style: 'width:' + pct + '%' }))
      ),
      h('article', { class: 'card' },
        h('p', { class: 'place' }, s.place),
        h('h2', { tabindex: '-1', 'data-focus': '' }, s.title),
        h('p', { class: 'scene-text' }, s.text),
        h('div', { class: 'choices' },
          s.choices.map((c, idx) =>
            h('button', { class: 'choice', onclick: () => choose(idx) },
              h('span', { class: 'key' }, String(idx + 1)),
              h('span', {}, c.label)
            )
          )
        )
      )
    );
    keyHandler = idx => { if (idx < s.choices.length) choose(idx); };
  }

  function choose(idx) {
    keyHandler = null;
    const s = SCENES[state.i];
    const c = s.choices[idx];

    Object.entries(c.effects).forEach(([k, v]) => {
      state.stats[k] = clamp(state.stats[k] + v);
    });
    setMeters();

    const deltas = Object.entries(c.effects)
      .filter(([, v]) => v !== 0)
      .map(([k, v]) =>
        h('span', { class: 'delta ' + (v > 0 ? 'pos' : 'neg') },
          (v > 0 ? '+' : '') + v + ' ' + STAT_LABELS[k])
      );

    const last = state.i === SCENES.length - 1;

    render(
      h('article', { class: 'card' },
        h('span', { class: 'badge' }, c.ods),
        h('h2', { tabindex: '-1', 'data-focus': '' }, 'Consequência'),
        h('p', { class: 'your-choice' }, c.label),
        h('div', { class: 'fb-block' }, h('h3', {}, 'Na obra'), h('p', {}, c.obra)),
        h('div', { class: 'fb-block' }, h('h3', {}, 'Hoje'), h('p', {}, c.hoje)),
        h('div', { class: 'deltas' }, deltas),
        h('div', { class: 'actions' },
          h('button', { class: 'btn btn-primary', onclick: next }, last ? 'Ver o final' : 'Continuar')
        )
      )
    );
  }

  function next() {
    state.i += 1;
    if (state.i < SCENES.length) showScene();
    else showEnding();
  }

  function showEnding() {
    const { crit, auton, paz } = state.stats;
    const avg = (crit + auton + paz) / 3;
    const ending = avg >= 72 ? ENDINGS.good : avg >= 45 ? ENDINGS.mid : ENDINGS.bad;

    const entries = Object.entries(state.stats).sort((a, b) => a[1] - b[1]);
    const [weakKey, weakVal] = entries[0];
    const tip = weakVal >= 70
      ? 'Parabéns: os seus três indicadores terminaram fortes.'
      : TIPS[weakKey];

    keyHandler = null;
    metersEl.hidden = false;
    render(
      h('article', { class: 'card' },
        h('span', { class: 'badge' }, ending.badge),
        h('h2', { tabindex: '-1', 'data-focus': '' }, ending.title),
        h('p', { class: 'lead' }, ending.text),
        h('p', { class: 'ending-tip' }, tip),
        h('div', { class: 'actions' },
          h('button', { class: 'btn btn-primary', onclick: startQuiz }, 'Modo vestibular'),
          h('button', { class: 'btn btn-secondary', onclick: startGame }, 'Jogar de novo')
        )
      )
    );
  }

  /* ---------- Quiz ---------- */

  function startQuiz() {
    state.quizIdx = 0;
    state.quizScore = 0;
    metersEl.hidden = true;
    showQuestion();
  }

  function showQuestion() {
    const q = QUIZ[state.quizIdx];
    const options = shuffle(q.options);
    const pct = (state.quizIdx / QUIZ.length) * 100;
    let answered = false;

    const optionButtons = options.map((opt, idx) =>
      h('button', { class: 'option', onclick: () => answer(idx) },
        h('span', { class: 'key' }, String(idx + 1)),
        h('span', {}, opt)
      )
    );
    const feedback = h('div', { 'aria-live': 'polite' });

    function answer(idx) {
      if (answered) return;
      answered = true;
      keyHandler = null;

      const correct = options[idx] === q.answer;
      if (correct) state.quizScore += 1;

      optionButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (options[i] === q.answer) btn.classList.add('correct');
        else if (i === idx) btn.classList.add('wrong');
      });

      const last = state.quizIdx === QUIZ.length - 1;
      const btn = h('button', {
        class: 'btn btn-primary',
        onclick: () => {
          state.quizIdx += 1;
          if (state.quizIdx < QUIZ.length) showQuestion();
          else showResult();
        }
      }, last ? 'Ver resultado' : 'Próxima pergunta');

      feedback.replaceChildren(
        h('p', { class: 'explain' }, (correct ? 'Correto! ' : 'Quase. ') + q.explain),
        h('div', { class: 'actions' }, btn)
      );
      btn.focus();
    }

    render(
      h('div', { class: 'progress' },
        'Pergunta ' + (state.quizIdx + 1) + ' de ' + QUIZ.length,
        h('div', { class: 'bar' }, h('div', { class: 'fill', style: 'width:' + pct + '%' }))
      ),
      h('article', { class: 'card' },
        h('span', { class: 'badge' }, 'Modo vestibular'),
        h('h2', { tabindex: '-1', 'data-focus': '' }, q.q),
        h('div', { class: 'options' }, optionButtons),
        feedback
      )
    );
    keyHandler = idx => { if (idx < options.length) answer(idx); };
  }

  function showResult() {
    keyHandler = null;
    const total = QUIZ.length;
    const score = state.quizScore;
    const msg = score === total
      ? 'Excelente! Você domina a obra e a ligação com os ODS.'
      : score >= 3
        ? 'Muito bom! Revise os pontos que errou e você chega lá.'
        : 'Vale reler o conto e rever a análise dos ODS no site da Verso.';

    render(
      h('article', { class: 'card' },
        h('span', { class: 'badge' }, 'Resultado'),
        h('h2', { tabindex: '-1', 'data-focus': '' }, 'Você acertou'),
        h('p', { class: 'score' }, score + ' / ' + total),
        h('p', { class: 'lead' }, msg),
        h('div', { class: 'actions' },
          h('button', { class: 'btn btn-primary', onclick: startGame }, 'Jogar de novo'),
          h('a', { class: 'btn btn-secondary', href: 'index.html#analise-ods' }, 'Ver análise dos ODS')
        )
      )
    );
  }

  showStart();
})();
