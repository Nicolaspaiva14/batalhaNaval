const boardSizeOptions = {
    easy: { size: 10, ships: 5 },
    medium: { size: 12, ships: 7 },
    hard: { size: 15, ships: 10 },
  };
  
  let currentDifficulty = "easy";
  let boardSize = boardSizeOptions[currentDifficulty].size;
  let totalShips = boardSizeOptions[currentDifficulty].ships;
  let ships = [];
  let hits = 0;
  
  const board = document.getElementById("enemy-board");
  const statusText = document.getElementById("status");
  const remainingText = document.getElementById("remaining");
  const restartBtn = document.getElementById("restart-btn");
  const difficultySelect = document.getElementById("difficulty");
  
  // Sons
  const bgMusic = document.getElementById("bg-music");
  const hitSound = document.getElementById("hit-sound");
  const missSound = document.getElementById("miss-sound");
  
  // Tocar música de fundo assim que o jogador interagir
  window.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.volume = 0.2;
      bgMusic.play();
    }
  });
  
  // Função para tocar som de acerto
  function playHitSound() {
    hitSound.currentTime = 0;  // Reseta o tempo para tocar do começo
    hitSound.play();
  }
  
  // Função para tocar som de erro
  function playMissSound() {
    missSound.currentTime = 0;  // Reseta o tempo para tocar do começo
    missSound.play();
  }
  
  function handleClick(e) {
    const index = parseInt(e.target.dataset.index);
    if (!index && index !== 0) return;
  
    if (ships.includes(index)) {
      e.target.classList.add("hit");
      playHitSound();  // Toca som de acerto
      hits++;
      ships = ships.filter(s => s !== index);
      statusText.textContent = `💥 Acertou! (${hits}/${totalShips})`;
    } else {
      e.target.classList.add("miss");
      playMissSound();  // Toca som de erro
      statusText.textContent = "🌊 Água!";
    }
  
    e.target.style.pointerEvents = "none";
    updateRemaining();
  
    if (hits === totalShips) {
      statusText.textContent = "🎉 Você venceu! Todos os navios foram afundados!";
      revealShips();
      document.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
    }
  }
  
  function createBoard() {
    board.innerHTML = "";
    document.getElementById("row-labels").innerHTML = "";
    document.getElementById("col-labels").innerHTML = "";
    document.documentElement.style.setProperty('--board-size', boardSize);
  
    board.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;
  
    const rowLabels = document.getElementById("row-labels");
    const colLabels = document.getElementById("col-labels");
  
    // Letras das colunas (A, B, C...)
    for (let c = 0; c < boardSize; c++) {
      const label = document.createElement("div");
      label.classList.add("label-cell");
      label.textContent = String.fromCharCode(65 + c); // A = 65
      colLabels.appendChild(label);
    }
  
    // Números das linhas (1, 2, 3...)
    for (let r = 0; r < boardSize; r++) {
      const label = document.createElement("div");
      label.classList.add("label-cell");
      label.textContent = r + 1;
      rowLabels.appendChild(label);
    }
  
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }
  
  function placeShips() {
    ships = [];
    while (ships.length < totalShips) {
      let pos = Math.floor(Math.random() * (boardSize * boardSize));
      if (!ships.includes(pos)) {
        ships.push(pos);
      }
    }
  }
  
  function updateRemaining() {
    const restantes = totalShips - hits;
    remainingText.textContent = `⛴️ Navios restantes: ${restantes}`;
  }
  
  function revealShips() {
    document.querySelectorAll(".cell").forEach(cell => {
      const idx = parseInt(cell.dataset.index);
      if (ships.includes(idx)) {
        cell.style.backgroundColor = "#ffc107";
      }
    });
  }
  
  function resetGame() {
    hits = 0;
    statusText.textContent = "Novo jogo iniciado!";
    boardSize = boardSizeOptions[currentDifficulty].size;
    totalShips = boardSizeOptions[currentDifficulty].ships;
    createBoard();
    placeShips();
    updateRemaining();
  }
  
  difficultySelect.addEventListener("change", (e) => {
    currentDifficulty = e.target.value;
    resetGame();
  });
  
  restartBtn.addEventListener("click", resetGame);
  
  document.addEventListener("DOMContentLoaded", resetGame);

  audio.play().catch(error => {
    console.log("Autoplay bloqueado, aguardando interação do usuário.");

   
    document.body.addEventListener("click", function tocarAudio() {
      const audio = document.getElementById("hit-sound");
      audio.currentTime = 0;
      audio.play();


        document.body.removeEventListener("click", tocarAudio);
    });
});


  
  