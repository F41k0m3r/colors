const columns = document.querySelectorAll('.column')
document.addEventListener('keydown', event => {
    event.preventDefault()
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node =
            event.target.tagName.toLowerCase() === 'i'
                ? event.target
                : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyColor(event.target.textContent)
    }
})

function generateRandomColor(){
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random()*hexCodes.length)]
    }
    return '#'+color
}
function copyColor(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial, index){
    const colors = isInitial ? getColorFromHash() : []
    columns.forEach(column=>{
        const button = column.querySelector('button')
        const text = column.querySelector('h2')
        const isLocked = column.querySelector('i').classList.contains('fa-lock')

        if (isLocked){
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColor()
            :generateRandomColor()
        if (!isInitial){
            colors.push(color)
        }

        colors.push(color)
        column.style.background = color
        text.textContent = color

        setTextColor(button, color)
        setTextColor(text, color)
    })
    updateColorsHash(colors)
}
function setTextColor(text, color){
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors) {
    console.log(colors.map(column => column.toString().substring(1)).join('-'))
    document.location.hash = colors.map(column => column.toString().substring(1)).join('-')
}
function getColorFromHash(){
    if(document.location.hash.length > 1) {
        document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }
    return []
}

setRandomColors(true)