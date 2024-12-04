const jobPosting = document.querySelector('.jobPosting');
const filterForm = document.querySelector('.filterForm');


function handleSubmit(e) {
  e.preventDefault();
  loadPosts({
    filter: filterForm["filter"].value.toLowerCase(),
    location: filterForm["filteredLocation"].value.toLowerCase(),
    fullTimeOnly: filterForm["contractFilter"].checked,
  });
}

filterForm.addEventListener('submit', handleSubmit);

async function loadPosts({filter = '', location = '', fullTimeOnly = false}) {
  const data = await fetch("./data.json").then(
    (x) => x.json()
  );

  jobPosting.innerHTML = '';
  jobPosting.innerHTML += data
    .filter((x) => {
      const filterMatch = x.position.toLowerCase().includes(filter) || x.company.toLowerCase().includes(filter);
      const locationMatch = x.location.toLowerCase().includes(location);
      const contractMatch = !fullTimeOnly || x.contract === "Full Time";
      console.log(contractMatch)
      return filterMatch && locationMatch && contractMatch;
    })
    .map((x) => `
      <div class="post">
        <div style="background-color: ${x.logoBackground}" class="logo">
          <img src="${x.logo}" alt="">
        </div>
        <p class="gray-text">${x.postedAt} • ${x.contract}</p>
        <h2>${x.position}</h2>
        <p class="gray-text company">${x.company}</p>
        <p class="location">${x.location}</p>
      </div>
    `).join(' ');

}
loadPosts({ });