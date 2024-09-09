import { taskModel } from "../Model/model.js";

let taskDisplayClasses = 
`
flex-auto content-center justify-center
px-4
rounded
`

let taskClasses = 
`
transition container content-evenly 
justify-evenly flex gap-2
p-2 hover:text-stone-500 odd:bg-stone-100 
even:bg-stone-300
`

let delBtnClasses = 
`
transition bg-transparent 
hover:bg-red-500 text-red-700 
font-semibold hover:text-white 
py-1 px-3 border border-red-500 
hover:border-transparent rounded
`

let editBtnClasses = 
`
transition bg-transparent hover:bg-amber-500
text-amber-700 font-semibold hover:text-white
py-1 px-3 border border-amber-500 hover:border-transparent
rounded
`


/**
 * @description Objeto contendo todos os métodos necessários para as funções CRUD 
 * do Controller
 */
export const appController = {
    /**
     * @description Inicia a aplicação chamando o método renderTasks
     */
    init: function () {
        this.renderTasks();
    },

    /**
     * @description Renderiza na tela as tarefas armazenadas no DB
     */
    renderTasks: function () {
        
        // Busca todas as tarefas do DB acessando o método getTasks do Model
        // e as armazena em uma variável
        const tasks = taskModel.getTasks();

        // Pega a tag ul (lista não ordenada) da VIEW e iguala seu valor a 'vazio'
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        // Para cada tarefa que há no DB é gerado
        // um item de lista, onde o nome da tarefa é passado juntamente com
        // seu INDEX no array de tarefas para as funções deleteTask e editTask do Controller
        tasks.forEach((task, index) => {
            
            // Cria um item de lista 
            const li = document.createElement('li');
            li.setAttribute("class", taskClasses)

            // Cria a tag P que exibe o nome
            const p = document.createElement('p');
            p.innerHTML = `${task}`;
            p.setAttribute("class", taskDisplayClasses);



            // Cria botão de exclusão da tarefa
            const delBtn = document.createElement('button')
            delBtn.innerText = "Excluir"
            delBtn.setAttribute("class", delBtnClasses)

            // Cria botão de edição da tarefa
            const editBtn = document.createElement('button')
            editBtn.innerText = "Editar"
            editBtn.setAttribute("class", editBtnClasses)

            li.appendChild(p);
            li.appendChild(editBtn);
            li.appendChild(delBtn);

            delBtn.addEventListener("click", () => {
                appController.deleteTask(index)
                delBtn.removeEventListener("click", () => {})
            })

            editBtn.addEventListener("click", () => {
                appController.editTask(index)
                editBtn.removeEventListener("click", () => {})
            })

            // Adiciona o item à Lista não Ordenada na VIEW
            taskList.appendChild(li);
        });
    },

    /**
     * @description Adiciona uma nova tarefa na View
     */
    addTask: function () {

        // Pega a tag Input na VIEW
        const taskInput = document.getElementById('taskInput');

        // Remove os espaços em branco do início e do fim
        // do valor passado pelo usuário
        const task = taskInput.value.trim();

        // Trata um possível erro, onde não houve um valor na entrada do usuário
        if (task) {
            // Chama o método addTask do Model passando o valor da entrada do usuário
            taskModel.addTask(task);

            // Zera o valor do campo de entrada do usuário
            taskInput.value = '';

            // Renderiza novamente a VIEW exibindo as tarefas existentes
            this.renderTasks();
        } 
        // Exibe uma mensagem de alerta
        else 
        {
            alert("Digite a tarefa que deseja adicionar!")
        }
    },

    /**
     * @description Deleta a tarefa recebendo seu Index como parâmetro
     * @param {number} index Index da tarefa no Array de Tarefas armazenado no DB
     */
    deleteTask: function (index) {
        // Chama o método addTask do Model passando o index da tarefa
        taskModel.deleteTask(index);

        // Renderiza novamente a VIEW exibindo as tarefas existentes
        this.renderTasks();
    },

    /**
     * @description Aceita uma entrada do usuário para modificar uma tarefa existente
     * por meio de seu Index
     * @param {number} index Index da tarefa no Array de Tarefas armazenado no DB
     */
    editTask: function (index) {
        // Chama o método getTasks do Model e armazena o resultado em uma variável
        const tasks = taskModel.getTasks();

        // Aceita uma nova entrada do usuário para ser o novo valor da Tarefa
        // sendo editada no momento
        const newTask = prompt('Editar tarefa:', tasks[index]);

        // Trata o possível erro de um valor NULL ter sido passado
        if (newTask) {
            // Chama o método updateTask do Model
            taskModel.updateTask(index, newTask);

            // Renderiza novamente a VIEW exibindo as tarefas existentes
            this.renderTasks();
        }
        // Exibe uma mensagem de alerta
        else 
        {
            alert("Nenhum valor inserido!")
        }
    }
};

// Inicializa o app
appController.init();