const contact_phone = "+1(000)-000-0000";
const contact_email = "info@example.com";
const contact_address = "4373 Lennox Drive, South Jordan, UT 84009";
const mobile_menu = document.getElementById('mobile-menu');
const menu_open_btn = document.getElementById('menu-open');
const mobile_menu_bg_blocker = document.getElementById('mobile-menu-bg-blocker');


window.addEventListener('scroll', function () {
    const hero_header = document.getElementById('hero-header');
    const navbar = document.getElementById('navbar');
    const nav_link_item = document.querySelectorAll(".nav-link-item");
    const logo_text = document.getElementById("logo-text");
    // const nav_links_div = document.getElementById("nav-links-div");
    const menu_open_svg = document.getElementById("menu-open-svg");
  
    if ( (window.scrollY ) > (hero_header.offsetHeight - 160) ) {

        navbar.style.backgroundColor = "#6f16eb"; //0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) 
               
        nav_link_item.forEach(item => {
            item.style.color = "white"; 
        })
        logo_text.style.color = "white"
        // nav_links_div.style.borderBlockColor = "white";
        menu_open_svg.style.stroke = "#ffffff";
        console.log(menu_open_svg);
    } else {
        navbar.style.backgroundColor = "#FFFFFF";
        nav_link_item.forEach(item => {
            item.style.color = "black"; 
        })
        logo_text.style.color = "black";
        // nav_links_div.style.borderBlockColor = "#374151bf";
        menu_open_svg.style.stroke = "#000000";
        console.log(menu_open_svg);
        
    }
});



    menu_open_btn.addEventListener('click', function() {
        mobile_menu.classList.remove('custom-left-full');
        mobile_menu.classList.add('custom-width-full');
        mobile_menu_bg_blocker.classList.remove('hidden')
        mobile_menu_bg_blocker.classList.add('mobile-menu-bg-blocker')
    })

    const menu_close_btn = document.getElementById('menu-close');

    menu_close_btn.addEventListener('click', function() {
        mobile_menu.classList.remove('custom-width-full');
        mobile_menu.classList.add('custom-left-full');
        mobile_menu_bg_blocker.classList.remove('mobile-menu-bg-blocker')
        mobile_menu_bg_blocker.classList.add('hidden')
    })

window.addEventListener('scroll', reveal);               

function reveal() {
    let reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = 0;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add("arrived");
            } else {
                reveals[i].classList.remove("arrived")
            }
    } 
    
    
}

const chat_open_btn = document.getElementById("chat-open-btn");
const chat = document.getElementById("chat");
const chat_close = document.getElementById("chat-close");
const chat_body = document.getElementById("chat-body");

let chatOpening = false;

chat_open_btn.addEventListener("click", () => {
    if (!chatOpening) {
        chat.classList.toggle("hidden");
        if (!chat.classList.contains("hidden")) {
            chatOpening = true;
            chat_start().then(() => {
                chatOpening = false;
                ask_questions();
            });
        } else {
            chatOpening = false;
        }
    }
});

chat_close.addEventListener("click", () => {
    chat.classList.add("hidden");
    chatOpening = false;
});

const chat_responses = {
    "welcome": ["Hi",
        "I am here to answer questions you may have about Life Care Community.",
        ],
        "questions": {
            "Just saying hi": [
                "Hi",
                "I hope life is good with you.",
                "Feel free to navigate our website to know more.",
            ],
            "What is Life Care Community?": [
                "Life Care Community is an organization dedicated to empowering the lives of individuals with developmental disabilities by providing person-centered care.",
                { linkText: "Learn more on our About Us page", link: `${window.location.origin + '/life-care-source-website'}/Pages/about-us.html` }
            ],
            "What services do you offer?": [
                "Services we offer include residential support, adult educational day services, respite care, host homes and more others.",
                "Check out more of our services from the services menu.",
            ],
            "How can I donate?": [
                "Your donations help us provide better services and support for individuals with developmental disabilities.",
                { linkText: "Visit our Donate page to make a contribution", link: `${window.location.origin + '/life-care-source-website'}/Pages/donate.html` }
            ],
            "How do I contact you?": [
                `You can send us a message on ${contact_email}`,
                "You can also contact us through our contact us page.",
                { linkText: "Visit our contact us page", link: `${window.location.origin + '/life-care-source-website'}/Pages/contact-us.html` }
            ],
        },
    
}

const chat_start = () => {
    return new Promise((resolve) => {
        chat_body.innerHTML = "";
        chat_responses.welcome.map((response, index) => {
            setTimeout(() => {
                chat_body.innerHTML += `
                <div class="chat-responses">
                    <span
                        class="chat-response-item"
                    >
                        ${response}
                    </span>
                </div>
                `
                
              if (index === chat_responses.welcome.length - 1) {
                resolve();
              }
            }, (index + 1) * 400)
        })
    })
}
const ask_questions = () => {
    setTimeout(() => {
        chat_body.innerHTML += `
        <div class="chat-responses">
            <span class="chat-response-item questions-starter" >
                How else can I assist you today?
            </span>
        </div>
        <div class="chat-responses ask-questions">        
            <span
                class="chat-question-item questions-unroll"
            >
                Ask a question
            </span>
        </div>` 
        chat_body.scrollTop = chat_body.scrollHeight;

        let length = document.querySelectorAll(".ask-questions").length;
        let length2 = document.querySelectorAll(".questions-unroll").length;
        
        document.querySelectorAll('.questions-unroll')[length2 - 1].addEventListener('click', function () {
            document.querySelectorAll(".ask-questions")[length - 1].style.display = 'none';
            questions_display();
        });
    }, 400)
}
const questions_display = () => {
    setTimeout(() => {
        chat_body.innerHTML += `
        <div class="chat-responses">
            <h6 class="chat-questions-notifier">Choose a question</h6>
        </div>
        `
        Object.keys(chat_responses.questions).map((question) => {
            chat_body.innerHTML += `
            <div class="chat-responses">        
                <span
                    class="chat-question-item question-item"
                    data-question="${question}"
                >
                    ${question}
                </span>
            </div>`
        }) 
        chat_body.scrollTop = chat_body.scrollHeight;

        document.querySelectorAll('.question-item').forEach(item => {
            item.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                onQuestionClick(question).then(ask_questions);
            });
        });

    }, 400)
    
}

const onQuestionClick = (question_key) => {
    return new Promise((resolve) => {
        const length = chat_responses.questions[question_key].length;
        setTimeout(() => {
            chat_body.innerHTML += `
                <div class="chat-sent-questions">
                    <span class="chat-sent-question-item">
                        ${question_key}
                    </span>
                </div>
            `
            chat_body.scrollTop = chat_body.scrollHeight;
        }, 400)
        chat_responses.questions[question_key].map((response, index) => {
            setTimeout(() => {
                if ((typeof response) === "object") {
                    chat_body.innerHTML += `
                        <div class="chat-responses">
                            <span
                                class="chat-response-item"
                            >
                                <a class="chat-response-link" href="${response.link}">${response.linkText}</a>
                            </span>
                        </div>
                        `
                } else {
                    chat_body.innerHTML += `
                        <div class="chat-responses">
                            <span
                                class="chat-response-item"
                            >
                                ${response}
                            </span>
                        </div>
                        `
                }
                chat_body.scrollTop = chat_body.scrollHeight;
                if (index === length - 1) {
                    resolve();
              }
            }, (index + 2) * 400)
        })
    })
}

// window.onload = () => {
    document.querySelectorAll(".contact-phone").forEach(item => {
        item.innerHTML = contact_phone;
        item.href = `tel:${contact_phone}`
    })
    document.querySelectorAll(".contact-email").forEach(item => {
        item.innerHTML = contact_email;
        item.href = `mailto:${contact_email}`
    })
    document.querySelectorAll(".contact-address").forEach(item => {
        item.innerHTML = contact_address;
        item.href = "https://maps.app.goo.gl/irqkFz5tzQ2ky1QdA"
    })
    document.querySelectorAll(".contact-phone-icon").forEach(item => {
        item.href = `tel:${contact_phone}`
    })
    document.querySelectorAll(".contact-email-icon").forEach(item => {
        item.href = `mailto:${contact_email}`
    })
    document.querySelectorAll(".contact-address-icon").forEach(item => {
        item.href = "https://maps.app.goo.gl/irqkFz5tzQ2ky1QdA"
    })
// }


document.addEventListener('DOMContentLoaded', () => {
    
    // Adding logo for index.html
    document.querySelectorAll(".logo-img-home").forEach(item => {
        item.src = './Images/logo.jpg';
    })

    // Adding logo for other html pages
    document.querySelectorAll(".logo-img-others").forEach(item => {
        item.src = '../Images/logo.jpg';
    })
});



