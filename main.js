document.getElementById("issueInputForm").addEventListener('submit', submitIssue);


function submitIssue(e) {
  const description = document.getElementById("issueDescription").value;
  const severity = document.getElementById("issueSeverity").value;
  const assignedTo = document.getElementById("issueAssignedTo").value;
  const status = "Open";
  const id = Math.floor(Math.random() * 1000000) + '';
  const issue = { id, description, severity, assignedTo, status };

  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  totalIssue();
  totalOpenIssue();
  fetchIssues();
  e.preventDefault();
  document.getElementById("issueInputForm").reset();
}


const totalIssue = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  document.getElementById("total-issue").innerHTML = issues.length;
}
totalIssue();
const totalOpenIssue = () => {
  let openIssues = 0;
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.forEach(element => {
    if (element.status === "Open") {
      openIssues += 1
    }
  });
  document.getElementById("total-open-issue").innerHTML = openIssues;
}
totalOpenIssue();


const deleteIssue = (event, id) => {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  document.getElementById(`issue-card-${id}`).style.display = "none";
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  totalIssue();
  totalOpenIssue();

}

const issueSetClosed = (event, id) => {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = "Closed";
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalOpenIssue();
  document.getElementById(`issue-title-${id}`).style.textDecoration = "line-through";

}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issueList = document.getElementById("issuesList");
  issueList.innerHTML = ' ';
  for (let i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    issueList.innerHTML += `
  <div id ="issue-card-${id}" class="well">
    <h4>Issue ID : ${id}</h4>
    <p><span class="label label-info">${status}</span></p>
    <h2 id="issue-title-${id}">${description}</h2>
    <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
    <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
    <a href="#" onclick="issueSetClosed(event, ${id})"  class="btn btn-warning">Close</a>
    <a href="#" onclick="deleteIssue(event, ${id})"  class="btn btn-danger">Delete</a>
  </div>`;
  }
}
