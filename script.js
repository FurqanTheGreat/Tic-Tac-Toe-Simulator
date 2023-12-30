document.addEventListener("DOMContentLoaded", function () {
        // Initialize the game
        initGame();

        function initGame() {
            // Create the game board
            const board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];

            // Variable to track the current player
            let currentPlayer = 'X';

            // Create the table and add event listeners to each cell
            const table = document.getElementById("ticTacToe");
            for (let i = 0; i < 3; i++) {
                const row = table.insertRow(i);
                for (let j = 0; j < 3; j++) {
                    const cell = row.insertCell(j);
                    cell.addEventListener("click", function () {
                        makeMove(i, j);
                    });
                }
            }

            // Function to handle a player's move
            function makeMove(row, col) {
                if (board[row][col] === '') {
                    board[row][col] = currentPlayer;
                    renderBoard();

                    if (checkWinner(currentPlayer)) {
                        alert(currentPlayer + " wins!");
                        resetGame();
                    } else if (isBoardFull()) {
                        alert("It's a tie!");
                        resetGame();
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        if (currentPlayer === 'O') {
                            makeAIMove();
                        }
                    }
                }
            }

            // Function to make a move for the AI using the minimax algorithm
            function makeAIMove() {
                const bestMove = getBestMove(board, 'O');
                const [row, col] = bestMove;
                makeMove(row, col);
            }

            // Function to get the best move using the minimax algorithm
            function getBestMove(board, player) {
                let bestScore = -Infinity;
                let bestMove;

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] === '') {
                            board[i][j] = player;
                            const score = minimax(board, 0, false);
                            board[i][j] = '';

                            if (score > bestScore) {
                                bestScore = score;
                                bestMove = [i, j];
                            }
                        }
                    }
                }

                return bestMove;
            }

            // Minimax algorithm
            function minimax(board, depth, isMaximizing) {
                const scores = {
                    X: -1,
                    O: 1,
                    tie: 0
                };

                if (checkWinner('X')) {
                    return scores.X - depth;
                } else if (checkWinner('O')) {
                    return scores.O + depth;
                } else if (isBoardFull()) {
                    return scores.tie;
                }

                if (isMaximizing) {
                    let bestScore = -Infinity;
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (board[i][j] === '') {
                                board[i][j] = 'O';
                                const score = minimax(board, depth + 1, false);
                                board[i][j] = '';
                                bestScore = Math.max(score, bestScore);
                            }
                        }
                    }
                    return bestScore;
                } else {
                    let bestScore = Infinity;
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (board[i][j] === '') {
                                board[i][j] = 'X';
                                const score = minimax(board, depth + 1, true);
                                board[i][j] = '';
                                bestScore = Math.min(score, bestScore);
                            }
                        }
                    }
                    return bestScore;
                }
            }

            // Function to check if a player has won
            function checkWinner(player) {
                // Check rows, columns, and diagonals
                for (let i = 0; i < 3; i++) {
                    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
                        return true; // Row
                    }
                    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
                        return true; // Column
                    }
                }
                if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
                    return true; // Diagonal
                }
                if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
                    return true; // Diagonal
                }
                return false;
            }

            // Function to check if the board is full
            function isBoardFull() {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] === '') {
                            return false;
                        }
                    }
                }
                return true;
            }

            // Function to render the current state of the board
            function renderBoard() {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const cell = table.rows[i].cells[j];
                        cell.textContent = board[i][j];
                        cell.className = board[i][j] ? board[i][j] : '';
                    }
                }
            }

            // Function to reset the game
            function resetGame() {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        board[i][j] = '';
                    }
                }
                currentPlayer = 'X';
                renderBoard();
            }
        }
    });
