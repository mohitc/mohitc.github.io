document.addEventListener('DOMContentLoaded', () => {
    fetch('publications.json')
        .then(response => response.json())
        .then(data => {
            const sections = [
                { category: "journal", listId: "journal-list" },
                { category: "conf", listId: "conf-list" },
                { category: "invited", listId: "invited-list" },
                { category: "chapter", listId: "chapter-list" }
            ];

            sections.forEach(section => {
                const listElement = document.getElementById(section.listId);
                if (listElement) {
                    const entries = data.filter(entry => entry.category === section.category);
                    populateSection(listElement, entries);
                }
            });
        })
        .catch(error => console.error('Error loading publications:', error));
});

function populateSection(listElement, entries) {
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'pubentry';
        li.innerHTML = renderEntry(entry);
        listElement.appendChild(li);
    });
}

function renderEntry(entry) {
    const authors = entry.authors ? entry.authors.join(", ") : "";
    let html = "";
    if (entry.comment) {
        html += `<b>${entry.comment} </b>`;
    }
    html += `${authors}, <i>${entry.title},</i> `;

    if (entry.category === 'journal') {
        html += `${entry.journal}, ${entry.pos ? entry.pos + ', ' : ''}${entry.year}`;
    } else if (entry.category === 'chapter') {
        html += `${entry.booktitle}, ${entry.pages ? entry.pages + ', ' : ''}${entry.year}`;
    } else {
        html += `${entry.conf}, ${entry.year}`;
    }
    html += `,`;

    if (entry.doi) {
        html += ` <a href="${entry.doi}" target="_blank">[doi]</a>`;
    }
    if (entry.bib) {
        html += ` <a href="./citations/${entry.bib}" target="_blank">[bib]</a>`;
    }
    if (entry.pdf) {
        html += ` <a href="./pdf/${entry.pdf}" target="_blank">[pdf]</a>`;
    }
    return html;
}
