// ================== EXERCISE 1: ORDER THE DIALOGUE ================== //
const dialogosCorrectos = [
  {
    id: 1,
    texto: `
<strong>Interviewer:</strong> Good morning, Lourdes. Thank you for coming today. Could you tell us a bit about yourself and why you are interested in this position?<br><br>
<strong>Lourdes:</strong> Good morning, and thank you for the opportunity. I am an advanced student in the Mathematics Teaching Program at CFE, and I also have a background in engineering. I am passionate about education and eager to apply my knowledge while continuing to learn in this field.
`
  },
  {
    id: 2,
    texto: `
<strong>Interviewer:</strong> What experience do you have working with teenagers?<br><br>
<strong>Lourdes:</strong> I have given private math lessons to high school students from 1st to 6th year, which allowed me to understand different learning styles. I also participated in a school support program in my community.
`
  },
  {
    id: 3,
    texto: `
<strong>Interviewer:</strong> This role includes supporting the lead teacher and helping with lesson planning. How do you feel about teamwork?<br><br>
<strong>Lourdes:</strong> I really enjoy working in teams. I believe we grow a lot through collaboration. I am used to sharing ideas, receiving feedback, and adapting activities to meet students' needs.
`
  },
  {
    id: 4,
    texto: `
<strong>Interviewer:</strong> What would you do if a student feels frustrated because they don’t understand a math problem?<br><br>
<strong>Lourdes:</strong> I would first help the student calm down and remind them that making mistakes is part of learning. Then, I would try a different approach—maybe using visuals, games, or real-life examples to help them understand.
`
  },
  {
    id: 5,
    texto: `
<strong>Interviewer:</strong> Finally, what do you hope to gain from this experience?<br><br>
<strong>Lourdes:</strong> I hope to grow as a professional, gain real classroom experience, and improve my teaching strategies. I am also excited to learn from experienced teachers and get to know the students.
`
  }
];

function mezclar(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderizarDialogos() {
  const contenedor = document.getElementById('dialogos');
  contenedor.innerHTML = '';
  const mezclados = mezclar(dialogosCorrectos);
  mezclados.forEach(bloque => {
    const div = document.createElement('div');
    div.className = 'bloque';
    div.draggable = true;
    div.dataset.id = bloque.id;
    div.innerHTML = bloque.texto;
    contenedor.appendChild(div);
  });
  agregarDragAndDrop();
}

function agregarDragAndDrop() {
  const bloques = document.querySelectorAll('.bloque');
  let bloqueArrastrado = null;

  bloques.forEach(bloque => {
    bloque.addEventListener('dragstart', (e) => {
      bloqueArrastrado = bloque;
      bloque.classList.add('dragging');
    });

    bloque.addEventListener('dragend', (e) => {
      bloqueArrastrado = null;
      bloque.classList.remove('dragging');
      bloques.forEach(b => b.classList.remove('over'));
    });

    bloque.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    bloque.addEventListener('dragenter', (e) => {
      if (bloque !== bloqueArrastrado) {
        bloque.classList.add('over');
      }
    });

    bloque.addEventListener('dragleave', (e) => {
      bloque.classList.remove('over');
    });

    bloque.addEventListener('drop', (e) => {
      e.preventDefault();
      if (bloque !== bloqueArrastrado) {
        const contenedor = document.getElementById('dialogos');
        let bloquesActuales = Array.from(contenedor.children);
        let arrastradoIdx = bloquesActuales.indexOf(bloqueArrastrado);
        let objetivoIdx = bloquesActuales.indexOf(bloque);
        if (arrastradoIdx < objetivoIdx) {
          contenedor.insertBefore(bloqueArrastrado, bloque.nextSibling);
        } else {
          contenedor.insertBefore(bloqueArrastrado, bloque);
        }
      }
      bloque.classList.remove('over');
    });
  });
}

// MODAL: show/hide, always shows same message
function showCongrats() {
  document.getElementById('congrats-modal').classList.add('active');
}
function hideCongrats() {
  document.getElementById('congrats-modal').classList.remove('active');
}

// Visual and textual feedback
function revisarDialogo() {
  const bloques = document.querySelectorAll('.bloque');
  let correcto = true;
  bloques.forEach((bloque, idx) => {
    bloque.classList.remove('correcto', 'incorrecto');
    if (parseInt(bloque.dataset.id, 10) === dialogosCorrectos[idx].id) {
      bloque.classList.add('correcto');
    } else {
      bloque.classList.add('incorrecto');
      correcto = false;
    }
  });
  const resultado = document.getElementById('resultado');
  if (correcto) {
    resultado.textContent = 'Correct! You have ordered the dialogue successfully.';
    resultado.style.color = '#34a853';
    showCongrats();
  } else {
    resultado.textContent = 'The order is not correct. Red blocks are misplaced. Try again.';
    resultado.style.color = '#ea4335';
  }
}

function reiniciarDialogo() {
  renderizarDialogos();
  document.getElementById('resultado').textContent = '';
  hideCongrats();
}

// ================== EXERCISE 2: FILL IN THE BLANKS ================== //

const fillTextTemplate = `
<b>JOB OFFER</b><br>
<b><span class="blank" data-answer="MATHEMATICS" title="Double-click to clear"></span> TEACHING ASSISTANT</b><br>
Institution: <span class="blank" data-answer="Horizon Private School" title="Double-click to clear"></span><br>
Location: <span class="blank" data-answer="Paysandú, Uruguay" title="Double-click to clear"></span><br>
Type: <span class="blank" data-answer="Part-time, On-site" title="Double-click to clear"></span><br>
Level: <span class="blank" data-answer="Lower Secondary (Grades 7-9)" title="Double-click to clear"></span><br>
Responsibilities:<br>
- Assist the lead teacher in <span class="blank" data-answer="lower secondary classes" title="Double-click to clear"></span> <br>
- Help students with <span class="blank" data-answer="learning difficulties" title="Double-click to clear"></span><br>
- Contribute to planning and review of <span class="blank" data-answer="exercises" title="Double-click to clear"></span><br>
- Attend <span class="blank" data-answer="pedagogical meetings" title="Double-click to clear"></span> and school initiatives.<br>
- Foster interest in mathematics through participatory <span class="blank" data-answer="dynamics" title="Double-click to clear"></span>.<br>
`;

const palabras = [
  "Horizon Private School", "Paysandú, Uruguay", "Part-time, On-site", "Lower Secondary (Grades 7-9)", 
  "lower secondary classes", "learning difficulties", "exercises", "pedagogical meetings", "dynamics", "MATHEMATICS"
];

// Shuffle words
function mezclarPalabras(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Render fill in the blanks
function renderizarFillBlanks() {
  document.getElementById('fill-blanks-text').innerHTML = fillTextTemplate;
  const bank = document.getElementById('words-bank');
  bank.innerHTML = '';
  mezclarPalabras(palabras).forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'word';
    span.draggable = true;
    span.style.visibility = 'visible';
    bank.appendChild(span);
  });
  agregarDragAndDropBlanks();
  document.getElementById('feedback-blanks').textContent = '';
}

function agregarDragAndDropBlanks() {
  let palabraArrastrada = null;

  document.querySelectorAll('.word').forEach(word => {
    word.addEventListener('dragstart', (e) => {
      palabraArrastrada = word;
      word.classList.add('dragging');
    });
    word.addEventListener('dragend', (e) => {
      palabraArrastrada = null;
      word.classList.remove('dragging');
    });
  });
  document.querySelectorAll('.blank').forEach(blank => {
    blank.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    blank.addEventListener('dragenter', (e) => {
      blank.classList.add('over');
    });
    blank.addEventListener('dragleave', (e) => {
      blank.classList.remove('over');
    });
    blank.addEventListener('drop', (e) => {
      e.preventDefault();
      if (palabraArrastrada) {
        // Return previous word to bank if there was one
        let previousText = blank.textContent;
        if (previousText && previousText.trim() !== "") {
          document.querySelectorAll('.word').forEach(word => {
            if (word.textContent === previousText) word.style.visibility = 'visible';
          });
        }
        blank.textContent = palabraArrastrada.textContent;
        blank.classList.add('filled');
        blank.classList.remove('incorrect');
        palabraArrastrada.style.visibility = 'hidden';
      }
      blank.classList.remove('over');
    });
    // Allow double-click to clear the blank and return word to bank
    blank.addEventListener('dblclick', (e) => {
      let text = blank.textContent;
      document.querySelectorAll('.word').forEach(word => {
        if (word.textContent === text) word.style.visibility = 'visible';
      });
      blank.textContent = '';
      blank.classList.remove('filled', 'incorrect');
    });
  });
}

function comprobarBlanks() {
  let correctas = 0, total = 0;
  document.querySelectorAll('.blank').forEach(blank => {
    total++;
    blank.classList.remove('incorrect');
    if (blank.textContent.trim() === blank.getAttribute('data-answer')) {
      blank.classList.add('filled');
    } else {
      blank.classList.add('incorrect');
      blank.classList.remove('filled');
    }
    if (blank.classList.contains('filled')) correctas++;
  });
  let feedback = document.getElementById('feedback-blanks');
  if (correctas === total) {
    feedback.textContent = 'Correct! You have completed the job offer successfully.';
    feedback.style.color = '#34a853';
    showCongrats();
  } else {
    feedback.textContent = 'There are still errors. Blanks in red are incorrect.';
    feedback.style.color = '#ea4335';
  }
}

// RESET FUNCTION FOR EXERCISE 2
function reiniciarBlanks() {
  renderizarFillBlanks(); // Reset blanks and mixed words
  hideCongrats();
}

// MODAL: close by clicking X or outside the modal
document.addEventListener('DOMContentLoaded', () => {
  renderizarDialogos();
  renderizarFillBlanks();
  document.getElementById('comprobar').onclick = revisarDialogo;
  document.getElementById('reiniciar').onclick = reiniciarDialogo;
  document.getElementById('comprobar-blanks').onclick = comprobarBlanks;
  document.getElementById('reiniciar-blanks').onclick = reiniciarBlanks;
  document.getElementById('close-modal').onclick = hideCongrats;
  document.getElementById('congrats-modal').onclick = function(e) {
    if (e.target === this) hideCongrats();
  };
});