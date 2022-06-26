function outputGoods(quizzes) {
  document.getElementById("q-section").innerHTML = quizzes
    .map((n) => `
      <div class="quiz-card">
        <img src="${n.img}" class="quiz-image">
        <div class="quiz-body">
          <a href="${n.link}">
            <h2 class="quiz-header">${n.title}</h3>
            <h3 class="quiz-descr">${n.description}</h2>
            <p class="quiz-source">${n.source}</p>
          </a>
        </div>
      </div>
  `
    ).join("");
}

outputGoods(DATA_QUIZZES);
