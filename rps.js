const result = document.getElementById("result");

    // Function to get computer's choice
    function computerChoice() {
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * 3)]; // Math.floor + Math.random
    }

    // Play function
    function play(userChoice) {
      const comp = computerChoice();
      let outcome = "";

      switch (userChoice + "-" + comp) {
        case "rock-scissors":
        case "paper-rock":
        case "scissors-paper":
          outcome = "You Win!";
          break;
        case "rock-paper":
        case "paper-scissors":
        case "scissors-rock":
          outcome = "You Lose!";
          break;
        default:
          outcome = "It's a Draw!";
      }

      result.innerText = `You: ${userChoice} | Computer: ${comp} → ${outcome}`;
    }

    // Event listeners for buttons
     document.getElementById("rock").addEventListener("click", () => play("rock"));
     document.getElementById("paper").addEventListener("click", () => play("paper"));
     document.getElementById("scissors").addEventListener("click", () => play("scissors")); 