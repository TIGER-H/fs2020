const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            // console.log(action.data.value);
            return action.data.value
        default:
            return state
    }
}

export const setFilter = (value) => ({
    type: 'FILTER',
    data: {value}
})

export default filterReducer