window.addEventListener('load', () => {
    const game = new Game('main-canvas');
    window.game = game
    game.start();

    document.addEventListener('click', (event) => game.onMouseEvent());
    document.addEventListener('mousedown', (event) => game.onMouseEvent(event, 'down'));
    document.addEventListener('mouseup', (event) => game.onMouseEvent(event, 'up'));
    document.addEventListener('mousemove', (event) => game.onMouseEvent(event, 'move'));
    });