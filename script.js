/* =========================================
   SCRIPT.JS – 15ª Gerência Regional / PB
   Queimadas – Paraíba
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. MENU MOBILE
  ───────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu    = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.toggle('bi-list');
      icon.classList.toggle('bi-x-lg');
    });

    // Fecha ao clicar em link interno
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('bi-list');
        icon.classList.remove('bi-x-lg');
      });
    });
  }

  /* ─────────────────────────────────────
     2. BOTÃO VOLTAR AO TOPO
  ───────────────────────────────────── */
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────
     3. CONTADOR ANIMADO (HERO STATS)
  ───────────────────────────────────── */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step     = Math.ceil(target / (duration / 16));
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString('pt-BR');
    }, 16);
  }

  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counterEls.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.4 });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) heroObserver.observe(heroSection);

  /* ─────────────────────────────────────
     4. FILTRO DE SETORES
  ───────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const setorWraps  = document.querySelectorAll('.setor-card-wrap');
  const noResults   = document.getElementById('noResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible  = 0;

      setorWraps.forEach(wrap => {
        const categoria = wrap.dataset.categoria;
        const show      = filter === 'all' || categoria === filter;

        if (show) {
          wrap.classList.remove('hidden');
          visible++;
        } else {
          wrap.classList.add('hidden');
        }
      });

      // Mostra/esconde aviso de vazio
      if (noResults) {
        noResults.classList.toggle('d-none', visible > 0);
      }
    });
  });

  /* ─────────────────────────────────────
     5. DADOS DOS GRÁFICOS POR PERÍODO
  ───────────────────────────────────── */
  const dadosGraficos = {
    mensal: {
      atendimentos: {
        labels: [
          'Administrativo', 'RH', 'Financeiro', 'TI',
          'Assist. Social', 'Jurídico', 'Educação',
          'Infraestrutura', 'Controle Int.', 'Comunicação',
          'Saúde Serv.', 'Compras'
        ],
        valores: [142, 98, 115, 87, 210, 63, 175, 72, 55, 48, 90, 45],
      },
      evolucao: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        valores: [980, 1020, 1150, 1080, 1200, 1350,
                  1280, 1100, 1190, 1250, 1320, 1400],
      }
    },
    trimestral: {
      atendimentos: {
        labels: [
          'Administrativo', 'RH', 'Financeiro', 'TI',
          'Assist. Social', 'Jurídico', 'Educação',
          'Infraestrutura', 'Controle Int.', 'Comunicação',
          'Saúde Serv.', 'Compras'
        ],
        valores: [426, 294, 345, 261, 630, 189, 525, 216, 165, 144, 270, 135],
      },
      evolucao: {
        labels: ['1º Trim.', '2º Trim.', '3º Trim.', '4º Trim.'],
        valores: [3150, 3630, 3570, 3970],
      }
    },
    anual: {
      atendimentos: {
        labels: [
          'Administrativo', 'RH', 'Financeiro', 'TI',
          'Assist. Social', 'Jurídico', 'Educação',
          'Infraestrutura', 'Controle Int.', 'Comunicação',
          'Saúde Serv.', 'Compras'
        ],
        valores: [1704, 1176, 1380, 1044, 2520, 756, 2100, 864, 660, 576, 1080, 540],
      },
      evolucao: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        valores: [8400, 10200, 11800, 13200, 14320],
      }
    }
  };

  /* ─────────────────────────────────────
     6. CORES DOS GRÁFICOS (via tokens)
  ───────────────────────────────────── */
  const ROOT    = document.documentElement;
  const cs      = getComputedStyle(ROOT);
  const PRIMARY = cs.getPropertyValue('--color-primary').trim()   || '#003366';
  const GREEN   = cs.getPropertyValue('--color-secondary').trim() || '#009739';
  const ACCENT  = '#FFCC00';
  const DANGER  = cs.getPropertyValue('--color-danger').trim()    || '#CC0000';

  const PALETTE_BAR = [
    PRIMARY, GREEN, '#b38a00', DANGER,
    '#1a5276', '#1e8449', '#7d6608', '#922b21',
    '#154360', '#0e6655', '#6e2f1a', '#283747'
  ];

  const PALETTE_DONUT = [PRIMARY, GREEN, ACCENT, DANGER];

  /* ─────────────────────────────────────
     7. INICIALIZAÇÃO DOS GRÁFICOS
  ───────────────────────────────────── */
  let chartAtend, chartCat, chartEvol;

  function buildCharts(period) {
    const dados = dadosGraficos[period];

    // Destrói anteriores se existirem
    if (chartAtend) chartAtend.destroy();
    if (chartCat)   chartCat.destroy();
    if (chartEvol)  chartEvol.destroy();

    /* ── 7a. Gráfico de Barras: Atendimentos por Setor ── */
    const ctxAtend = document.getElementById('chartAtendimentos');
    if (ctxAtend) {
      chartAtend = new Chart(ctxAtend, {
        type: 'bar',
        data: {
          labels: dados.atendimentos.labels,
          datasets: [{
            label: 'Atendimentos',
            data: dados.atendimentos.valores,
            backgroundColor: PALETTE_BAR,
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.parsed.y.toLocaleString('pt-BR')} atendimentos`
              }
            }
          },
          scales: {
            x: {
              ticks: {
                font: { size: 10, family: 'Inter' },
                color: '#6B7280',
                maxRotation: 40,
              },
              grid: { display: false }
            },
            y: {
              ticks: {
                font: { size: 10 },
                color: '#6B7280',
                callback: val => val.toLocaleString('pt-BR')
              },
              grid: { color: 'rgba(0,0,0,0.06)' },
              beginAtZero: true
            }
          }
        }
      });
    }

    /* ── 7b. Gráfico de Rosca: Categorias ── */
    const ctxCat = document.getElementById('chartCategorias');
    if (ctxCat) {
      chartCat = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: ['Administrativo', 'Técnico', 'Social', 'Financeiro'],
          datasets: [{
            data: [5, 2, 3, 3], // quantidade de setores por categoria
            backgroundColor: PALETTE_DONUT,
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: { size: 11, family: 'Inter' },
                color: '#374151',
                padding: 16,
                usePointStyle: true,
                pointStyleWidth: 10
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.parsed} setores`
              }
            }
          }
        }
      });
    }

    /* ── 7c. Gráfico de Linha: Evolução ── */
    const ctxEvol = document.getElementById('chartEvolucao');
    if (ctxEvol) {
      chartEvol = new Chart(ctxEvol, {
        type: 'line',
        data: {
          labels: dados.evolucao.labels,
          datasets: [
            {
              label: 'Total de Atendimentos',
              data: dados.evolucao.valores,
              borderColor: PRIMARY,
              backgroundColor: 'rgba(0,51,102,0.08)',
              borderWidth: 2.5,
              pointBackgroundColor: PRIMARY,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Meta',
              data: dados.evolucao.valores.map(v => Math.round(v * 0.9)),
              borderColor: GREEN,
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [6, 4],
              pointRadius: 0,
              fill: false,
              tension: 0.4,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { size: 11, family: 'Inter' },
                color: '#374151',
                usePointStyle: true,
                pointStyleWidth: 10,
                padding: 16
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR')}`
              }
            }
          },
          scales: {
            x: {
              ticks: { font: { size: 11 }, color: '#6B7280' },
              grid: { display: false }
            },
            y: {
              ticks: {
                font: { size: 10 },
                color: '#6B7280',
                callback: val => val.toLocaleString('pt-BR')
              },
              grid: { color: 'rgba(0,0,0,0.06)' },
              beginAtZero: false
            }
          }
        }
      });
    }
  }

  // Inicia com período Mensal
  buildCharts('mensal');

  /* ─────────────────────────────────────
     8. FILTRO DE PERÍODO (gráficos)
  ───────────────────────────────────── */
  const periodBtns = document.querySelectorAll('.period-btn');

  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildCharts(btn.dataset.period);
    });
  });

  /* ─────────────────────────────────────
     9. ANIMAÇÃO DE ENTRADA DOS CARDS
     (IntersectionObserver)
  ───────────────────────────────────── */
  const animateOnScroll = (selector, delay = 80) => {
    const items = document.querySelectorAll(selector);
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * delay}ms, transform 0.5s ease ${i * delay}ms`;
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(el => obs.observe(el));
  };

  animateOnScroll('.setor-card-wrap', 60);
  animateOnScroll('.contato-card',    80);
  animateOnScroll('.chart-card',      90);

  /* ─────────────────────────────────────
     10. HIGHLIGHT LINK ATIVO NO SCROLL
  ───────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-custom');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--color-accent)';
      }
    });
  });

});
