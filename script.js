let config = {};

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
            fragment.append(tipEl);

            if (tip.description) {
                const descriptionEl = createDescription(tip);
                fragment.append(descriptionEl);
            }
        })

        if (config?.order) {
            backgroundForTipsOrder.style.top = `${config.order.y}px`;
            backgroundForTipsOrder.style.left = `${config.order.x}px`;
        }

        backgroundForTips.append(fragment);
        updateBackBtnVisibility();
        updateOrderVisibility();
        updateImagePosition();
        updateMainInfoVisibility();
        updateDetailDescription(value);
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

function updateMainInfoVisibility() {
    if (config.displayType === '1') {
        mainInfo.classList.remove('hidden');
    } else {
        mainInfo.classList.add('hidden');
    }
}

function updateImagePosition() {
    backgroundForTipsPosition.style.top = `${config.image.y}px`;
    backgroundForTipsPosition.style.left = `${config.image.x}px`;
}

function updateDetailDescription(value) {
    if (config.displayType === '3') {
        detailDescription.classList.remove('hidden');
        detailDescription.querySelector('h3').textContent = value.detailDescription.title;
        detailDescription.querySelector('p').textContent = value.detailDescription.label;
    } else {
        detailDescription.classList.add('hidden');
    }
}

function hoverService(id) {
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
const mainInfo = main.querySelector('.main-info');
const detailDescription = main.querySelector('.detail-description');


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

document.addEventListener('click', (event) => {
    const {x, y} = main.getBoundingClientRect();
    const posX = event.clientX - x;
    const posY = event.clientY - y;
    console.log('clientX: ' + posX + ' - clientY: ' + posY);
});
