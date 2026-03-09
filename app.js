(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
    if(document.body.classList.contains('dark-mode')){
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
});

// ডিফল্ট থিম: light
document.body.classList.add('light-mode');
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// Load saved theme if exists
if(localStorage.getItem('theme') === 'light') {
  body.classList.remove('dark-mode');
  body.classList.add('light-mode');
}

toggleBtn.addEventListener('click', () => {
  if(body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
});const toggle = document.getElementById('modeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
