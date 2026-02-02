let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// --- LÓGICA DE SCROLL E MENU ---
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// --- LÓGICA DE ENVIO DE E-MAIL (EMAILJS) ---
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const submitBtn = contactForm.querySelector('input[type="submit"]');
    const originalBtnText = submitBtn.value;
    
    // Feedback visual para o usuário
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    // Envio dos dados usando seus IDs das capturas de tela
    // service_lcprn91 e template_7b8f4ql
    emailjs.sendForm('service_lcprn91', 'template_7b8f4ql', this)
       // Substitua o bloco .then() do seu emailjs.sendForm por este:
.then(() => {
    const status = document.getElementById('form-status');
    status.innerHTML = "Message sent successfully! ✅";
    status.className = "form-message success";
    
    contactForm.reset();
    submitBtn.value = originalBtnText;
    submitBtn.disabled = false;

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        status.style.display = "none";
    }, 5000);

}, (error) => {
    const status = document.getElementById('form-status');
    status.innerHTML = "Ops! Something went wrong. ❌";
    status.className = "form-message error";
    
    submitBtn.value = originalBtnText;
    submitBtn.disabled = false;
});
});