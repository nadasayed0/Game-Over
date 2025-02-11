import { Ui } from "./ui.module.js";
import { Details } from "./details.module.js";

export class Home {
  constructor() {
    const logOut = document.getElementById("logout");
    const btnMode = document.getElementById("mode");

    logOut.addEventListener("click", function () {
      window.location = "./index.html";
    });

    if (localStorage.getItem("theme") !== null) {
      const themeData = localStorage.getItem("theme");

      if (themeData === "light") {
        mode.classList.replace("fa-sun", "fa-moon");
      } else {
        mode.classList.replace("fa-moon", "fa-sun");
      }
      document.querySelector("html").setAttribute("data-theme", themeData);
    }

    btnMode.addEventListener("click", function (e) {
      if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme", "light");
        mode.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
      } else {
        mode.classList.replace("fa-moon", "fa-sun");
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelector(".menu .active").classList.remove("active");
        link.classList.add("active");

        const category = link.dataset.category;

        this.getGames(category);
      });
    });

    this.loader = document.getElementById("loader");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");

    this.ui = new Ui();

    this.getGames("mmorpg");
  }

  async getGames(category) {
    this.loader.classList.remove("d-none");

    const option = {
      method: "get",
      headers: {
        "x-rapidapi-key": "b975f4e8b7msh5ef5ff54267df07p13fe68jsn234313083c74",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      option
    );

    const response = await api.json();
    this.loader.classList.add("d-none");

    this.ui.displayGames(response);

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");
        this.detailsSecioin = new Details(card.dataset.id);
      });
    });
  }
}