
/**
 * @description Objeto contendo todos os métodos necessários para as funções CRUD 
 * do Model
 */
export const taskModel = {
    /**
     * @returns {string[]} todas as tarefas contidas no Array do DB
     */
    getTasks: function () {
        
        // Busca o Item 'tasks' no LocalStorage / DB
        let tasks = localStorage.getItem('tasks');

        // Caso haja o item ele é retornado, 
        // caso o contrário um array vazio é retornado
        return tasks ? JSON.parse(tasks) : [];
    },

    /**
     * @description Adiciona uma tarefa ao DB
     * @param {string} task String que descreve a tarefa
     */
    addTask: function (task) {

        // Todas as tarefas contidas no DB são armazenadas em uma variável
        const tasks = this.getTasks();

        // A nova tarefa é colocada no Array de Tarefas
        tasks.push(task);

        // O Array é atualizado no DB / localStorage e serializado
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    /**
     * @description Deleta a tarefa do DB 
     * @param {number} index Index da Tarefa que será deletada
     */
    deleteTask: function (index) {

        // Todas as tarefas contidas no DB são armazenadas em uma variável
        let tasks = this.getTasks();
        
        // Remove a tarefa usando seu Index no Array de Tarefas
        tasks.splice(index, 1);

        // O Array é atualizado no DB / localStorage e serializado
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    /**
     * @description Atualiza a tarefa no DB
     * @param {number} index Index da Tarefa que será atualizada
     * @param {string | number} updatedTask Novo valor da tarefa
     */
    updateTask: function (index, updatedTask) {
        // Todas as tarefas contidas no DB são armazenadas em uma variável
        let tasks = this.getTasks();

        // Sobrescreve o valor antigo da tarefa com o novo usando seu Index
        tasks[index] = updatedTask;
        
        // O Array é atualizado no DB / localStorage e serializado
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },  
};