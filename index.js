const timeline = document.getElementById("timeline")
const footer = document.getElementById("footer_event")
const score = document.getElementById("score")

const events = [
    { name: "Moon Landing", year: 1969 },
    { name: "World War II Ends", year: 1945 },
    { name: "French Revolution", year: 1789 },
    { name: "First Man in Space", year: 1961 },
    { name: "Fall of the Berlin Wall", year: 1989 }
];

//events_queue = events.slice().sort(() => 0.5 - Math.random())
events_queue = []

function new_event_item(random_event) {
    event_item = document.createElement("div")
    event_item.classList.add("event_item")
    event_item.setAttribute("year", random_event.year.toString())

    event_text = document.createElement("p")
    event_text.innerText = random_event.name

    event_item.appendChild(event_text)

    return event_item
}

function add_starting_event() {
    random_event_1 = events_queue.shift()
    random_event_2 = events_queue.shift()

    event_item_1 = new_event_item(random_event_1)
    event_item_2 = new_event_item(random_event_2)

    if (random_event_1.year > random_event_2.year) {
        timeline.appendChild(event_item_1)
        timeline.appendChild(event_item_2)
    } else {
        timeline.appendChild(event_item_2)
        timeline.appendChild(event_item_1)
    }
}

function clear_timeline() {
    while (timeline.firstChild) {
        timeline.removeChild(timeline.lastChild)
    }
}

function clear_footer() {
    while (footer.firstChild) {
        footer.removeChild(footer.lastChild)
    }
}

function add_reset_button() {
    clear_footer()

    reset_button = document.createElement("button")
    reset_button.classList.add("event_item", "reset_button")
    reset_button.innerText = "Reset"
    reset_button.setAttribute("onclick", "reset_game()")

    footer.appendChild(reset_button)
}

function reset_game() {
    events_queue = events.slice().sort(() => 0.5 - Math.random())

    clear_timeline()
    clear_footer()
    add_starting_event()
    randomise_footer_event()
}

function randomise_footer_event() {
    random_event = events_queue.shift()

    event_item - new_event_item(random_event)

    //event_item = document.createElement("div")
    //event_item.classList.add("event_item")
    event_item.setAttribute("draggable", "true")
    event_item.setAttribute("ondragstart", "dragstartHandler(event)")
    event_item.id = "dragging"

    //event_text = document.createElement("p")
    //event_text.innerText = random_event.name

    //event_item.appendChild(event_text)
    footer.appendChild(event_item)
}

function dragstartHandler(ev) {
    event_item.classList.add("dragging")
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();

    const afterElement = getDragAfterElement(timeline, ev.clientY);
    const dragging = document.querySelector(".dragging");

    console.log(afterElement)

    if (afterElement == null) {
        timeline.appendChild(dragging); // If no events, place at end
    } else {
        timeline.insertBefore(dragging, afterElement); // Insert before nearest event
    }
}

function dropHandler(ev) {
    ev.preventDefault();

    const data = ev.dataTransfer.getData("text");
    event_item = document.getElementById(data)
    event_item.removeAttribute('id');
    event_item.removeAttribute('draggable');
    event_item.removeAttribute('ondragstart');
    event_item.classList.remove("dragging")

    if (!check_if_ordered()) {
        score.innerText = "You lose"
        add_reset_button()
        return
    }

    score.innerText = "Score: " + (timeline.childElementCount - 2).toString()

    if (events_queue.length > 0) {
        randomise_footer_event()
    } else {
        score.innerText = "You win"
        add_reset_button()
    }
}

function check_if_ordered() {
    last_year = Infinity
    for (child of timeline.children) {
        new_year = Number(child.getAttribute("year"))
        if (new_year > last_year) {
            return false
        } else {
            last_year = new_year
        }
    }
    return true
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".event_item:not(.dragging)")];
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; // Distance from middle of element
  
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

reset_game()