let allProjects = [];

fetch('/ica/final/projects.json')
    .then(response => response.json())
    .then(data => {
        allProjects = data.projects;
        displayProjects(allProjects);
        console.log("working");
    })
    .catch(error => console.error('Error fetching the JSON:', error));

function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Clear previous projects
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';

        projectElement.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <img id="projectImage-${project.title}" src="${project.image1}" alt="${project.title}">
            <a href="${project.link}" target="_blank">View Project</a>
            <button onclick="changeImage('${project.title}', '${project.image2}')">Change Image</button>
        `;

        projectsContainer.appendChild(projectElement);
    });
}

function changeImage(title, newImageSrc) {
    const image = document.getElementById(`projectImage-${title}`);
    image.src = newImageSrc;
}

document.getElementById('filterButton').addEventListener('click', function() {
    const keyword = document.getElementById('filterInput').value.toLowerCase();
    const filteredProjects = allProjects.filter(project => project.title.toLowerCase().includes(keyword));
    displayProjects(filteredProjects);
});
