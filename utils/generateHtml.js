function emailLinkHtml(email) {
    return `<a href="mailto:${email}">${email}</a>`;
}

function githubLinkHtml(username) {
    return `<a target="_blank" href="https://github.com/${username}">${username}</a>`;
}

function card(memberData, number) {
    return `
        <div class="card" style="width: 18rem;">
            <div class="card-body" style="background-color: rgb(0, 145, 255);">
                <h5 class="card-title" id="name_${number}">${memberData[`nameFrom_${number}`]}</h5>
                <p class="card-text" id="role_${number}">${memberData[`roleFrom_${number}`]}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" id="id_${number}">ID: ${number}</li>
                <li class="list-group-item" id="email_${number}">Email: ${emailLinkHtml(memberData[`emailFrom_${number}`])}</li>
                <li class="list-group-item" id="github_${number}">GitHub: ${githubLinkHtml(memberData[`githubFrom_${number}`])}</li>
            </ul>
        </div>
    `
}

function generateHtml(data) {
    console.log(data);
    return "";
    const htmlCards = data.map((memberData, index) => {
        const number = index + 1;
        return card(memberData, number);
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <style>
.navbar {
    padding-bottom: 50px;
    margin-bottom: 20px;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.wrapper > .card {
  flex: 1 1 200px;
}
    </style>
    <title>Team Profile Generator</title>
</head>
<body>
    <div class="container text-center">
        <div class="text-center">
            <nav class="navbar bg-light">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">My team</span>
                </div>
            </nav>
        </div>
        <div class="wrapper">
            ${htmlCards}
        </div>
    </div>
</body>
</html>
    `;
}

module.exports = generateHtml;