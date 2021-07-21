'use strict'
alert("Get ready to play! Press arrows to control the snake, pres spacebar to pause the game. Have fun!")
let interval
let intervalApple
const buildField = (width, height) => {
    const field = document.createElement('div')
    field.style.width = `${width * 10}px`
    field.style.height = `${height * 10}px`
    field.style.backgroundColor = "lightgreen"
    field.style.margin = "0 auto"
    field.style.border = "10px solid darkgreen"
    field.style.position = "relative"
    document.body.append(field)
    return field
}
const drawWorm = (w, width, height) => {
    const frame = document.createElement('div')
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
const addApple = (w, count, width, height) => {
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
    for (let j = 0; j < w.length; j++) {
        if (w[j].x === x && w[j].y === y) {
            return addApple(w, count, width, height)
        }
    }
    apple.setAttribute("id", "apple")
    frame.append(apple)
    const countFrame = document.createElement('div')
    countFrame.innerText = count
    countFrame.setAttribute("id", "count")
    document.body.append(countFrame)
    return { apple: frame, x: x, y: y }
}
const startGame = (width, height) => {
    const field = buildField(width, height)
    const w = [{ x: width * 5, y: height * 5 }]
    let dir = "left"
    document.addEventListener('keydown', function (event) {
        if (event.key === "ArrowLeft" && dir !== "right") {
            dir = "left"
        } else if (event.key === "ArrowRight" && dir !== "left") {
            dir = "right"
        } else if (event.key === "ArrowUp" && dir !== "down") {
            dir = "up"
        } else if (event.key === "ArrowDown" && dir !== "up") {
            dir = "down"
        } else if (event.key === " ") {
            alert("pause")
        }
    });
    let worm
    let apple
    let count = 0
    apple = addApple(w, count, width, height)
    field.append(apple.apple)

    interval = setInterval(() => {
        let direction
        switch (dir) {
            case "left":
                direction = { ...w[0], x: w[0].x - 10 }
                break
            case "right":
                direction = { ...w[0], x: w[0].x + 10 }
                break
            case "up":
                direction = { ...w[0], y: w[0].y - 10 }
                break
            case "down":
                direction = { ...w[0], y: w[0].y + 10 }
                break
            default:
                console.log("ERROR DIRECTION")
        }
        for (let j = 1; j < w.length; j++) {
            if (w[j].x === w[0].x && w[j].y === w[0].y) {
                clearInterval(interval)
                alert(`You ate yourself dude! And earned ${count} points`)
            }
        }
        if (w[0].x === apple.x && w[0].y === apple.y) {
            document.getElementById('apple').remove()
            document.getElementById('count').remove()
            count++
            apple = addApple(w, count, width, height)
            field.append(apple.apple)
            w.push(w[w.length - 1])
        }


        if (w[0].x === -10 || w[0].y === -10 || w[0].x === width * 10 || w[0].y === height * 10) {
            clearInterval(interval)
            alert(`You lost, and earned ${count} points`)
        }
        w.splice(0, 0, direction)
        if (worm) {
            worm.remove()
        }
        worm = drawWorm(w, width, height)
        field.append(worm)
        w.splice(w.length - 1, 1)
    }, 100)


}
startGame(20, 20)