var providerID = null;
var providerName = null;
var programID = sessionStorage.getItem("programID");
function showProviderModal() {

    document.getElementById('regimen-change-cover').style.zIndex = 0;
    var providerModal = document.createElement('div');
    providerModal.setAttribute('id', 'provider-modal');
    providerModal.setAttribute('class', 'provider-modal');

    var modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'provider-modal-content');
    providerModal.appendChild(modalContent);
    
    var modalHeader = document.createElement('div');
    modalHeader.setAttribute('class', 'provider-modal-header');
    modalHeader.innerHTML= '<h2 style="margin-top: 0; color: white; padding: 10px;">Please select provider </h2>';
    modalContent.appendChild(modalHeader);
    
    var modalBody = document.createElement('div');
    modalBody.setAttribute('id', 'provider-body');
    modalBody.setAttribute('class', 'provider-modal-body');

    getProviders(modalBody); 
    
    modalContent.appendChild(modalBody);
    
    var modalFooter = document.createElement('div');
    modalFooter.setAttribute('class', 'provider-modal-footer');
    modalFooter.innerHTML = '<span class="select-button activated-btn" id="set-provider" onclick="setProvider()" >Confirm</span> '
    modalContent.appendChild(modalFooter);
    
    document.getElementById('content').appendChild(providerModal);
    providerModal.style.display = "block";
    
}

function changeModalHeader() {
    var field = $("touchscreenInput" + tstCurrentPage);
        var modalHeader = document.getElementsByClassName('provider-modal-header')[0];
        modalHeader.innerHTML = '<h2 style="margin-top: 0; color: white; padding: 10px;">Select assistant circumciser </h2>';
        modalHeader.style.color= "white"
    }

function getProviders(modalBody){
    var url = 'http://'+apiURL+':'+apiPort+'/api/v1/users?role=Superuser' ;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){

    if (this.readyState == 4) {
    if (this.status == 200) {
        var items = JSON.parse(this.responseText);
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'provider-list');
        for (let index = 0; index < items.length; index++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'providers');
            li.setAttribute('provider-id', items[index].person_id);
            li.innerHTML = items[index].username ; 
            try{
                li.innerHTML += ` ( ${items[index].person.names[0].family_name}  ${items[index].person.names[0].family_name} ) `;
            }catch(e) {

            }
            li.setAttribute('onclick', 'selectProvider(this)');
            ul.appendChild(li);
        }

        modalBody.appendChild(ul);
    }
    }
    };
    try {
    req.open('GET', url, true);
    req.setRequestHeader('Authorization',sessionStorage.getItem('authorization'));
    req.send(null);
    } catch (e) {
}
}

function selectProvider(element) {
        var items = document.getElementsByClassName("providers active");
        for (let index = 0; index < items.length; index++) {
            items[index].className = "providers";
        }
        element.className = "providers active";
        
}

function setProvider() {
    var providerElemnt = document.getElementsByClassName("providers active");
    if(providerElemnt.length > 0) {
        providerID =  providerElemnt[0].getAttribute("provider-id");
        providerName =  providerElemnt[0].innerHTML;
        document.getElementById("provider-modal").style.display = "none";
        var elem = document.getElementsByClassName("provider-list")[0];
        elem.remove();
    }else {
        showMessage("please select a provider from the list");
    }
}

function checkIfInBDMode(){
    if (sessionStorage.session === "true") {
        showProviderModal();
    }else {
    }
    
    return true;
}

