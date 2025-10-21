
const sidebar = document.getElementById("sidebar");
const toggleButton = document.getElementById("toggleSidebar");
const navItems = document.querySelectorAll(".nav-item");

let isCollapsed = false;
//  open & close sidebar
toggleButton.addEventListener("click", function () {
    isCollapsed = !isCollapsed;

    if (isCollapsed) {
        sidebar.classList.add("collapsed");
        sidebar.classList.remove("w-64");
        sidebar.classList.add("w-24");
        toggleButton.querySelector("i").classList.add("rotate-180");
    } else {
        sidebar.classList.remove("collapsed");
        sidebar.classList.remove("w-24");
        sidebar.classList.add("w-64");
        toggleButton.querySelector("i").classList.remove("rotate-180");
    }
});


//  
{
const currentPath = window.location.pathname;
navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (currentPath === href) {
        item.classList.add('bg-blue-500', 'text-white');
        item.classList.remove('text-blue-500');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.remove('bg-blue-500', 'text-white');
        item.classList.add('text-blue-500');
    });
});}