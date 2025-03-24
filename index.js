const timeline = document.getElementById("timeline")
const footer = document.getElementById("footer_event")

const events = [
    { name: "Moon Landing", year: 1969 },
    { name: "World War II Ends", year: 1945 },
    { name: "French Revolution", year: 1789 },
    { name: "First Man in Space", year: 1961 },
    { name: "Fall of the Berlin Wall", year: 1989 }
];

events_queue = events.slice().sort(() => 0.5 - Math.random())

function add_random_event() {
    random_event = events_queue.shift()

    event_item = document.createElement("div")
    event_item.classList.add("event_item")

    event_text = document.createElement("p")
    event_text.innerText = random_event.name

    event_item.appendChild(event_text)
    timeline.appendChild(event_item)
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

function randomise_footer_event() {
    random_event = events_queue.shift()

    event_item = document.createElement("div")
    event_item.classList.add("event_item")

    event_text = document.createElement("p")
    event_text.innerText = random_event.name

    event_item.appendChild(event_text)
    footer.appendChild(event_item)
}

clear_timeline()
clear_footer()
add_random_event()
add_random_event()
randomise_footer_event()