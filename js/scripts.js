const form = document.querySelector('form')
const weightInput = document.querySelector('#weight')
const heightInput = document.querySelector('#height')
const imc = document.querySelector('#imc')
const classification = document.querySelector('#classification')
const result = document.querySelector('#result')
const calcContainer = document.querySelector('#calc-container')
const err = document.querySelector('#error')

weightInput.focus()


form.addEventListener('submit', e => {
    e.preventDefault()

    resultImc()
})

const resultImc = () => {

    const weight = Number(weightInput.value)
    const height = Number(heightInput.value)

    if (!weight || weight > 200) {
        valid('Peso inválido', false)
        return
    }

    if (!height || height > 2.50) {
        valid('Altura inválida', false)
        return
    }



    const imcResult = calculateImc(weight, height)
    const classificationResult = getClassification(imcResult)

    imc.innerHTML = imcResult
    classification.innerHTML = classificationResult
    result.style.display = 'block'
    calcContainer.style.display = 'none'
}


const calculateImc = (weight, height) => {
    const imc = weight / (height ** 2)
    return imc.toFixed(2)
}

const getClassification = (imc) => {
    let text = ''

    if (imc <= 18.5) return text = 'Abaixo do peso'
    if (imc >= 18.5 && imc <= 24.9) return text = 'Peso normal'
    if (imc >= 25 && imc <= 29.9) return text = 'Sobrepeso'
    if (imc >= 30 && imc <= 34.9) return text = 'Obesidade Grau I'
    if (imc >= 35 && imc < 39.9) return text = 'Obesidade Grau II'
    if (imc > 39.9) return text = 'Obesidade Grau III'
}

const back = () => {
    result.style.display = 'none'
    calcContainer.style.display = 'block'
    weightInput.value = ''
    heightInput.value = ''
    valid('', true)
    weightInput.focus()
}

const valid = (msg, isValid) => {

    const err = document.querySelector('.error')
    err.innerText = ''

    const p = document.createElement('p')

    if (!isValid) {
        p.classList.add = 'error'
    } 

    p.innerHTML = msg

    err.appendChild(p)
}


const validDigits = text => {
    return text.replace(/[^0-9.]/g, '')
}



[heightInput, weightInput].forEach(el => {
    el.addEventListener('input', e => {
        const updateValue = validDigits(e.target.value)

        e.target.value = updateValue
    })
})


