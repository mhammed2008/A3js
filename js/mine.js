var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');

var addBtn = document.querySelector('#submit');
var updateBtn = document.querySelector('#update');
var htmlSitesList = document.querySelector('#htmlSitesList');
var validtionName = document.querySelector('#validationNameFeedback');
var validtionUrl = document.querySelector('#validationUrlFeedback');

var indexUpdate = 0;
var sites;

if (localStorage.getItem("sites")) {
    sites = JSON.parse(localStorage.getItem("sites"));
    displaysite(sites);
} else {
    sites = [];
    displaysite(sites);
}

addBtn.addEventListener('click', function () {
    addSite()
});

updateBtn.addEventListener('click', function () {
    Update()
});

siteName.addEventListener("keyup", function () {
    siteNameVa()
});

siteUrl.addEventListener("keyup", function () {
    siteUrlVa()
});

function addSite() {
    if (siteName.value && siteUrl.value) {
        if (siteNameVa() & siteUrlVa()) {
            sites.push({
                name: siteName.value,
                site: siteUrl.value
            })
            success("Your bookmark for this " + siteName.value + " site has been add");
            displaysite(sites)
            console.log('add');
            sevaToLocalStorage();
            clearInput()
        }
        else {
            errorMassge("Please check the errors and fix them");
        }

    } else {
        errorMassge("All fildes are requirde");
    }


}

function Update() {
    if (siteName.value && siteUrl.value) {
        if (siteNameVa() & siteUrlVa()) {

            sites[indexUpdate].name = siteName.value ;
            sites[indexUpdate].site = siteUrl.value;
            
            success("The site bookmarke Edited succssfully");
            displaysite(sites)
            sevaToLocalStorage();
            clearInput();
            updateBtn.classList.replace("d-block", "d-none");
            addBtn.classList.replace("d-none", "d-block");
        }
        else if (siteNameVa() === "nameError") {
            sites[indexUpdate].name = siteName.value;
            sites[indexUpdate].site = siteUrl.value;

            success("The site bookmarke Edited succssfully");
            displaysite(sites)
            sevaToLocalStorage();
            clearInput();
            updateBtn.classList.replace("d-block", "d-none");
            addBtn.classList.replace("d-none", "d-block");
        }
        else {
            errorMassge("Please check the errors and fix them");
        }

    } else {
        errorMassge("All fildes are requirde");
    }


}
function UpdateSite(index) {
    indexUpdate = index;
    siteName.value = sites[index].name;
    siteUrl.value = sites[index].site;
    updateBtn.classList.replace("d-none", "d-block");
    addBtn.classList.replace("d-block", "d-none");
    siteName.classList.remove('is-invalid');
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-invalid');
    siteUrl.classList.remove('is-valid');
}

function deleteSite(index) {
    Swal.fire({
        title: "warning if you Deleted this site can`t bee restored ",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Don't delete",
        confirmButtonColor: "green",
        icon: "warning",
        denyButtonText: `Delete`,
        denyButtonColor: `red`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
            sites.splice(index, 1);
            displaysite(sites)
            sevaToLocalStorage();
            success(" deleted successfully" )
        } else if (result.isConfirmed) {
            return false;
        }
    });


}

function displaysite(sitesList) {
    var box = ``;
    if (sitesList) {
        for (var i = 0; i < sitesList.length; i++) {
            box += `
            <tr >    
                <td class="p-3">${i + 1}</td>
                <td>${sitesList[i].name}</td>
                <td>
                    <a href="${sitesList[i].site}" target="_blank" class="btn btn-success ">
                        <i class="far fa-regular fa-eye pe-2"></i>
                        Visit
                    </a>
                </td>
                <td><button class="btn btn-danger "  onclick="deleteSite(${i})"><i class="fas fa-trash pe-2"></i>Deleted</button></td>
                <td><a href="#"><i onclick="UpdateSite(${i})" class="fas fa-pen pe-2"></i></a></td>
            </tr>
            `
        }
        htmlSitesList.innerHTML = box;
    }
}

function clearInput() {
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove('is-invalid');
    siteUrl.classList.remove('is-invalid');
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');
}

function sevaToLocalStorage() {
    localStorage.setItem("sites", JSON.stringify(sites))
}

function success(messge) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: messge,
        showConfirmButton: true,
        timer: 3000
    });
}

function errorMassge(messge) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: messge,
        showConfirmButton: true,
        timer: 3000
    });

}


function siteNameVa() {
    var error = false;
    var messge = "";
    var regexName = /^[A-Za-z0-9]{3,}/;
    for (var i = 0; i < sites.length; i++) {
        if (siteName.value === sites[i].name ) {
            error = true;
            break
        }
    }
    if (regexName.test(siteName.value) & !error) {
        console.log('dfdfsfasf')
        siteName.classList.toggle('is-invalid') ?
            siteName.classList.replace('is-invalid', 'is-valid') : siteName.classList.add('is-valid');
        return true;
    } else if (error) {
        messge = "The site Name has Ordey been used";
        siteName.classList.toggle('is-valid') ?
            siteName.classList.replace('is-valid', 'is-invalid') : siteName.classList.add('is-invalid');
        validtionName.innerHTML = messge;
        validtionName.classList.replace('d-none', 'd-blok');
        return false, "nameError";
    } else {
        messge = "The Name min is 3 and don`t use special characters ";
        siteName.classList.toggle('is-valid') ?
            siteName.classList.replace('is-valid', 'is-invalid') : siteName.classList.add('is-invalid');
        validtionName.innerHTML = messge;
        validtionName.classList.replace('d-none', 'd-blok');
        return false;
    }

}

function siteUrlVa() {
    
    var regexUrl = /^htt(ps|p)?:\/\/.+?\..+$/;
    
    if (regexUrl.test(siteUrl.value) ) {

        siteUrl.classList.toggle('is-invalid') ?
            siteUrl.classList.replace('is-invalid', 'is-valid') : siteUrl.classList.add('is-valid');
        return true;
    } else {
        siteUrl.classList.toggle('is-valid') ?
            siteUrl.classList.replace('is-valid', 'is-invalid') : siteUrl.classList.add('is-invalid');
        validtionUrl.innerHTML = "The url is invalid" ;
        validtionUrl.classList.replace('d-none', 'd-blok');
        return false;
    }
}