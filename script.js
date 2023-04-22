function printMousePos(event) {
    console.log('clientX: ' + event.clientX + ' - clientY: ' + event.clientY);
}

document.addEventListener('click', printMousePos);

let config = {
    displayType: '',
    image: {
        x: 0,
        y: 0
    },
    previousPart: '',
    tips: [{
        point: {
            x: 0,
            y: 0,
        },
        description: {
            x: 0,
            y: 0,
            label: ''
        },
        nextPart: '',
        id: 1,
    }]
};

function createTip(tip) {
    const tipEl = document.createElement('div');
    tipEl.classList.add('tip');
    tipEl.style.top = `${tip.point.y}px`;
    tipEl.style.left = `${tip.point.x}px`;

    tipEl.dataset.id = tip.id;
    tipEl.dataset.nextPart = tip.nextPart;

    tipEl.onmouseover = () => {
        hoverService(tip.id);
    }
    tipEl.onmouseout = () => {
        hoverService(tip.id);
    }

    return tipEl;
}

function createDescription(tip) {
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = tip.description.label;
    descriptionEl.classList.add('description');
    descriptionEl.style.top = `${tip.description.y}px`;
    descriptionEl.style.left = `${tip.description.x}px`;
    descriptionEl.dataset.nextPart = tip.nextPart;
    descriptionEl.dataset.id = tip.id;

    descriptionEl.onmouseover = () => {
        hoverService(tip.id);
    }
    descriptionEl.onmouseout = () => {
        hoverService(tip.id);
    }

    return descriptionEl;
}

function createTips(configPath) {
    fetch(configPath).then((resp) => resp.json()).then((value) => {
        console.log(value);
        config = value;
        const fragment = document.createDocumentFragment();
        value.tips.forEach((tip) => {
            const tipEl = createTip(tip);
            const descriptionEl = createDescription(tip);

            fragment.append(tipEl);
            fragment.append(descriptionEl);
        })

        backgroundForTips.append(fragment);
        updateBackBtnVisibility();
        updateOrderVisibility();
        updateImagePosition();
    })
}

function clearTips() {
    while (backgroundForTips.hasChildNodes()) {
        backgroundForTips.removeChild(backgroundForTips.lastChild)
    }
}

function updateBackBtnVisibility() {
    if (config.previousPart) {
        backgroundForTipsBackBtn.classList.remove('hidden');
    } else {
        backgroundForTipsBackBtn.classList.add('hidden');
    }
}

function updateOrderVisibility() {
    if (config.displayType === '3') {
        backgroundForTipsOrder.classList.remove('hidden');
    } else {
        backgroundForTipsOrder.classList.add('hidden');
    }
}

function updateImagePosition() {
    backgroundForTipsPosition.style.top = `${config.image.y}px`;
    backgroundForTipsPosition.style.left = `${config.image.x}px`;
}

function hoverService(id) {
    console.log(id);
    const elements = main.querySelectorAll(`[data-id='${id}']`);
    elements.forEach((el) => {
        el.classList.toggle('highlight-tip')
    })
}

const main = document.getElementById('image-with-tips');
const backgroundForTips = document.getElementById('background-for-tips');
const backgroundForTipsBackBtn = document.getElementById('image-with-tips-back-btn');
const backgroundForTipsPosition = document.getElementById('image-with-tips-position');
const backgroundForTipsOrder = document.getElementById('image-with-tips-order');

createTips('configs/main.json');

backgroundForTipsBackBtn.addEventListener('click', (event) => {
    if (config.previousPart) {
        clearTips();
        createTips(config.previousPart);
    }
})

main.addEventListener('click', (event) => {
    if (event.target.dataset?.nextPart) {
        clearTips();
        createTips(event.target.dataset.nextPart);
    }
})
