const jobPosting = document.querySelector('.jobPosting');
const filterForm = document.querySelector('.filterForm');
const closeBtn = document.querySelector('.mobileFilterMenuCloseBtn');
const openBtn = document.querySelector('.openFilterBtn');
const mobileFilterMenu = document.querySelector('.mobileFilterMenu');
const mobileFilterForm = mobileFilterMenu.querySelector("form");

mobileFilterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationValue = mobileFilterForm["filteredLocation"].value.toLowerCase();
  const fullTimeOnly = mobileFilterForm["contractFilter"].checked;
  render({
    location: locationValue,
    fullTimeOnly: fullTimeOnly,
  });
  mobileFilterMenu.close();
});



function handleSubmit(e) {
  e.preventDefault();
  render({
    filter: filterForm["filter"].value.toLowerCase(),
    location: filterForm["filteredLocation"].value.toLowerCase(),
    fullTimeOnly: filterForm["contractFilter"].checked,
  });
}

filterForm.addEventListener('submit', handleSubmit);

async function render({filter = '', location = '', fullTimeOnly = false}) {
  const data = await fetch("./data.json").then((x) => x.json());
  // debugger;
  jobPosting.innerHTML = data
    .filter((x) => {
      const filterMatch = x.position.toLowerCase().includes(filter) || x.company.toLowerCase().includes(filter);
      const locationMatch = x.location.toLowerCase().includes(location);
      // let contractMatch = x.contract === "Full Time";
      // if(!fullTimeOnly) {
      //   contractMatch = true;
      // } 
      const contractMatch = !fullTimeOnly || x.contract === "Full Time";
      // console.log(contractMatch)
      // console.log(x.position);
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

openBtn.addEventListener("click", () => {
 mobileFilterMenu.showModal();
})

closeBtn.addEventListener("click", () => {
 mobileFilterMenu.close();
})

render({ });

