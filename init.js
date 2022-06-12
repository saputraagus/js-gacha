// declaring element
const username = document.getElementById("username")
const registerForm = document.getElementById("registerForm")
const title = document.getElementById("title")
const logoutForm = document.getElementById("logoutForm")
const startSection = document.getElementById("start")
const rewardSection = document.getElementById("reward")
const topDirection = document.getElementById("top")
const box1 = document.getElementById("box1")
const box2 = document.getElementById("box2")
const box3 = document.getElementById("box3")
const rewardImage = document.getElementById("imgReward")
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")
const notification = document.getElementById("notification")

const player = new Player()
let default_option = ['😍', '🤣', '😱']
box1.textContent = default_option[0]
box2.textContent = default_option[1]
box3.textContent = default_option[2]

let rolling = null

function dice() {
  let gacha = []
  for (let i = 0; i < default_option.length; i++) {
    const roll = default_option[Math.floor(Math.random() * default_option.length)]
    gacha.push(roll)
  }
  return gacha
}

function reward() {
  fetch('https://zoo-animal-api.herokuapp.com/animals/rand').then(x => x.json()).then(result => {
    console.log('reward buat anda', result)
    // set nama
    let text = document.createElement('h1')
    text.textContent = result.name

    // set gambar reward
    let img = new Image(200, 200)
    img.src = result.image_link

    // set element
    rewardImage.appendChild(img)
    rewardImage.appendChild(text)
  })
}

function winner() {
  if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) {
    reward()
    rewardSection.style.display = "block"
    location.href = "#reward"
  } else {
    console.log('lose')
    let notif = document.createElement('h1')
    // notif.textContent = 'YOU LOSE! 👎 CLICK START BUTTON TO TRY AGAIN'
    // notification.appendChild(notif)
    notification.innerHTML = 'YOU LOSE! 👎 CLICK START BUTTON TO TRY AGAIN'
  }
}

function start() {
  notification.innerHTML = ''
  startButton.style.display = "none"
  stopButton.style.display = "block"

  //selama
  rolling = setInterval(function () {
    const result = dice()
    box1.textContent = result[0]
    box2.textContent = result[1]
    box3.textContent = result[2]
  }, 100);
  
  //ketika
  setTimeout(function () {
    clearInterval(rolling)
    winner()
    startButton.style.display = "block"
    stopButton.style.display = "none"
  }, 3000);
}

function stop() {
  startButton.style.display = "block"
  stopButton.style.display = "none"
  clearInterval(rolling)
  winner()
}

onload = function () {
  const token = sessionStorage.getItem('token')

  if (token && token != null) {
    registerForm.style.display = "none"
    logoutForm.style.display = "block"
    stopButton.style.display = "none"
    startSection.style.display = "block"
    rewardSection.style.display = "block"
    topDirection.style.display = "flex"
  } else {
    registerForm.style.display = "block"
    logoutForm.style.display = "none"
    stopButton.style.display = "none"
    startSection.style.display = "none"
    rewardSection.style.display = "none"
    topDirection.style.display = "none"
  }
}

function register() {
  player.username = username.value
  player.register
  startSection.style.display = "block"
  rewardSection.style.display = "block"
  topDirection.style.display = "flex"
  rewardSection.style.display = "none"
}

function logout() {
  player.logout
}