/* app is for general control over the application and connections between the other components
 */

const APP = {
    init() {
        //this function runs when the page loads
        let searchBox = document.querySelector("#search");
        let searchBtn = document.querySelector("#btnSearch");

        searchBox.addEventListener("focus", (ev) => {
            searchBtn.classList.remove("pulse");
        });

        searchBox.addEventListener("blur", (ev) => {
            searchBtn.classList.add("pulse");
        });

        searchBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            name = searchBox.value;
            searchBtn.style.outline = "none";
            if (name) {
                ACTORS.getActor(name);
                searchBox.value = "";
            }
        });
    }
};

//actors is for changes connected to content in the actors section
const ACTORS = {
    foundActor: {
        actorName: null,
        id: null,
        known_for: null
    },
    getActor(actor) {
        let url = `https://api.themoviedb.org/3/search/person?api_key=803734898f6659797a0f7e7dc6a24147&language=en-US&query=${actor}&page=1&include_adult=false`;

        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Bad response", response.status);
                }
            })
            .then(function (data) {
                SEARCH.results.push(data.results);
                ACTORS.card(data);
            })
            .catch((err) => {
                //handle the error
                alert(err);
            });
    },

    card(result) {
        if (result["total_results"] === 0) {
            alert(
                "There is no actor with that name, please check your spelling and try again"
            );
            PAGES.switchPage(PAGES["currentPage"], PAGES["instr"]);
            return;
        }

        let list = document.querySelector("#actorsList");
        list.innerHTML = "";

        result.results.forEach((actor) => {
            ACTORS.foundActor["actorName"] = actor["name"];
            ACTORS.foundActor["id"] = actor["id"];
            ACTORS.foundActor["known_for"] = actor["known_for"];
            SEARCH.addActor(ACTORS.foundActor);

            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-id", actor.id);

            let picture = document.createElement("div");
            picture.classList.add("picture");

            let image = document.createElement("img");
            image.src = "https://image.tmdb.org/t/p/w185/" + actor.profile_path;
            image.alt = actor.name;

            picture.append(image);
            card.append(picture);

            let h3 = document.createElement("h3");
            h3.classList.add("name");
            h3.textContent = actor.name;
            card.append(h3);

            let popularity = document.createElement("p");
            popularity.classList.add("pop");
            let pop = Math.ceil(actor.popularity / 3);
            pop = pop <= 5 ? pop : 5;
            popularity.innerHTML = "<span>&star;</span>".repeat(pop);
            card.append(popularity);

            // check for image existence before appending card
            if (image.src.slice(-4) !== "null") {
                list.append(card);
            }

            card.addEventListener("click", (ev) => MEDIA.getMedia(ev));
        });
        PAGES.switchPage(PAGES["currentPage"], PAGES["actors"]);
    }
};

//search is for anything to do with the fetch api
const SEARCH = {
    results: [],
    actorsMediaInfo: [],
    addActor(foundActor) {
        let actor = {
            actorName: foundActor.actorName,
            id: foundActor.id,
            known_for: foundActor["known_for"]
        };
        SEARCH.actorsMediaInfo.push(actor);
    }
};

//media is for changes connected to content in the media section
const MEDIA = {
    media: null,
    getMedia(ev) {
        let h3 = document.querySelector("#media h3");
        let actorId = ev.currentTarget.getAttribute("data-id");
        let clickedActor = SEARCH.actorsMediaInfo.find((actor) => {
            if (parseInt(actorId) == actor.id) return true;
        });
        h3.textContent = `${clickedActor["actorName"]} is best known for:`;

        MEDIA.media = clickedActor["known_for"];
        MEDIA.addMedia(media);
        PAGES.switchPage(PAGES["actors"], PAGES["media"]);
        MEDIA.setDimensions();

        let actorsBtn = document.querySelector("h1 span");
        actorsBtn.classList.add("act");
        actorsBtn.addEventListener("click", showActors);

        function showActors() {
            PAGES.switchPage(PAGES["currentPage"], PAGES["actors"]);
            removeActorsListener();
        }
        function removeActorsListener() {
            actorsBtn.classList.remove("act");
            actorsBtn.removeEventListener("click", showActors);
        }
    },
    addMedia(media) {
        media = MEDIA.media;
        let list = document.querySelector("#titles");
        list.innerHTML = "";

        media.forEach((show) => {
            let data_id = show["id"];
            let name = show["name"] || show["title"];
            let poster = show["poster_path"];
            let yearShown = show["first_air_date"] || show["release_date"];
            yearShown = yearShown.slice(0, 4);

            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-id", data_id);

            let picture = document.createElement("div");
            picture.classList.add("picture");

            let image = document.createElement("img");
            image.src = "https://image.tmdb.org/t/p/w185/" + poster;
            image.alt = name;

            picture.append(image);
            card.append(picture);

            let cardH3 = document.createElement("h3");
            cardH3.classList.add("name");
            cardH3.textContent = name;
            card.append(cardH3);

            let year = document.createElement("p");
            year.classList.add("pop");
            year.textContent = yearShown;
            card.append(year);
            list.append(card);
        });
    },
    setDimensions() {
        let mediaPage = document.querySelector("#media");
        let header = document.querySelector("#header");
        let headerHeight = header.getBoundingClientRect().height;
        mediaPage.style.top = `${headerHeight + 30}px`;
    }
};

// PAGES is for switching between pages
const PAGES = {
    currentPage: document.querySelector(".active"),
    instr: document.querySelector("#instructions"),
    actors: document.querySelector("#actors"),
    media: document.querySelector("#media"),
    switchPage(prev, next) {
        prev.classList.remove("active");
        next.classList.add("active");
        PAGES.currentPage = next;
    }
};

//storage is for working with localstorage
const STORAGE = {
    //this will be used in Assign 4
};

//nav is for anything connected to the history api and location
const NAV = {
    //this will be used in Assign 4
};

//Start everything running
APP.init();
