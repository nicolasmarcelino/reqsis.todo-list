const input = document.getElementById('novaTarefa');
const btnAdd = document.getElementById('btnAdd');
const lista = document.getElementById('listaTarefas'); // your UL/OL
const msgErro = document.getElementById('msgErro'); // error message container
const limiteTarefas = 10; // example

// Função para criar <li> + botão remover
function criarItem(tarefa) {
  const li = document.createElement('li');
  li.textContent = tarefa;

  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Delete';

  btnRemover.addEventListener('click', () => {
    const confirmed = confirm("Confirmar exclusão da tarefa?");
    if (confirmed) {
      lista.removeChild(li);
      localStorage.removeItem(tarefa); // remove do localStorage
      msgErro.textContent = '';
    }
  });

  li.appendChild(btnRemover);
  lista.appendChild(li);
}

// Adicionar tarefa
function adicionarTarefa() {
  const tarefa = input.value.trim();

  if (tarefa === '') {
    msgErro.textContent = 'Digite sua tarefa';
    return;
  }

  const tarefasAtuais = lista.getElementsByTagName('li').length;

  if (tarefasAtuais >= limiteTarefas) {
    msgErro.textContent = `Você atingiu o limite de ${limiteTarefas} tarefas.`;
    return;
  }

  msgErro.textContent = '';

  criarItem(tarefa);

  // grava no localStorage (key = value = tarefa)
  localStorage.setItem(tarefa, tarefa);

  input.value = '';
}

// Clique no botão
btnAdd.addEventListener('click', adicionarTarefa);

// Enter no input = clique
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    btnAdd.click();
  }
});

// Recuperar tarefas salvas ao carregar a página
window.onload = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const tarefa = localStorage.getItem(key);
    criarItem(tarefa);
  }
};
