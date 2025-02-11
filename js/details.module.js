import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });

    this.loader = document.getElementById("loader");
    this.getDetails(id);
  }

  async getDetails(id) {
    this.loader.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b975f4e8b7msh5ef5ff54267df07p13fe68jsn234313083c74",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );

    const response = await api.json();
    this.loader.classList.add("d-none");

    new Ui().displayDetails(response);
  }
}