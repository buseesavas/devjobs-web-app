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
      <div class="post"
      data-description="${x.description}"
      data-logo="${x.logo}"
      data-background="${x.logoBackground}"
      data-company="${x.company}"
      data-link="${x.website}"
      data-time="${x.postedAt}"
      data-contract="${x.contract}"
      data-position="${x.position}"
      data-location="${x.location}"
      data-content="${x.requirements.content}"
      data-items='${JSON.stringify(x.requirements.items)}'
      data-roleitems='${JSON.stringify(x.role.items)}'
      data-role="${x.role.content}">
        <div style="background-color: ${x.logoBackground}" class="logo">
          <img src="${x.logo}" alt="">
        </div>
        <p class="gray-text">${x.postedAt} • ${x.contract}</p>
        <h2>${x.position}</h2>
        <p class="gray-text company">${x.company}</p>
        <p class="location">${x.location}</p>
      </div>
    `).join(' ');
  showDetail();
}

openBtn.addEventListener("click", () => {
 if (window.innerWidth <= 768) { 
    mobileFilterMenu.showModal();
  }
})

closeBtn.addEventListener("click", () => {
 mobileFilterMenu.close();
})

const themeSwitch = document.querySelector(".themeSwitch");

let currentTheme = localStorage.getItem("theme") || "1";

document.body.setAttribute("data-theme", currentTheme);

if (currentTheme === "2") {
  themeSwitch.checked = true;
}
themeSwitch.addEventListener("change", function () {
  if (currentTheme === "1") {
    document.body.setAttribute("data-theme", "2");
    currentTheme = "2";
  } else {
    document.body.setAttribute("data-theme", "1");
    currentTheme = "1";
  }
  localStorage.setItem("theme", currentTheme);
});

function showDetail() {
  const detailsBox = document.querySelector('.detailsBox');
  const posts = document.querySelectorAll('.post');
  for (const post of posts) {
    post.addEventListener("click", function() {
      jobPosting.innerHTML = '';
      console.log(this.dataset.logoBackground);
      filterForm.innerHTML = '';
      const items = JSON.parse(this.dataset.items); 
      const roleitems = JSON.parse(this.dataset.roleitems); 
      detailsBox.innerHTML = `
      <div class="detailTitle">
          <div class="titleName">
             <div style="background-color: ${this.dataset.background}" class="detailLogo">
               <img src="${this.dataset.logo}" alt="Company Logo">
             </div>
             <div class="companyLink">
               <h4>${this.dataset.company}</h4>
               <p>${this.dataset.company.toLowerCase()}.com</p>
             </div>
          </div>
          <button class="companyBtn">
            <a href="${this.dataset.link}">Company Site</a>
          </button>
        </div>
      <div class="detailBox">
        <div class="detailsBoxTitle">
          <div class="titleInfo">
            <p>${this.dataset.time}<span></span>${this.dataset.contract}</p>
            <h1>${this.dataset.position}</h1>
            <h5>${this.dataset.location}</h5>
          </div>
          <button class="applyBtn"><a href="#">Apply Now</a></button>
        </div>
        <div class="detail">
         <p class="description">${this.dataset.description}</p>
         <div class="requirements">
           <h6>Requirements</h6>
           <p>${this.dataset.content}</p>
           <ul>
             ${items?.map((x) => `<li>${x}</li>`).join('')}
           </ul>
         </div>
         <div class="tasks">
           <h6>What You Will Do</h6>
           <p>${this.dataset.role}</p>
           <ol>
             ${roleitems?.map((x) => `<li>${x}</li>`).join('')}
           </ol>
         </div>
        </div>
      </div>
      
      `
    });
  }
}

render({ });

