const checkBoxList = document.querySelectorAll('.custon-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const progressLabel= document.querySelector('.progress-label');
const errorLabel = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');


const allQuotes = [
    'Raise the bar by completing your goals',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    }
}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalsCount * 100) / 3}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3completed`
progressLabel.innerText=allQuotes[completedGoalsCount]

checkBoxList.forEach((checkBox, index) => {
    checkBox.addEventListener('click', (e) => {

        const allGoalAdded = [...inputFields].every(function (input) {
            // console.log(input.value)
            return input.value
        })
        // console.log(allGoalAdded)
        if (allGoalAdded) {
            checkBox.parentElement.classList.toggle('Completed')
            const inputId = checkBox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${(completedGoalsCount * 100) / 3}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3completed`
            progressLabel.innerText=allQuotes[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            progressBar.classList.add('show-error')
        }

    })
})

inputFields.forEach((input) => {
    // console.log(allGoals[input.id])
    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('Completed')
    }
    input.value = allGoals[input.id].name
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name=input.value

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})


