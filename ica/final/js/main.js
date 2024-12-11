fetch('/ica/final/projects.json')
    .then(response => response.json())
    .then(data => {
        displayProjects(data.projects);
        console.log("working")
    })
    .catch(error => console.error('Error fetching the JSON:', error));

    function displayProjects(projects) {
        const projectsContainer = document.getElementById('projects');
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
    
            projectElement.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <img src="${project.image1}" alt="${project.title}">
                <a href="${project.link}" target="_blank">View Project</a>
            `;
    
            projectsContainer.appendChild(projectElement);
        });
    }    