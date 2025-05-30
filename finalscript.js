let currentQuestionIndex = 0;
let scores = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
};

// Function to play the sound effect
function playSound() {
  const sound = new Audio("Audio/audioforjc.mp4");
  sound.play();
}

function playResultSound() {
  const resultSound = new Audio("Audio/sparkle.mp3");
  resultSound.play();
}

const questions = [
  {
    question: "Q1/12: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
    image: "ImagesFolder/q1.png",
    answers: [
      { type: "E", text: "Excitedly wander in while calling out to the magical creatures.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Carefully plot your approach like a magical creature detective.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q2/12: You wander around the woods till you encounter a fork in the road. Which path do you choose?",
    image: "ImagesFolder/q2.png",
    answers: [
      { type: "S", text: "The path on the left. You examine the path and conclude it looks frequently travelled.", scores: { S: 1, N: 0 } },
      { type: "N", text: "The path on the right. You sense a hum of energy and imagine the adventures this path might lead to.", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q3/12: You get lost when a cute squirrel scurries into your path, its tiny eyes glimmering with curiosity.",
    image: "ImagesFolder/q3.gif",
    answers: [
      { type: "T", text: "A squirrel showing up when you're lost? That's a tad bit sus...", scores: { T: 1, F: 0 } },
      { type: "F", text: "Hopefully the little creature knows the way better than you do.", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q4/12: After following the helpful squirrel, you suddenly find yourself before a mysterious, glowing portal.",
    image: "ImagesFolder/q4.gif",
    answers: [
      { type: "J", text: "*What's on the other side? What if there's something dangerous?*", scores: { J: 1, P: 0 } },
      { type: "P", text: "You immediately leap through the portal. *Who’s got time to wait?!*", scores: { J: 0, P: 1 } }
    ]
  },
  {
    question: "Q5/12: Stepping through the magical portal, you find yourself in a quaint village filled with adorable little creatures. You...",
    image: "ImagesFolder/q5.gif",
    answers: [
      { type: "E", text: "Enthusiastically mingle with the villagers, excited to join in their festivities.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Quietly absorb the village’s charm, preferring to observe before joining them.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q6/12: Around the campfire, the warm glow sparks conversation and wonder. You find yourself drawn to...",
    image: "ImagesFolder/q6.png",
    answers: [
      { type: "S", text: "The crackle of the fire and the scent of woodsmoke.", scores: { S: 1, N: 0 } },
      { type: "N", text: "Their laughter as they recount enchanting stories.", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q7/12: The chief confides with you that without the magic relic, the villagers turn into plushies.",
    image: "ImagesFolder/q7.png",
    answers: [
      { type: "T", text: "Roll up your sleeves and start planning a rescue mission! Those villagers need a hero.", scores: { T: 1, F: 0 } },
      { type: "F", text: "No need to rush, you’ll save the day in the morning. Besides, plushies are pretty cute, right?", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q8/12: As you prepare to embark on your quest deeper into the mysterious woods.",
    image: "ImagesFolder/q8.png",
    answers: [
      { type: "J", text: "You tuck a detailed map marked with a planned route into your back pocket.", scores: { J: 1, P: 0 } },
      { type: "P", text: "You stuff your backpack full of snacks as that is the only thing you need.", scores: { J: 0, P: 1 } }
    ]
  },
  {
    question: "Q9/12: Behind a hedge, you find a small group of fairies whispering about the lost relic’s location.",
    image: "ImagesFolder/q9.png",
    answers: [
      { type: "E", text: "Join the circle hoping to uncover every detail about the relic’s whereabouts.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Hide behind a tree, listening to their murmurs and piecing together the clues on your own.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q10/12: At last, you discover the lost relic. Hooray!",
    image: "ImagesFolder/q10.gif",
    answers: [
      { type: "S", text: "Hold it up to the light - that angle is perfect. This one is going straight to Stories.", scores: { S: 1, N: 0 } },
      { type: "N", text: "Soon they’ll be chanting my name in Juniper Grove. Legendary status, here I come!", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q11/12: The chief reveals that the relic has the power to transform you into a villager at will.",
    image: "ImagesFolder/q11.gif",
    answers: [
      { type: "T", text: "That's incredible! You can’t wait to test it out and cause a little chaos with your new village buddies.", scores: { T: 1, F: 0 } },
      { type: "F", text: "Your heart fills with delight at the thought of such playful magic and you imagine the fun it will bring.", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q12/12: As you head home, you wonder: When will you visit them again?",
    image: "ImagesFolder/q12.gif",
    answers: [
      { type: "J", text: "On the next full moon! You’re already planning what snacks to bring.", scores: { J: 1, P: 0 } },
      { type: "P", text: "Who knows? Maybe a squirrel will drop by or a rainbow will point the way.", scores: { J: 0, P: 1 } }
    ]
  }
];

console.log("Total questions loaded:", questions.length);

// Listen for the "Start adventure" button click (assumes your button is the first one on the page)
document.querySelector("button").addEventListener("click", function() {
  playSound();
  startQuiz();
});

function startQuiz() {
  // Hide the landing page container (assumes it has an id="start")
  document.getElementById("start").style.display = "none";
  // Show the quiz page container (assumes it has an id="quiz-page")
  document.getElementById("quiz-page").style.display = "block";
  // Reset the question index and scores (in case of a restart)
  currentQuestionIndex = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  // Load the first question
  showQuestion();
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = ""; // Clear any previous question content

  // If we've gone through all questions, show the result
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];

  // Create and display the question text
  const questionElement = document.createElement("h2");
  questionElement.innerText = currentQuestion.question;
  quizContainer.appendChild(questionElement);

  if (currentQuestion.image) {
    const imageElement = document.createElement("img");
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Quiz Image";
    imageElement.classList.add("quiz-image");
    quizContainer.appendChild(imageElement);
  }

  // Create a container for the answer buttons
  const answersContainer = document.createElement("div");

  // Loop through each answer option and create a button for it
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", function() {
      playSound();  // Play sound on answer click
      // Update the scores based on the selected answer's score object
      for (const key in answer.scores) {
        scores[key] += answer.scores[key];
      }
      // Move on to the next question
      currentQuestionIndex++;
      showQuestion();
    });
    answersContainer.appendChild(btn);
  });

  quizContainer.appendChild(answersContainer);
}

const personalityImages = {
  "ESTJ": "ImagesFolder/mbti_estj.png",
  "ENTJ": "ImagesFolder/mbti_entj.png",
  "ENFP": "ImagesFolder/mbti_enfp.png",
  "INFJ": "ImagesFolder/mbti_infj.png",
  "INTP": "ImagesFolder/mbti_intp.png",
  "INTJ": "ImagesFolder/mbti_intj.png",
  "INFP": "ImagesFolder/mbti_infp.png",
  "ENTP": "ImagesFolder/mbti_entp.png",
  "ENFJ": "ImagesFolder/mbti_enfj.png",
  "ESFP": "ImagesFolder/mbti_esfp.png",
  "ESTP": "ImagesFolder/mbti_estp.png",
  "ESFJ": "ImagesFolder/mbti_esfj.png",
  "ISFJ": "ImagesFolder/mbti_isfj.png",
  "ISFP": "ImagesFolder/mbti_isfp.png",
  "ISTJ": "ImagesFolder/mbti_istj.png",
  "ISTP": "ImagesFolder/mbti_istp.png",
};

function showResult() {
  // Play the result sound
  playResultSound();
  
  // Calculate the final personality type by comparing the paired scores
  let personalityType = "";
  personalityType += scores.E >= scores.I ? "E" : "I";
  personalityType += scores.S >= scores.N ? "S" : "N";
  personalityType += scores.T >= scores.F ? "T" : "F";
  personalityType += scores.J >= scores.P ? "J" : "P";

  // Get the corresponding image from the personalityImages mapping
  const resultImage = personalityImages[personalityType] || "ImagesFolder/default.png";

  // Hide the quiz container and display the result
  document.getElementById("quiz-page").style.display = "none";
  document.getElementById("result").style.display = "block";
  
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "flex"; // Ensures flexbox is applied
  resultContainer.style.justifyContent = "center"; // Centers vertically
  resultContainer.style.alignItems = "center"; // Centers horizontally
  resultContainer.style.height = "100vh"; // Ensures full screen height
  resultContainer.innerHTML = `
    <p>#myplushsona</p>
    <p>Welcome to Juniper Grove!</p>
    <img src="${resultImage}" alt="Your personality image" class="result-image" />
    <div class="result-buttons">
      <button id="share-btn">Share</button>
      <button id="download-btn">Download</button>
      <button id="restart-btn">Restart</button>
    </div>
    <div class="floating-circle" onclick="window.location.href='https://chromaticreature.github.io/portfolio/';"></div>
  `;
  
  // Add event listener for the Restart button
  document.getElementById("restart-btn").addEventListener("click", function() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    resultContainer.style.display = "none";
    document.getElementById("start").style.display = "block";
  });
  
  // Add event listener for the Share button
 document.getElementById("share-btn").addEventListener("click", function() {
  const message = 'Apply for your Plushsona ID card 🪪 here!:\n' + window.location.href;

  navigator.clipboard.writeText(message).then(() => {
    alert("Link copied to clipboard! ✅");
  }).catch((err) => {
    console.error("Could not copy text: ", err);
  });
  });
  
  // Add event listener for the Download button
  document.getElementById("download-btn").addEventListener("click", function() {
    const link = document.createElement('a');
    link.href = resultImage;            
    link.download = 'YourPlushsona_byChromaticreature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
