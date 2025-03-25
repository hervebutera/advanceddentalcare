const revealJobDescription = (e) => {
    e.target.closest('button').parentElement.parentElement.querySelector(".hidden-job-details").classList.toggle("display-job-details");
    e.target.closest('button').querySelector("svg").classList.toggle("icon-rotate");
}

