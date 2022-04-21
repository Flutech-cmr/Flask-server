

var fetchattendance = function (id) {
    const projectname = id.split("-")[0];
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/DownloadAttendance/" + projectname, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            const allprojects = JSON.parse(xhr.responseText);
            if (allprojects["status"] == "failed") {
                toggleModal('modal-id')
            }
            else if (allprojects["status"] == "success") {
                // download file from server
                console.log("downloading file");
                var a = document.createElement("a");
                a.href = "/static/css/comingsoon.csv";
                a.download = projectname + ".csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

        }
    }
}

var populateTable = function (projectname) {
    let tboady = document.getElementById("attendancetable");
    let childelementcount = tboady.childElementCount;
    let tr = document.createElement("tr");
    tr.setAttribute("id", projectname + "-TR");
    if (childelementcount % 2 == 0) {
        tr.classList.add("bg-gray-50");
    }
    let td1 = document.createElement("td");
    td1.classList.add("p-4", "whitespace-nowrap", "text-sm", "font-normal", "text-gray-900");
    td1.innerHTML = projectname;
    let td2 = document.createElement("td");
    td2.classList.add("p-4", "whitespace-nowrap", "text-sm", "font-normal", "text-gray-900");
    let p = document.createElement("p");
    p.setAttribute("id", projectname + "-p");
    p.classList.add("hidden", "sm:inline-flex", "ml-5", "text-white", "bg-cyan-600", "hover:bg-cyan-700", "focus:ring-4", "focus:ring-cyan-200", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "items-center", "mr-3");
    p.innerHTML = "Download";
    p.onclick = function () {
        fetchattendance(this.id)
    }
    td2.appendChild(p);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tboady.appendChild(tr);
}

var GetProjectFromAPi = function () {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/loadprojects", true);
    xhr.send(null);
    xhr.onload = function () {
        if (xhr.status == 200) {
            const allprojects = JSON.parse(xhr.responseText);
            for (const [key, value] of Object.entries(allprojects)) {
                populateTable(value["Project Name"]);
            }
        }
    }
}

var PopulateProjects = function () {
    console.log("populated projects");
    GetProjectFromAPi();
    let graphdiv = document.getElementById("graphdiv");
    let graph
}