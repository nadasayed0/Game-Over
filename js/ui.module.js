
export class Ui {
    constructor() {}
  
    displayGames(data) {
      let gamesBox = "";
  
      for (let i = 0; i < data.length; i++) {
        let videoPath = data[i].thumbnail.replace(
          "thumbnail.jpg",
          "videoplayback.webm"
        );
  
        gamesBox += `
          <div class="col">
            <div data-id="${
              data[i].id
            }" class="card h-100 bg-transparent" role="button">
              <div class="card-body">
                <figure class="position-relative">
                  <img class="card-img-top object-fit-cover h-100" src="${
                    data[i].thumbnail
                  }" />
  
                  <video muted preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                    <source src="${videoPath}">
                  </video>
  
                </figure>
  
                <figcaption>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small">${data[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
  
                  <p class="card-text small text-center opacity-50">
                    ${data[i].short_description.split(" ", 8).join(" ")}
                  </p>
  
                </figcaption>
              </div>
  
              <footer class="card-footer hstack justify-content-between">
                <span class="badge bg-card text-white">${data[i].genre}</span>
                <span class="badge bg-card text-white">${data[i].platform}</span>
              </footer>
            </div>
          </div>`;
      }
  
      const gameDataElement = document.getElementById("gameData");
      gameDataElement.innerHTML = gamesBox;
  
      const cards = gameDataElement.querySelectorAll(".card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", this.startVideo);
        card.addEventListener("mouseleave", this.stopVideo);
      });
    }
  
    startVideo(event) {
      const card = event.currentTarget;
      const videoElement = card.querySelector("video");
      if (videoElement) {
        videoElement.muted = true;
        videoElement.play().then(() => {
          videoElement.classList.remove("d-none");
        });
      }
    }
  
    stopVideo(event) {
      const card = event.currentTarget;
      const videoElement = card.querySelector("video");
      if (videoElement) {
        videoElement.pause();
        videoElement.classList.add("d-none");
      }
    }
  
    displayDetails(data) {
      const detailsBox = `
        <div class="col-md-4">
          <img src="${data.thumbnail}" class="w-100" alt="image details" />
        </div>
        <div class="col-md-8">
          <h3>Title: ${data.title}</h3>
          <p>
            Category: <span class="badge text-bg-info">${data.genre}</span>
          </p>
          <p>
            Platform: <span class="badge text-bg-info">${data.platform}</span>
          </p>
          <p>
            Status: <span class="badge text-bg-info">${data.status}</span>
          </p>
          <p class="small">${data.description}</p>
          <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">
            Show Game
          </a>
        </div>`;
      document.getElementById("detailsContent").innerHTML = detailsBox;
    }
  }