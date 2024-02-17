'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function(){ 
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')
}

const closeModal = function(){
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
}

btnOpenModal.forEach(btn => btn.addEventListener
	('click', openModal))

	btnCloseModal.addEventListener('click', closeModal)
	overlay.addEventListener('click', closeModal)

	document.addEventListener('keydown', function(e) {
		if(e.key === 'Escape' && !modal.classList.contains('hidden')){
			closeModal()
		}

	})
	
	//scroll into view (learn more)
	const btnScrollTo = document.querySelector('.btn--scroll-to')
	const section1 = document.querySelector('#section--1')

	btnScrollTo.addEventListener('click', function(e){
		//const s1coords = section1.getBoundingClientRect()

		section1.scrollIntoView({behavior: 'smooth'})
	})

    //for scrolling into view
	document.querySelector('.nav__links').addEventListener(
		'click', function(e){
			e.preventDefault()
            
			//Matching strategy
	  if(e.target.classList.contains('nav__link')){
		const id = e.target.getAttribute('href')
		document.querySelector(`${id}`).scrollIntoView({
		behavior: 'smooth'
	    	})
		}
		})

    //Tabbed component
	const tabs = document.querySelectorAll('.operations__tab')
	const tabsContainer = document.querySelector('.operations__tab-container')
	const tabsContent = document.querySelectorAll('.operations__content')

    tabsContainer.addEventListener('click', function(e){
		const clicked = e.target.closest('.operations__tab')
		//Guard clause
		if(!clicked) return
        
		// remove active classes
		tabs.forEach(tab => tab.classList.remove(
			'operations__tab--active'
		))
		tabsContent.forEach(con=> con.classList.remove('operations__content--active'))
		// Active tab
		clicked.classList.add('operations__tab--active')

		// Activate content area
       document.querySelector(`.operations__content--${clicked.dataset.tab}`)
	   .classList.add('operations__content--active')
	}) 


	
/*menu fade animation*/
const nav = document.querySelector('.nav')

nav.addEventListener('mouseover', function(e){
	if(e.target.classList.contains('nav__link')){
		const link = e.target
		const siblings = link.closest('.nav').querySelectorAll('.nav__link')
		const logo = link.closest('.nav').querySelectorAll('img')

		siblings.forEach(el =>{
			if(el !== link) el.style.opacity = 0.5
		})
		logo.style.opacity = 0.5
	}
})
 
nav.addEventListener('mouseout', function(e){
	if(e.target.classList.contains('nav__link')){
		const link = e.target
		const siblings = link.closest('.nav').querySelectorAll('.nav__link')
		const logo = link.closest('.nav').querySelectorAll('img')

		siblings.forEach(el =>{
			if(el !== link) el.style.opacity = 1
		})
		logo.style.opacity = 1
	}
})

//Better way of doing it
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
	const [entry] = entries

	if(!entry.isIntersecting){
		nav.classList.add('sticky')
	}else{
		nav.classList.remove('sticky')
	}
}

const headerObserver = new IntersectionObserver(stickyNav,
	{
		root: null,
		threshold: 0,
		rootMargin:`-${navHeight}px`,
	})

	headerObserver.observe(header)

// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
	const [entry] = entries

	if(!entry.isIntersecting) return

	entry.target.classList.remove('section--hidden')
	observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
	root: null,
	threshold:0,
}) 

allSections.forEach(function(section){
	sectionObserver.observe(section)
	section.classList.add('section--hidden')
}) 

//lazy loading images
const targetImage = document.querySelectorAll('img[data-src]');

const ImgLoader = function(entries, observer){
        const [entry] = entries

		if(!entry.isIntersecting) return

		// Replace src with data-src
		entry.target.src = entry.target.dataset.src

		entry.target.addEventListener('load', function(){
			entry.target.classList.remove('lazy-img')
		})
        observer.unobserve(entry.target)
}

 const imgObserver = new IntersectionObserver(ImgLoader, {
	 root:null,
	 threshold:0.15
	//  rootMargin:'200px'
 })

 targetImage.forEach(img=>imgObserver.observe(img)) 

 // Slider
 const slides = document.querySelectorAll('.slide')
 const btnLeft = document.querySelector('.slider__btn--left')
 const btnRight = document.querySelector('.slider__btn--right')
 const dotContainer = document.querySelector('.dots')
 
 let currentSld = 0
 let maxSlide = slides.length

 //creating Dots
 const createDots = function (){
	 slides.forEach(function(_, i){
		 dotContainer.insertAdjacentHTML( 'beforeend', `<button class="dots__dot" data-slide="${i}"></button>`
		 )
	 })
 }
 createDots()

 //creating active class for the Dots 
 const activateDot = function (slide){
	 document.querySelectorAll('.dots__dot')
	 .forEach(dot =>dot.classList.remove('dots__dot--active'))

	 document.querySelector(`.dots__dot[data-slide="${slide}"]`)
	 .classList.add('dots__dot--active')
 }
activateDot(0)

 const gotoSlide = function(slide){   
	 slides.forEach((s, i)=>{
		 s.style.transform = `translateX(${100 * (i - slide)}%)`
	 })
 }
 gotoSlide(0)

 // Moving to the next Slide
const nextSlide = function(){
	if (currentSld === maxSlide - 1){
		currentSld = 0
	}else{
		currentSld++
	}
	gotoSlide(currentSld)
	activateDot(currentSld)
}
//Moving to the previous slide
const preSlide = function (){
	if (currentSld === 0){
		currentSld = maxSlide - 1
	}else{
		currentSld--
	}
	gotoSlide(currentSld)
	activateDot(currentSld)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', preSlide)

//Making the dots work
dotContainer.addEventListener('click', function(e){
	if (e.target.classList.contains('dots__dot')){
		const slide = e.target.dataset.slide 
		gotoSlide(slide)
		activateDot(slide)
	}
})

// Typing
const typedText1 = document.querySelector(".typed-text");
const cursor1 = document.querySelector(".cursor");

const textArray = ["Network", "Solutions", "&", "Process", "Optimization"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
	if (charIndex < textArray[textArrayIndex].length) {
	  if(!cursor1.classList.contains("typing")) cursor1.classList.add("typing");
	  typedText1.textContent += textArray[textArrayIndex].charAt(charIndex);
	  charIndex++;
	  setTimeout(type, typingDelay);
	} 
	else {
	  cursor1.classList.remove("typing");
		setTimeout(erase, newTextDelay);
	}
  }
  
  function erase() {
	  if (charIndex > 0) {
	  if(!cursor1.classList.contains("typing")) cursor1.classList.add("typing");
	  typedText1.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
	  charIndex--;
	  setTimeout(erase, erasingDelay);
	} 
	else {
	  cursor1.classList.remove("typing");
	  textArrayIndex++;
	  if(textArrayIndex>=textArray.length) textArrayIndex=0;
	  setTimeout(type, typingDelay + 1100);
	}
  }
  
  document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
	if(textArray.length) setTimeout(type, newTextDelay + 250);
  });

  // Creating view less and view more
  function toggleContent() {
	var shortContent = document.getElementById("shortContent");
	var fullContent = document.getElementById("fullContent");

	if (shortContent.style.display === "none") {
	  shortContent.style.display = "block";
	  fullContent.style.display = "none";
	} else {
	  shortContent.style.display = "none";
	  fullContent.style.display = "block";
	}
  }
  function toggleSecondContent() {
	var shortContent = document.getElementById("SecondshortContent");
	var fullContent = document.getElementById("SecondfullContent");

	if (shortContent.style.display === "none") {
	  shortContent.style.display = "block";
	  fullContent.style.display = "none";
	} else {
	  shortContent.style.display = "none";
	  fullContent.style.display = "block";
	}
  }

  function toggleThirdContent() {
	var shortContent = document.getElementById("ThirdshortContent");
	var fullContent = document.getElementById("ThirdfullContent");

	if (shortContent.style.display === "none") {
	  shortContent.style.display = "block";
	  fullContent.style.display = "none";
	} else {
	  shortContent.style.display = "none";
	  fullContent.style.display = "block";
	}
  }

// creating responsive navbar

let openHam = document.querySelector('#openHam');
let closeHam = document.querySelector('#closeHam');
let navigationItems = document.querySelector('#navigation-items');

const hamburgerEvent = (navigation, close, open) => {
    navigationItems.style.display = navigation;
    closeHam.style.display = close;
    openHam.style.display = open;
};

openHam.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));
closeHam.addEventListener('click', () => hamburgerEvent("none", "none", "block"));