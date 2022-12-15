const passwordLengthRange = document.querySelector(".passwordLengthContainer input")
const passwordLenghtRangeShow = document.querySelector(".rangeShow")
const generateButton = document.querySelector(".generateButton")
const options = document.querySelectorAll(".option input")
const password = document.querySelector(".resultContainer input")
const passwordStrengthIndicator = document.querySelector(".passwordStrengthIndicator")
const copyIcon = document.querySelector(".resultContainer img")
const characters = {
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbols: "^!&|[](){}:;.,*+-#@<>~",
    excludeDuplicate: false,
    spaces: " "
}

function passwordStrengthIndicatorUpdate () {
    passwordStrengthIndicator.id = passwordLengthRange.value <= 8 ? "weak" : passwordLengthRange.value <= 16 ? "medium" : "strong"
}

function updateSlider () {
    passwordLenghtRangeShow.textContent = passwordLengthRange.value
    passwordStrengthIndicatorUpdate()
    generatePassword()
}

function generatePassword () {
    let staticPassword = ""
    let randomPassword = ""

    options.forEach(option => {
        if(option.checked) {
            if(option.id !== "excludeDuplicate" && option.id !== spaces) {
                staticPassword += characters[option.id]
            } else if (option.id === "spaces") {
                staticPassword += ` ${staticPassword} `
            } else {
                excludeDuplicate = true
            }
        }
    })
    
    for (let i = 0; i < passwordLengthRange.value; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar === " " ? randomPassword += randomChar : i--
        } else {
            randomPassword += randomChar
        }
    }
    password.value = randomPassword
}

function copyPassword () {
    navigator.clipboard.writeText(password.value)
    copyIcon.src = "./assets/copied.svg"
    setTimeout(() => {
        copyIcon.src = "./assets/copy.svg"
    }, 1500)
}

passwordLengthRange.addEventListener("input", updateSlider)
generateButton.addEventListener("click", generatePassword)
copyIcon.addEventListener("click", copyPassword)