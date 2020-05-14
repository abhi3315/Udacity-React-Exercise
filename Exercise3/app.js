//Action types
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const RECEIVE_DATA = 'RECEIVE_DATA'

//Action Creator functions
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function receiveDataAction(todos, goals) {
    return {
        type: RECEIVE_DATA,
        todos,
        goals
    }
}

function handleInitialData() {
    return (dispatch) => {
        Promise.all([
            API.fetchTodos(),
            API.fetchGoals()]).then(([todos, goals]) => {
                dispatch(receiveDataAction(todos, goals))
            })
    }
}

function handleAddTodo(name, cb) {
    return (dispatch) => {
        return API.saveTodo(name)
            .then(todo => {
                dispatch(addTodoAction(todo))
                cb()
            })
            .catch(() => alert("Something went wrong! Try again later"))
    }
}

function handleToggleTodo(id) {
    return (dispatch) => {
        dispatch(toggleTodoAction(id))

        return API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodoAction(id))
                alert("Something went wrong! Try again later")
            })
    }
}

function handleDeleteTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodoAction(todo.id))

        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodoAction(todo))
                alert("Something went wrong! Try again later")
            })
    }
}

function handleAddGoal(name, cb) {
    return (dispatch) => {
        return API.saveGoal(name)
            .then((goal) => {
                dispatch(addGoalAction(goal))
                cb()
            })
            .catch(() => alert("Something went wrong! Try again later"))
    }
}

function handleDeleteGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoalAction(goal.id))

        return API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoalAction(goal))
                alert("Something went wrong! Try again later")
            })
    }
}

//App functions/reducers
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete }))
        case RECEIVE_DATA:
            return action.todos
        default:
            return state
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        case RECEIVE_DATA:
            return action.goals
        default:
            return state
    }
}

function loading(state = true, action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return false
        default:
            return state
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}