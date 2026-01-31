document.addEventListener('DOMContentLoaded', () => {
  fetch('publications.json')
    .then(response => response.json())
    .then(data => {
      const groups = {
        'enc': document.getElementById('enc-list'),
        'ipopt': document.getElementById('ipopt-list'),
        'pce': document.getElementById('pce-list')
      };

      for (const [groupName, element] of Object.entries(groups)) {
        if (!element) continue;

        const entries = data.filter(entry => entry.resGroup === groupName);

        entries.forEach(entry => {
          const li = document.createElement('li');
          li.className = 'pubentry';
          li.innerHTML = renderEntry(entry);
          element.appendChild(li);
        });
      }
    })
    .catch(error => console.error('Error loading publications:', error));
});

function renderEntry(entry) {
  const authors = entry.authors ? entry.authors.join(", ") : "";
  let html = "";
  if (entry.comment) {
    html += `<b>${entry.comment} </b>`;
  }
  html += `${authors}, <i>${entry.title},</i> `;
  if (entry.category === 'journal') {
    html += `${entry.journal}, ${entry.pos ? entry.pos + ', ' : ''}${entry.year}`;
  } else {
    html += `${entry.conf}, ${entry.year}`;
  }

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
