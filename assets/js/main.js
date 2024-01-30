window.addEventListener('load', () => {
  const game = new Game('main-canvas', 1, 'btn-start-game');
  window.game = game;

  const startGameBtn = document.getElementById('btn-start-game');
  startGameBtn.addEventListener('click', () => {
    const startPanel = document.getElementById('start-panel');

    startPanel.classList.add('hidden');
    
    const gamePanel = document.getElementById('game-panel');
    gamePanel.classList.remove('hidden');

    game.start(); 
    

    document.addEventListener('click', (event) => game.onMouseEvent());
    document.addEventListener('mousedown', (event) => game.onMouseEvent(event, 'down'));
    document.addEventListener('mouseup', (event) => game.onMouseEvent(event, 'up'));
    document.addEventListener('mousemove', (event) => game.onMouseEvent(event, 'move'));
    });
  });
