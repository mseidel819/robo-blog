---
title: "Creating a carousel with JavaScript"
date: "2023-04-28"
image: "js-carousel.jpg"
excerpt: "Are you looking for a way to add a carousel to your page? Here's a tutorial that 100% works!....I think. I don't know, but its written with such confidence."
isFeatured: false
---

# Creating a Carousel Component in JavaScript

Carousels are a common user interface element on websites and applications. They allow users to cycle through a set of images or content in a slideshow format. In this tutorial, we will show you how to create a simple carousel component using JavaScript.

## HTML Markup

First, we will create the HTML markup for the carousel. We will use a <div> element to wrap the carousel and a set of <img> elements to represent each slide in the carousel.

```css
<div class="carousel">
  <img src="slide1.jpg">
  <img src="slide2.jpg">
  <img src="slide3.jpg">
</div>
```

## CSS Styles

Next, we will add some CSS styles to position the carousel and hide all the slides except the first one. We will also add styles to create a navigation bar that users can use to control the carousel.

```js
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel img {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel img:first-child {
  opacity: 1;
}

.carousel-nav {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.carousel-nav button {
  margin: 0 5px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

.carousel-nav button:focus {
  outline: none;
}

.carousel-nav button.active {
  color: red;
}
```

## JavaScript Functionality

Finally, we will add the JavaScript functionality to make the carousel work. We will use an array to store all the slide images, and we will use an index variable to keep track of the current slide. We will also add event listeners to the navigation buttons to allow users to cycle through the slides.

```js
const carousel = document.querySelector(".carousel");
const slides = carousel.querySelectorAll("img");
const navButtons = document.querySelectorAll(".carousel-nav button");

let index = 0;

function showSlide() {
  slides.forEach((slide) => (slide.style.opacity = 0));
  slides[index].style.opacity = 1;
}

function nextSlide() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  showSlide();
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  showSlide();
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("prev")) {
      prevSlide();
    } else {
      nextSlide();
    }
  });
});

setInterval(nextSlide, 5000);
```

## Conclusion

Congratulations! You have created a simple carousel component using HTML, CSS, and JavaScript. You can customize the component further by adding more slides, changing the transition effects, or adding additional functionality such as autoplay or touch-swipe support.
