
const slider = document.querySelector(".slider");
let sliderGallery = document.querySelector(".slider-img-wrap");
let sliderItems = document.querySelectorAll(".slider-item");
let sliderCollectionImg = document.querySelectorAll(".slider-collection-img");
const sliderBtnPre = document.querySelector(".slider-btn-left");
const sliderBtnNext = document.querySelector(".slider-btn-right");
let sliderDotItem = document.querySelectorAll(".slider-dot-item");
let bins = document.querySelectorAll(".bin-container");
const sliderCollection = document.querySelectorAll(".slider-collection");
const sliderItemWidth = sliderItems[0].offsetWidth;
let sliderLength = sliderItems.length;
const form = document.querySelector(".form-container");
let posDotItem =0;
let positionX = 0;
let dataIndex =0;

bins.forEach((binItem)=> {
    binItem.addEventListener("click", handleBin)
});

function handleBin(binItem) {
    if(sliderLength == 1) return;
    dataIndex  = binItem.target.parentElement.parentElement.dataset.index;
    removeCollection(dataIndex);
    resetDataIndex();
}

[...sliderDotItem].forEach((dotItem)=>{
    dotItem.addEventListener("click", handleDot)
});

function handleDot(e) {
        removeDot();
        removeOutline();
        const dotIndex = parseInt(e.target.dataset.index);
        posDotItem = dotIndex;
        translateSlider();
        handleActive();
}

[...sliderCollectionImg].forEach((element) => {
    element.addEventListener("click",handleCollectionImg);
})

function handleCollectionImg(element) {
    removeOutline();
    removeDot();
    const index = parseInt(element.target.parentElement.dataset.index);
    posDotItem = index;
    if(!posDotItem && posDotItem != 0){
        console.log(dataIndex);
        if(dataIndex == sliderLength) dataIndex --;
        sliderCollectionImg[dataIndex].classList.add("slider-collection-active");
        posDotItem = dataIndex;
    }
    translateSlider();
    handleActive();
}
function translateSlider() {
    positionX = -1 * posDotItem * sliderItemWidth;
    sliderGallery.style = `transform: translateX(${positionX}px)`;
}

sliderBtnNext.addEventListener("click", function () {
    handleSlider(1);
});

sliderBtnPre.addEventListener("click", function () {
    handleSlider(-1);
})

function handleSlider(direction) {
    if(direction == 1){
        posDotItem ++;
        if(posDotItem >  sliderLength-1){
            posDotItem = sliderLength-1;
            return;
        }
        positionX -= sliderItemWidth;
    }else if(direction == -1){
        posDotItem --;
        if(posDotItem <0){
            posDotItem = 0;
            return;
        }
        positionX += sliderItemWidth;
    }
    sliderGallery.style = `transform: translateX(${positionX}px)`;
    removeDot();
    removeOutline();
    handleActive();
}

function handleActive() {
    sliderDotItem[posDotItem].classList.add("slider-active");
    sliderCollectionImg[posDotItem].classList.add("slider-collection-active");
}

function removeDot() {
    [...sliderDotItem].forEach(eRemove => eRemove.classList.remove("slider-active"));
}
function removeOutline() {
    [...sliderCollectionImg].forEach((e) => e.classList.remove("slider-collection-active"));
}

function resetDataIndex() {
    sliderCollectionImg = document.querySelectorAll(".slider-collection-img");
    sliderDotItem = document.querySelectorAll(".slider-dot-item");
    sliderItems = document.querySelectorAll(".slider-item");
    sliderLength = sliderItems.length;
    sliderCollectionImg.forEach((e,i) => e.dataset.index = i);
    sliderDotItem.forEach((e,i) => e.dataset.index = i);
    sliderItems.forEach((e,i) => e.dataset.index = i);
}

//  create new slider
const fileUpload = document.querySelector("#file");
const ipFile = document.querySelector(".ip_file");
const imgAdd = document.querySelector(".img-add");
const btnAdd = document.querySelector(".btn-add");
const containerDots = document.querySelector(".slider-dots-container");
const containerSlider = document.querySelector(".slider-img-wrap");
fileUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    ipFile.innerHTML = file.name;
    let fileReader = new FileReader();
    fileReader.onload = function () {
        imgAdd.children[0].src = fileReader.result;
    }
    fileReader.readAsDataURL(file);
});


form.addEventListener("submit", function (e) {
    e.preventDefault();
    if(!validationForm()) return;
    let src = imgAdd.children[0].src;
    setAuthor();
    setQuote();
    if(sliderLength  > 5){
        removeCollection(sliderLength-1);
        resetCollection();
    }
    creatDot();
    creatSliderItem(src);
    createItemCol(src);
    resetCollection();
});

function removeCollection(index) {
    sliderCollectionImg[index].remove();
    sliderDotItem[index].remove();
    sliderItems[index].remove();
}

function resetCollection() {
    sliderItems = document.querySelectorAll(".slider-item");
    sliderLength = sliderItems.length;
    sliderDotItem = document.querySelectorAll(".slider-dot-item");
    sliderCollectionImg = document.querySelectorAll(".slider-collection-img");
}

function creatSliderItem(src) {
    let sliderItem = document.createElement("div");
    let image = document.createElement("img");
    image.src = src;
    sliderItem.classList.add("slider-item");
    sliderItem.appendChild(image);
    sliderItem.dataset.index = sliderLength;
    containerSlider.appendChild(sliderItem);
}

function creatDot() {
    let dot = document.createElement("li");
    dot.classList.add("slider-dot-item");
    dot.dataset.index = sliderDotItem.length;
    dot.addEventListener("click", handleDot);
    containerDots.appendChild(dot);
}

function createItemCol(src) {
    let sliderCol = document.createElement("div");
    let imgCollection = document.createElement("img");
    let binContainer = bins[0].cloneNode(true);
    binContainer.addEventListener("click", handleBin);
    sliderCol.classList.add("slider-collection-img");
    imgCollection.src = src;
    sliderCol.appendChild(imgCollection);
    sliderCol.appendChild(binContainer);
    sliderCol.dataset.index = sliderDotItem.length;
    sliderCol.addEventListener("click", handleCollectionImg);
    sliderCollection[0].appendChild(sliderCol);
}


// check validation
let author;
let quote;
const eAuthor = document.querySelector(".sub-text-author");
const eQuote = document.querySelector(".sub-text-content");
const eErrorQuote = document.getElementById("error_quote");
const eErrorAuthor = document.getElementById("error_author");
function validationForm() {
    author = document.getElementById("author");
    quote = document.getElementById("quote");
    let result = true;
    if(!checkQuote(quote.value.trim())){
        quoteError();
        result = false;
    }
    if(!checkAuthor(author.value.trim())){
        authorError();
        result = false;
    }
    return result;
}

function setAuthor() {
    let textAuthor = author.value;
    eAuthor.innerHTML = textAuthor;
}

function setQuote() {
    
    eQuote.innerHTML = quote.value;
}
function checkQuote(txt) {
    if(txt.length < 3) return false;
    return true;
}
function checkAuthor(txt) {
    if(txt.length == 0) return false;
    return true;
}

function quoteError() {
    eErrorQuote.innerHTML = "Quote length less than 3";
    quote.style.border = `1px solid red`;
}
function authorError() {
    eErrorAuthor.innerHTML = "Author not empty";
    author.style.border = `1px solid red`;
}