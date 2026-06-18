// ---- TABS ----
function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// ---- MITOS ----
function toggleMito(el) {
  el.classList.toggle('open');
}

// ---- FAQ ----
function toggleFaq(el) {
  el.classList.toggle('open');
}

// ---- QUIZ ----
const quizData = [
  {
    q: "¿Cuál es el único método anticonceptivo que protege TANTO contra el embarazo como contra las ITS?",
    opts: ["Pastillas anticonceptivas", "Preservativo (condón)", "DIU de cobre", "Inyectable hormonal"],
    correct: 1,
    exp: "El preservativo es el único método que, usado correctamente, ofrece protección tanto contra el embarazo como contra las infecciones de transmisión sexual."
  },
  {
    q: "¿Cuánto tiempo tenés para tomar la pastilla de emergencia para que sea más efectiva?",
    opts: ["Dentro de las 24 horas", "Dentro de las 72 horas", "Dentro de los 7 días", "Solo funciona antes de la relación"],
    correct: 1,
    exp: "La anticoncepción de emergencia es más efectiva cuanto antes se toma, pero puede usarse hasta 72 horas (3 días) después de la relación. Cuanto más tiempo pasa, menos efectiva es."
  },
  {
    q: "¿Cuál de estas ITS es CURABLE con antibióticos?",
    opts: ["VIH", "Herpes genital", "VPH", "Gonorrea"],
    correct: 3,
    exp: "La gonorrea es una infección bacteriana que puede tratarse con antibióticos. El VIH, el herpes y el VPH son infecciones virales que no tienen cura, aunque sí tratamiento."
  },
  {
    q: "¿En qué porcentaje reduce el uso correcto del preservativo el riesgo de transmisión del VIH?",
    opts: ["Aproximadamente 50%", "Aproximadamente 70%", "Más del 90%", "100%"],
    correct: 2,
    exp: "El uso correcto y consistente del preservativo reduce en más del 90% el riesgo de transmisión del VIH y otras ITS de transmisión fluida."
  },
  {
    q: "¿La vacuna contra el VPH protege contra todos los tipos del virus?",
    opts: ["Sí, protege contra los más de 100 tipos", "No, protege principalmente contra los tipos de alto riesgo (16 y 18)", "Solo protege si se aplica antes de los 9 años", "No existe vacuna contra el VPH"],
    correct: 1,
    exp: "Las vacunas disponibles protegen principalmente contra los tipos 16 y 18 (responsables del 70% de los cánceres cervicales) y otros tipos que causan verrugas genitales. No cubren todos los tipos del virus."
  },
  {
    q: "¿Una persona con VIH en tratamiento antirretroviral efectivo (carga viral indetectable) puede transmitir el virus?",
    opts: ["Sí, siempre puede transmitirlo", "No, una carga viral indetectable significa intransmisible (I=I)", "Solo puede transmitirlo por sangre", "Depende del tipo de VIH"],
    correct: 1,
    exp: "El concepto I=I (Indetectable = Intransmisible) está respaldado por evidencia científica sólida. Una persona con carga viral indetectable bajo tratamiento no transmite el VIH por vía sexual."
  },
  {
    q: "¿En Argentina las pruebas de VIH en hospitales públicos son...?",
    opts: ["De pago y con derivación médica obligatoria", "Gratuitas, confidenciales y sin necesidad de derivación", "Solo para mayores de 18 años", "Disponibles solo en Buenos Aires"],
    correct: 1,
    exp: "En Argentina, por la Ley 23.798 y sus actualizaciones, las pruebas de VIH en el sistema público son gratuitas, confidenciales y no requieren derivación médica previa. Están disponibles en todo el país."
  }
];

let quizIdx = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
  const cont = document.getElementById('quiz-content');
  const fill = document.getElementById('quiz-progress-fill');
  if (quizIdx >= quizData.length) {
    fill.style.width = '100%';
    const pct = Math.round((quizScore / quizData.length) * 100);
    let msg = pct >= 80 ? '¡Excelente! Tenés muy buenos conocimientos sobre salud sexual.' : pct >= 50 ? 'Bien, pero todavía hay algo por aprender. ¡Explorá las otras secciones!' : 'Te recomendamos explorar las secciones de información para ampliar tus conocimientos.';
    cont.innerHTML = `<div class="quiz-result">
      <div class="score-circle"><span class="score-num">${quizScore}</span><span class="score-denom">de ${quizData.length}</span></div>
      <h3 style="font-size:1.2rem;margin-bottom:0.5rem">${msg}</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem">Obtuviste ${pct}% de respuestas correctas</p>
      <button class="btn btn-teal" onclick="resetQuiz()"><i class="ti ti-refresh"></i> Volver a intentar</button>
    </div>`;
    return;
  }
  fill.style.width = ((quizIdx / quizData.length) * 100) + '%';
  const q = quizData[quizIdx];
  cont.innerHTML = `
    <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1rem">Pregunta ${quizIdx + 1} de ${quizData.length}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">${q.opts.map((o, i) => `<button class="quiz-option" onclick="selectOpt(this,${i})">${o}</button>`).join('')}</div>
    <div class="quiz-feedback" id="quiz-fb"></div>
    <div class="quiz-nav">
      <span style="font-size:0.85rem;color:var(--text-muted)">Puntaje: <strong>${quizScore}</strong></span>
      <button class="btn btn-teal" id="quiz-next" onclick="nextQuestion()" style="display:none">Siguiente <i class="ti ti-arrow-right"></i></button>
    </div>`;
  quizAnswered = false;
}

function selectOpt(btn, idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);
  const q = quizData[quizIdx];
  opts[q.correct].classList.add('correct');
  const fb = document.getElementById('quiz-fb');
  if (idx === q.correct) {
    quizScore++;
    btn.classList.add('correct');
    fb.className = 'quiz-feedback show ok';
    fb.innerHTML = '<i class="ti ti-check-circle"></i> <strong>¡Correcto!</strong> ' + q.exp;
  } else {
    btn.classList.add('wrong');
    fb.className = 'quiz-feedback show fail';
    fb.innerHTML = '<i class="ti ti-x-circle"></i> <strong>Incorrecto.</strong> ' + q.exp;
  }
  document.getElementById('quiz-next').style.display = 'block';
}

function nextQuestion() {
  quizIdx++;
  renderQuiz();
}

function resetQuiz() {
  quizIdx = 0;
  quizScore = 0;
  quizAnswered = false;
  document.getElementById('quiz-progress-fill').style.width = '0%';
  renderQuiz();
}

renderQuiz();

// ---- CENTROS BUSQUEDA ----
function filtrarCentros() {
  const texto = document.getElementById('centros-search').value.toLowerCase();
  const tipo = document.getElementById('centros-tipo').value;
  document.querySelectorAll('.centro-card').forEach(c => {
    const matchTexto = !texto || c.dataset.text.includes(texto) || c.innerText.toLowerCase().includes(texto);
    const matchTipo = !tipo || c.dataset.tipo === tipo;
    c.style.display = (matchTexto && matchTipo) ? 'flex' : 'none';
  });
}

// ---- CHAT FAQ ----
const respuestasAuto = {
  "preservativo": "El preservativo es el único método que protege contra ITS y embarazo simultáneamente. Asegurate de usarlo correctamente desde el inicio hasta el final.",
  "vih": "El VIH se diagnostica con análisis de sangre gratuitos en hospitales públicos. Si tenés dudas, llamá al 0800-3333-444.",
  "embarazo": "Para prevenir un embarazo no planificado hay muchas opciones. Te recomendamos consultar la sección de Anticonceptivos y hablar con un profesional de salud.",
  "its": "Las ITS muchas veces no tienen síntomas. Hacerse pruebas regulares es la única forma de saberlo. La pestaña 'Centros de Salud' te puede ayudar a encontrar un lugar cercano.",
  "anticoncep": "Existen múltiples métodos anticonceptivos con diferentes efectividades y características. Consultá la pestaña 'Anticonceptivos' para más información.",
  "default": "Gracias por tu pregunta. Para consultas médicas personales, te recomendamos contactar un centro de salud. Podés llamar al <strong>0800-222-3444</strong> (Línea Salud Sexual, gratuita) o buscar un centro en la pestaña 'Centros de Salud'."
};

function enviarPregunta(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('chat-input');
  const texto = input.value.toLowerCase().trim();
  if (!texto) return;
  const div = document.getElementById('chat-respuesta');
  let resp = respuestasAuto.default;
  for (const [key, val] of Object.entries(respuestasAuto)) {
    if (key !== 'default' && texto.includes(key)) { resp = val; break; }
  }
  div.innerHTML = '<i class="ti ti-message-dots" style="font-size:16px"></i> ' + resp;
  div.style.display = 'block';
  input.value = '';
}