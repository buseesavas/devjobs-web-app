const jobPosting = document.querySelector('.jobPosting');
const filterForm = document.querySelector('.filterForm');


function handleSubmit(e) {
  e.preventDefault();
  loadPosts({
    filter: filterForm["filter"].value.toLowerCase()
  });
}

filterForm.addEventListener('submit', handleSubmit);

async function loadPosts({filter = '', location = '', fullTimeOnly = false}) {
  const data = await fetch("./data.json").then(
    (x) => x.json()
  );

  jobPosting.innerHTML = '';
  jobPosting.innerHTML += data
  .filter(x => x.position.toLowerCase().includes(filter) || x.company.toLowerCase().includes(filter))  
  .map((x) => `
    <div class="post">
      <div style="background-color: ${x.logoBackground}" class="logo">
        <img src="${x.logo}" alt="">
      </div>
      <p>${x.postedAt} . ${x.contract}</p>
      <h2>${x.position}</h2>
      <p>${x.company}</p>
    </div>
  `).join(' ');

}
loadPosts({ });