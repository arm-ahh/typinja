const keys = document.querySelectorAll(".key");
const textContainer = document.querySelector(".text-container");

text1 =
    "Maryam Mirzakhani was an Iranian mathematician and a professor of mathematics at Stanford University. Her research topics included Teichmüller theory, hyperbolic geometry, ergodic theory, and symplectic geometry. In 2005, as a result of her research, she was honored in Popular Science's fourth annual 'Brilliant 10' in which she was acknowledged as one of the top 10 young minds who have pushed their fields in innovative directions.";
text = "Have a nice weekend!";

let letters = [];
let position;
let time;
let timerId = "";
let typing = false;

const startTimer = () => {
    timerId = setInterval(() => {
        time += 1;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerId);
};

const whichKey = (key) => {
    const pressed = document.querySelector(".press");
    if (pressed) {
        pressed.classList.remove("press");
    }
    if (key == "&nbsp;") {
        const el = document.querySelector(`#space`);
        el.classList.add("press");
    } else {
        const el = document.querySelector(`#${key.toLowerCase()}`);
        el.classList.add("press");
    }
};

const init = () => {
    position = 0;
    time = 0;
    typing = false;
    const a = text.split(" ").map((word) => {
        const ls = word.split("");
        ls.push("&nbsp;");
        const divEl = document.createElement("div");
        ls.map((l) => {
            const spanEl = document.createElement("span");
            spanEl.classList.add("letter");
            spanEl.innerHTML = l;
            divEl.appendChild(spanEl);
        });
        return `<div class="word">${divEl.innerHTML}</div>`;
    });

    textContainer.innerHTML = "";
    textContainer.innerHTML = a.join("");

    letters = document.querySelectorAll("span");
    letters[0].classList.add("active");
    whichKey(letters[0].innerHTML);
};
init();

const replace = (el, prev, next) => {
    el.classList.remove(prev);
    el.classList.add(next);
};

const showSpeed = () => {
    document.removeEventListener("keydown", handleKeyDown);
    textContainer.innerHTML = "";
    textContainer.innerHTML = `
        <h3>Speed : ${Math.round((text.length / 5) * 60) / time}WPM</h3>
        <button onclick="restart()">Restart</button>
    `;
};

const restart = (e) => {
    init();
    document.addEventListener("keydown", handleKeyDown);
};

const handleKeyDown = (e) => {
    if (!typing) {
        typing = true;
        startTimer();
    }

    const key = e.key;
    const current = letters[position];

    if (e.key == " " && e.target == document.body) {
        e.preventDefault();
    }

    if (key == "Shift") {
        return;
    }

    if (key == "Backspace") {
        current.classList.remove("active");
        const prev = letters[position - 1];
        replace(prev, "correct", "active");
        replace(prev, "incorrect", "active");
        position -= 1;
    } else if (current.innerHTML == key || current.innerHTML == "&nbsp;") {
        replace(current, "active", "correct");
        position += 1;
    } else {
        replace(current, "active", "incorrect");
        position += 1;
    }

    if (position < 0) {
        position = 0;
    } else if (position >= letters.length) {
        stopTimer();
        showSpeed();
    } else {
        letters[position].classList.add("active");
        whichKey(letters[position].innerHTML);
    }
};

document.addEventListener("keydown", handleKeyDown);
