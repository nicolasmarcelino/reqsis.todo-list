const limiteTarefas = 10;
const input = document.getElementById('novaTarefa');
const btnAdd = document.getElementById('btnAdd');
const lista = document.getElementById('listaTarefas');
const msgErro = document.getElementById('msgErro');

btnAdd.addEventListener('click', () => {
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

  const li = document.createElement('li');
  li.textContent = tarefa;

  // Cria botão remover
  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Delete';
  btnRemover.addEventListener('click', () => {
    const confirmed = confirm("Confirmar exclusão da tarefa?");
    if (confirmed) {
      lista.removeChild(li);
      msgErro.textContent = ''; // limpa mensagem se houver
    } else {
      confirmed = null
      return;
    }
  });

  li.appendChild(btnRemover);
  lista.appendChild(li);

  input.value = '';
});