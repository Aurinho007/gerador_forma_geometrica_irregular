let medida_lado = 150

let x = 200 
let y = 200 

let vertices = []

let angulo_atual = 0

document.querySelector('#gerar').addEventListener('click', (e) => {
    e.preventDefault()
    let input = document.querySelector('.input')
    let qnt_lado = parseInt(input.value)
    geraAngulosInternos(qnt_lado)

    input.value=''
    input.focus()
})

document.querySelector('#limpar').addEventListener('click', () => location.reload())

function geraAngulosInternos(qnt_lado){
    let angulos = []
    let angulo_ideal = 360/(qnt_lado)

    for(let i = 0; i < qnt_lado; i++) angulos.push(angulo_ideal)

    for(let i = 0; i < qnt_lado; i++){
        if(i+1 === qnt_lado) {
            break
        }
        
        let limite_inferior = angulos[i] * -0.9; 
        let limite_superior = angulos[i] * 0.9;
        
        let valor = Math.random() * (limite_superior - limite_inferior + 1) + limite_inferior

        angulos[i] += valor;

        if(i+1 < qnt_lado) {
            angulos[i+1] += valor * -1 
        }
    };

    desenha(qnt_lado, angulos)
}

function calcDx(angulo_atual){
    let dx = medida_lado * Math.cos(angulo_atual*0.0174533)
    return dx
}

function calcDy(angulo_atual){
    let dy = medida_lado * Math.sin(angulo_atual*0.0174533)
    return dy
}

let canva = document.querySelector('#canvas')
let gx = canva.getContext('2d')

gx.moveTo(x, y)

function desenha(qnt_lado, angulos){
    for(let i = 0;i<qnt_lado;i++){
        gx.beginPath()
        gx.lineTo(x-calcDx(angulo_atual), y-calcDy(angulo_atual))
        gx.moveTo(x, y)
        vertices.push([x-calcDx(angulo_atual), y-calcDy(angulo_atual)])
        angulo_atual += angulos[i]
    }
    gx.moveTo(vertices[0][0], vertices[0][1])
    
    for(let i = 0; i < vertices.length; i++) {
        gx.lineTo(vertices[i][0], vertices[i][1])
    }
    
    gx.lineTo(vertices[0][0],vertices[0][1] )
    gx.strokeStyle = '#F5CB5C'
    gx.fillStyle = '#F5CB5C'
    gx.lineWidth = 3
    gx.stroke() 
    gx.fill()

}







