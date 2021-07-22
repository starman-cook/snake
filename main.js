'use strict'

/**
 * DONE Добавить уровни!
 * Каждый уровень будет иметь массив преград
 * Делать проверку как с яблоком, если голова попала на преграду (в создании яблока есть проверка подобная чтобы яблоко на змее не появлялось)
 * DONE добавить условия прохождения, например набрать 20 или 30 яблок, а потом прыгнуть в некий портал, который будет как яблоко рандомно появляться на карте
 * Добавить вид яблокам, чтобы это были картинки яблок, плюс голову и тело змейки
 * добавить вид поля и преград, чтобы было красиво
 * добавить может возможность регулировать ширину поля??? А ля песочница, выбираешь сколько яблок до портала, размер поля и количество преград на карте
 * NO  Может сделать все по 20 пикселей, чтобы как то виднее было?? Движения становятся капец квадратными
 *
 * Drag and drop для змеи добавить??
 *
 * DONE Управление скоростью, змейка ползет все быстрее и быстрее
 * DONE wasd в управление добавить
 * DONE Кнопку Ресет добавить и выбор уровня (указать сколько всего уровней есть)
 */

const barriers = [
    [
        {x: 150, y: 150},
        {x: 160, y: 160},
        {x: 170, y: 170},
        {x: 50, y: 50},
        {x: 60, y: 60},
    ],
        [
            {x: 40, y: 20},
            {x: 40, y: 30},
            {x: 40, y: 40},
            {x: 40, y: 50},
            {x: 40, y: 60},
            {x: 40, y: 70},
            {x: 40, y: 80},
            {x: 40, y: 90},
            {x: 40, y: 100},
            {x: 40, y: 110},
            {x: 40, y: 120},
            {x: 40, y: 130},
            {x: 40, y: 140},
            {x: 40, y: 150},
            {x: 40, y: 160},
            {x: 40, y: 170},
            {x: 160, y: 20},
            {x: 160, y: 30},
            {x: 160, y: 40},
            {x: 160, y: 50},
            {x: 160, y: 60},
            {x: 160, y: 70},
            {x: 160, y: 80},
            {x: 160, y: 90},
            {x: 160, y: 100},
            {x: 160, y: 110},
            {x: 160, y: 120},
            {x: 160, y: 130},
            {x: 160, y: 140},
            {x: 160, y: 150},
            {x: 160, y: 160},
            {x: 160, y: 170},
            ],
    [
        {x: 40, y: 20},
        {x: 60, y: 30},
        {x: 40, y: 40},
        {x: 60, y: 50},
        {x: 40, y: 60},
        {x: 60, y: 70},
        {x: 40, y: 80},
        {x: 60, y: 90},
        {x: 40, y: 100},
        {x: 60, y: 110},
        {x: 40, y: 120},
        {x: 60, y: 130},
        {x: 40, y: 140},
        {x: 60, y: 150},
        {x: 40, y: 160},
        {x: 60, y: 170},
        {x: 160, y: 20},
        {x: 140, y: 30},
        {x: 160, y: 40},
        {x: 140, y: 50},
        {x: 160, y: 60},
        {x: 140, y: 70},
        {x: 160, y: 80},
        {x: 140, y: 90},
        {x: 160, y: 100},
        {x: 140, y: 110},
        {x: 160, y: 120},
        {x: 140, y: 130},
        {x: 160, y: 140},
        {x: 140, y: 150},
        {x: 160, y: 160},
        {x: 140, y: 170},
    ],
    [
        {x: 30, y: 40},
        {x: 40, y: 40},
        {x: 50, y: 40},
        {x: 60, y: 40},
        {x: 70, y: 40},
        {x: 80, y: 40},
        {x: 90, y: 40},
        {x: 100, y: 40},
        {x: 110, y: 40},
        {x: 120, y: 40},
        {x: 130, y: 40},
        {x: 140, y: 40},
        {x: 150, y: 40},
        {x: 160, y: 40},
        {x: 90, y: 50},
        {x: 90, y: 60},
        {x: 90, y: 70},
        {x: 90, y: 80},
        {x: 90, y: 90},
        {x: 90, y: 110},
        {x: 90, y: 120},
        {x: 90, y: 130},
        {x: 90, y: 140},
        {x: 90, y: 150},
        {x: 90, y: 160},

        {x: 30, y: 180},
        {x: 40, y: 170},
        {x: 50, y: 160},
        {x: 60, y: 150},

        {x: 160, y: 180},
        {x: 150, y: 170},
        {x: 140, y: 160},
        {x: 130, y: 150},

        {x: 160, y: 60},
        {x: 150, y: 70},
        {x: 140, y: 80},
        {x: 130, y: 90},

        {x: 30, y: 60},
        {x: 40, y: 70},
        {x: 50, y: 80},
        {x: 60, y: 90},
    ],
    ]
// level 0 maxApples 5 initialSpeed 350
let level = 0
let maxApples = 10
let initialSpeed = 350
let interval
const buildField = (width, height, count, barrier) => {
    const container = document.getElementById('container')
    // container.classList.add('container')
    // container.setAttribute("id", "container")
    const btnReset = document.createElement('button')
    btnReset.innerText = "Reset game"
    btnReset.classList.add('btnReset')
    btnReset.setAttribute("id", "btnReset")
    const field = document.createElement('div')
    field.setAttribute("id", "field")
    field.style.width = `${width * 10}px`
    field.style.height = `${height * 10}px`
    field.style.backgroundColor = "lightgreen"
    field.style.margin = "0 auto"
    field.style.border = "10px solid darkgreen"
    field.style.position = "relative"
    // document.body.append(container)
    container.append(btnReset)
    container.append(field)
    document.getElementById('btnReset').addEventListener('click', () => {
        document.getElementById('field').remove()
        document.getElementById('btnReset').remove()
        document.getElementById('count').remove()
        document.getElementById('infoGame').innerText = ""
        if (interval) {
            clearInterval(interval)
        }
        startGame(width, height, count, barrier)
    })
    return field
}
const drawWorm = (w, width, height) => {
    const checkFrame = document.getElementsByClassName('frame')
    if (checkFrame.length > 0) {
        checkFrame[0].remove()
    }
    const frame = document.createElement('div')
    frame.classList.add('frame')
    frame.style.width = `${width * 10}px`
    frame.style.height = `${height * 10}px`
    for (let i = 0; i < w.length; i++) {
        const wormPart = document.createElement('div')
        if (i === 0) {
            wormPart.classList.add('activeWorm')
        } else {
            wormPart.classList.add('bodyWorm')
        }
        wormPart.style.position = 'absolute'
        wormPart.style.width = '10px'
        wormPart.style.height = '10px'
        wormPart.style.left = `${w[i].x}px`
        wormPart.style.top = `${w[i].y}px`
        frame.append(wormPart)
    }
    return frame
}
const addApple = (w, count, width, height, barrier) => {
    const frame = document.createElement('div')
    frame.style.width = `${width * 10}px`
    frame.style.height = `${height * 10}px`
    frame.style.position = 'absolute'
    frame.style.top = '0'
    frame.style.left = '0'
    const apple = document.createElement('div')
    apple.classList.add('apple')
    const x = Math.floor(Math.random() * (width - 1)) * 10
    const y = Math.floor(Math.random() * (height - 1)) * 10
    apple.style.position = 'absolute'
    apple.style.left = `${x}px`
    apple.style.top = `${y}px`
    if (count === 0) {
        apple.style.backgroundColor = "black"
        apple.style.boxShadow = "0 0 4px 2px yellow"
        apple.style.transform = "scale(1.5)"
    }
    for (let j = 0; j < w.length; j++) {
        if (w[j].x === x && w[j].y === y) {
            return addApple(w, count, width, height, barrier)
        }
    }
    for (let j = 0; j < barrier.length; j++) {
        if (barrier[j].x === x && barrier[j].y === y) {
            return addApple(w, count, width, height, barrier)
        }
    }
    apple.setAttribute("id", "apple")
    frame.append(apple)
    const countFrame = document.createElement('div')
    countFrame.innerText = count
    countFrame.setAttribute("id", "count")
    document.getElementById('container').append(countFrame)
    return { apple: frame, x: x, y: y }
}

// const addPortal = (w, count, width, height) => {
//     const frame = document.createElement('div')
//     frame.style.width = `${width * 10}px`
//     frame.style.height = `${height * 10}px`
//     frame.style.position = 'absolute'
//     frame.style.top = '0'
//     frame.style.left = '0'
//     const portal = document.createElement('div')
//     portal.classList.add('portal')
//     const x = Math.floor(Math.random() * (width - 1)) * 10
//     const y = Math.floor(Math.random() * (height - 1)) * 10
//     portal.style.position = 'absolute'
//     portal.style.left = `${x}px`
//     portal.style.top = `${y}px`
//     for (let j = 0; j < w.length; j++) {
//         if (w[j].x === x && w[j].y === y) {
//             return addPortal(w, count, width, height)
//         }
//     }
//     portal.setAttribute("id", "portal")
//     frame.append(portal)
//     const countFrame = document.createElement('div')
//     countFrame.innerText = count
//     countFrame.setAttribute("id", "count")
//     document.getElementById('container').append(countFrame)
//     return { apple: frame, x: x, y: y }
// }

const moving = (worm, apple, w, width, height, count, field, speed, dir, barrier) => {

    let keyPressed = false
    document.addEventListener('keydown', function (event) {
        if ((event.key === "ArrowLeft" || event.key === "a" || event.key === "ф")  && dir !== "right" && !keyPressed) {
            dir = "left"
            keyPressed = true
        } else if ((event.key === "ArrowRight" || event.key === "d" || event.key === "в") && dir !== "left" && !keyPressed) {
            dir = "right"
            keyPressed = true
        } else if ((event.key === "ArrowUp" || event.key === "w" || event.key === "ц") && dir !== "down" && !keyPressed) {
            dir = "up"
            keyPressed = true
        } else if ((event.key === "ArrowDown" || event.key === "s" || event.key === "ы") && dir !== "up" && !keyPressed) {
            dir = "down"
            keyPressed = true
        } else if (event.key === " ") {
            alert("pause")
        }
    });
    interval = setInterval(() => {
        let direction
        switch (dir) {
            case "left":
                direction = { ...w[0], x: w[0].x - 10 }
                keyPressed = false
                break
            case "right":
                direction = { ...w[0], x: w[0].x + 10 }
                keyPressed = false
                break
            case "up":
                direction = { ...w[0], y: w[0].y - 10 }
                keyPressed = false
                break
            case "down":
                direction = { ...w[0], y: w[0].y + 10 }
                keyPressed = false
                break
            default:
                console.log("ERROR DIRECTION")
        }
        for (let j = 1; j < w.length; j++) {
            if (w[j].x === w[0].x && w[j].y === w[0].y) {
                clearInterval(interval)
                document.getElementById('infoGame').innerText = `You ate yourself dude!`
            }
        }
        for (let k = 0; k < barrier.length; k++) {
            if (barrier[k].x === w[0].x && barrier[k].y === w[0].y) {
                clearInterval(interval)
                document.getElementById('infoGame').innerText = `You lost`
                return
            }
        }
        if (w[0].x === apple.x && w[0].y === apple.y) {
            document.getElementById('apple').remove()
            document.getElementById('count').remove()
            if (count === 0) {
                clearInterval(interval)
                document.getElementById('infoGame').innerText = `You won level`
                document.getElementById('btnLevel').classList.toggle('hidden')
                document.getElementById('btnReset').classList.toggle('hidden')
                return
            }
            count--
            apple = addApple(w, count, width, height, barrier)
            field.append(apple.apple)
            w.push(w[w.length - 1])
            if (speed > 100) {
                clearInterval(interval)
                speed -= 10
                moving(worm, apple, w, width, height, count, field, speed, dir, barrier)
            }
        }


        if (w[0].x === -10 || w[0].y === -10 || w[0].x === width * 10 || w[0].y === height * 10) {
            clearInterval(interval)
            document.getElementById('infoGame').innerText = `You lost`
        }

        w.splice(0, 0, direction)
        if (worm) {
            worm.remove()
        }
        worm = drawWorm(w, width, height)
        field.append(worm)
        w.splice(w.length - 1, 1)
    }, speed)
}
const drawBarriers = (barrier, width, height) => {
    // const checkFrame = document.getElementsByClassName('frame')
    // if (checkFrame.length > 0) {
    //     checkFrame[0].remove()
    // }
    const frame = document.createElement('div')
    // frame.classList.add('frame')
    frame.style.width = `${width * 10}px`
    frame.style.height = `${height * 10}px`
    for (let i = 0; i < barrier.length; i++) {
        const wall = document.createElement('div')
        wall.classList.add('wall')
        wall.style.position = 'absolute'
        wall.style.width = '10px'
        wall.style.height = '10px'
        wall.style.left = `${barrier[i].x}px`
        wall.style.top = `${barrier[i].y}px`
        frame.append(wall)
    }
    return { barriers: frame, arr: barrier }
}

const startGame = (width, height, count, barrier) => {
    const field = buildField(width, height, count, barrier)
    const w = [{ x: width * 5, y: height * 5 }]
    let dir = "left"
    let apple
    // let count = 0
    let speed = initialSpeed
    const barriers = drawBarriers(barrier, width, height)
    let worm = drawWorm(w, width, height)
    apple = addApple(w, count, width, height, barriers.arr)
    field.append(apple.apple)
    field.append(barriers.barriers)
    moving(worm, apple, w, width, height, count, field, speed, dir, barriers.arr)

}
document.getElementById('btnStart').addEventListener("click", () => {
    document.getElementById('btnStart').classList.toggle('hidden')
    document.getElementById('introText').classList.toggle('hidden')
    startGame(20, 20, maxApples, barriers[level])
})

document.getElementById('btnLevel').addEventListener("click", () => {
    document.getElementById('field') && document.getElementById('field').remove()
    document.getElementById('btnReset') && document.getElementById('btnReset').remove()
    document.getElementById('count') && document.getElementById('count').remove()
    document.getElementById('infoGame').innerText = ""
    if (interval) {
        clearInterval(interval)
    }
    document.getElementById('btnLevel').classList.toggle('hidden')
    level++
    maxApples += 3
    initialSpeed -= 50
    if (barriers[level]) {
        startGame(20, 20, maxApples, barriers[level])
    } else {
        alert("it was the last level, congratulations")
    }
})
