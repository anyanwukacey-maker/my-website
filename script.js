const puzzles = [
            { clue: "A large body of water", answer: "ocean" },
            { clue: "The planet we live on", answer: "earth" },
            { clue: "A bright star in our solar system", answer: "sun" },
            { clue: "The natural satellite of Earth", answer: "moon" },
            { clue: "A colorful arc after rain", answer: "rainbow" },
            { clue: "Flying mammal active at night", answer: "bat" },
            { clue: "Large land animal with a trunk", answer: "elephant" },
            { clue: "Frozen water", answer: "ice" },
            { clue: "Container for flowers", answer: "vase" },
            { clue: "Small furry pet that meows", answer: "cat" }
        ];

        let currentIndex = 0;
        let correctCount = 0;
        let incorrectCount = 0;

        function loadPuzzle() {
            if (currentIndex < puzzles.length) {
                const puzzle = puzzles[currentIndex];
                document.getElementById('clue').textContent = puzzle.clue;
                document.getElementById('answer').value = '';
                document.getElementById('message').className = 'message';
                document.getElementById('message').textContent = '';
                document.getElementById('answer').focus();
            } else {
                endGame();
            }
        }

        function submitAnswer() {
            const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
            const correctAnswer = puzzles[currentIndex].answer.toLowerCase();
            const messageEl = document.getElementById('message');

            if (!userAnswer) {
                messageEl.className = 'message error';
                messageEl.textContent = '⚠️ Please enter an answer!';
                return;
            }

            if (userAnswer === correctAnswer) {
                correctCount++;
                messageEl.className = 'message success';
                messageEl.textContent = '✓ Correct!';
            } else {
                incorrectCount++;
                messageEl.className = 'message error';
                messageEl.textContent = `✗ Wrong! The answer was: ${correctAnswer}`;
            }

            updateScore();
            setTimeout(nextPuzzle, 1500);
        }

        function skipQuestion() {
            incorrectCount++;
            const messageEl = document.getElementById('message');
            messageEl.className = 'message error';
            messageEl.textContent = `⊘ Skipped! The answer was: ${puzzles[currentIndex].answer}`;
            updateScore();
            setTimeout(nextPuzzle, 1500);
        }

        function nextPuzzle() {
            currentIndex++;
            loadPuzzle();
        }

        function updateScore() {
            document.getElementById('correct').textContent = correctCount;
            document.getElementById('incorrect').textContent = incorrectCount;
            document.getElementById('progress').textContent = `${currentIndex + 1}/10`;
            const progressPercent = ((currentIndex + 1) / puzzles.length) * 100;
            document.getElementById('progressBar').style.width = progressPercent + '%';
        }

        function endGame() {
            document.getElementById('gameContainer').style.display = 'none';
            document.getElementById('gameOver').classList.add('show');
            document.getElementById('finalScore').textContent = `${correctCount}/${puzzles.length}`;
            document.getElementById('finalCorrect').textContent = correctCount;
        }

        function resetGame() {
            currentIndex = 0;
            correctCount = 0;
            incorrectCount = 0;
            document.getElementById('gameContainer').style.display = 'block';
            document.getElementById('gameOver').classList.remove('show');
            updateScore();
            loadPuzzle();
        }

        // Start the game
        resetGame();