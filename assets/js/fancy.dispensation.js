function closeDisPopUp(){
    let cover = document.getElementById("prescription-modal");
    cover.style = 'display: none;';
    let prescription_content = document.getElementById('prescription-modal-content');
    prescription_content.innerHTML = "";
}

function fancyPopUP(order){
    let selected_row = document.getElementById(order.order_id);
    let amount_dispensed;
    let amount_needed;
    let available_pills = 0;

    if(drug_management_activated) {
        amount_needed = parseFloat(selected_row.getElementsByTagName('td')[3].innerHTML.replace("<p>","").replace("</p>",""));
        amount_dispensed = parseFloat(selected_row.getElementsByTagName('td')[4].innerHTML.replace("<p>","").replace("</p>",""));
        available_pills = parseFloat(selected_row.getElementsByTagName('td')[2].innerHTML.replace("<p>","").replace("</p>",""));
    }else{
        amount_needed = parseFloat(selected_row.getElementsByTagName('td')[2].innerHTML.replace("<p>","").replace("</p>",""));
        amount_dispensed = parseFloat(selected_row.getElementsByTagName('td')[3].innerHTML.replace("<p>","").replace("</p>",""));
    }


    if(amount_needed <= 0){
        showMessage("Already dispensed enough for this medication.");
        return;
    }

    let packs = packSizes(order);
    let cover = document.getElementById("prescription-modal");
    cover.style = 'display: inline;';
    let prescription_content = document.getElementById('prescription-modal-content');
    prescription_content.style = "height: 81%;";

    let div = document.createElement("div");
    div.setAttribute('id', "main-prescription-content");
    prescription_content.appendChild(div);

    prescription_table = `<table id="prescription-table">
        <thead>
           <tr><th colspan="4">${order.drug_name}</th><tr>
           <tr>
              <th style="width:145px;">Total tab(s) needed</th>
              <th>Available stock</th>
              <th>Dispensed</th>
              <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody="order-content">
            <tr>
                <td id="prescribed-pills">${amount_needed} tab(s)</td>
                <td id="available-stocks">&nbsp;</td>
                <td id="dispensed-packs">&nbsp;</td>
                <td id="dispensation-buttons">&nbsp;</td>
            </tr>
        </tbody>
    </table>`;
    //prescription_content.innerHTML = prescription_table;
    div.innerHTML = prescription_table;
    buildAvailableStocks(packs, available_pills);
    buildDispensedSection(packs,amount_dispensed);
    buildDispenstionBtns(packs);
    addFooter(prescription_content, order);
}

function buildAvailableStocks(packs, available_pills){

    let available_stocks = document.getElementById('available-stocks');
    let available_stock_table = `<table class="inner-tables">
        <tr>
            <th>Pack size</th>
            <th>Packs</th>
        </tr>`;
    for(let i = 0; i < packs.length; i++){
        let available_packs = 'N/A';
        if(available_pills >= 0)
            available_packs = (available_pills / packs[i]);

        available_stock_table += `<tr>
        <td class="pack-sizes">${packs[i]}</td>
        <td class="available-pack-sizes" id="available-pack-size-${packs[i]}">${available_packs}</td>
       </tr>`;
    }
    available_stock_table += '</table>';
    available_stocks.innerHTML = available_stock_table;
}

function buildDispensedSection(packs, amount_dispensed){

    let dispensed_packs = document.getElementById('dispensed-packs');
    let disspensed_pack_table = `<table class="inner-tables">
        <tr>
            <th>Total Tab(s)</th>
            <th>Packs</th>
        </tr>`;
    for(let i = 0; i < packs.length; i++){
        disspensed_pack_table += `<tr>
        <td class="amount-dispensed-tabs" id="amount-dispensed-tabs-${packs[i]}">${amount_dispensed}</td>
        <td class="amount-dispensed-packs" id="amount-dispensed-packs-${packs[i]}">0</td>
       </tr>`;
    }
    disspensed_pack_table += '</table>';
    dispensed_packs.innerHTML = disspensed_pack_table;
}

function buildDispenstionBtns(packs){
    let buttons_section = document.getElementById('dispensation-buttons');
    let button_table = `<table class="inner-tables"><tr><th>&nbsp;</th</tr>`;

    for(let i =0; i < packs.length; i++){
        button_table += `<tr>
            <td>${insertBTNS(packs[i])}</td>
        </tr>`;
    }
    button_table += '</table>';
    buttons_section.innerHTML = button_table;
}

function insertBTNS(pack_size){
    return `<table class="inner-tables button-tables">
     <tr>
        <td><button onmousedown="upDispensation(${pack_size})"><span>&#8593;</span></button></td>
     </tr>
     <tr>
        <td><button onmousedown="downDispensation(${pack_size})"><span>&#8595;</span></button></td>
     </tr>
    </table>`;
}

function upDispensation(pack_size){
//    let available_pack_size = document.getElementById(`available-pack-size-${pack_size}`);
    let amount_dispensed_tabs = document.getElementById(`amount-dispensed-tabs-${pack_size}`);
    let amount_dispensed_packs = document.getElementById(`amount-dispensed-packs-${pack_size}`);

    //if(parseInt(available_pack_size.innerHTML) > 0)
      //  available_pack_size.innerHTML = (parseInt(available_pack_size.innerHTML) - 1);

    amount_dispensed_tabs.innerHTML = (parseInt(amount_dispensed_tabs.innerHTML) + pack_size);
    amount_dispensed_packs.innerHTML = (parseInt(amount_dispensed_packs.innerHTML) + 1);
}

function downDispensation(pack_size){
//    let available_pack_size = document.getElementById(`available-pack-size-${pack_size}`);
    let amount_dispensed_tabs = document.getElementById(`amount-dispensed-tabs-${pack_size}`);
    let amount_dispensed_packs = document.getElementById(`amount-dispensed-packs-${pack_size}`);

//    if(parseInt(available_pack_size.innerHTML) > 0)
  //      available_pack_size.innerHTML = (parseInt(available_pack_size.innerHTML) + 1);

    if(parseInt(amount_dispensed_packs.innerHTML) > 0){
        amount_dispensed_tabs.innerHTML = (parseInt(amount_dispensed_tabs.innerHTML) - pack_size);
        amount_dispensed_packs.innerHTML = (parseInt(amount_dispensed_packs.innerHTML) - 1);
    }
}

function addFooter(e, order){
    let footer = `<div id="dispensation-main " class="dispensation-main">
        <button id="disp-btn" class="button green navButton dispensation-btns" 
        onmousedown="dispMeds(${order.order_id});"><span>Dispense</span></button>
        <button id="close-btn" class="button red navButton dispensation-btns" 
        onmousedown="closeDisPopUp()"><span>Close</span></button>
    </div>`;
    e.innerHTML += footer;
}

function packSizes(order) {
    let drug_id = order.drug_id;
    let packs = {
        '11': [ 30 ],
        '21': [ 25 ],
        '22': [ 60 ],
        '24': [ 30, 60, 90, 100 ],
        '30': [ 90 ],
        '39': [ 60 ],
        '73': [ 120 ],
        '74': [ 60 ],
        '76': [ 1000 ],
        '297': [ 30, 60, 90 ],
        '576': [ 30, 60, 90 ],
        '613': [ 60 ],
        '731': [ 60 ],
        '732': [ 60 ],
        '733': [ 60 ],
        '734': [ 30 ],
        '735': [ 30 ],
        '736': [ 60 ],
        '738': [ 60 ],
        '931': [ 30, 60, 90 ],
        '932': [ 30 ],
        '954': [ 60 ],
        '963': [ 30, 60, 90 ],
        '968': [ 60 ],
        '969': [ 30 ],
        '971': [ 30,60,90 ],
        '976': [ 60 ],
        '977': [ 30 ],
        '982': [ 30 ],
        '983': [ 30 ],
        '1039': [ 30,60,90 ],
        '1043': [ 60 ],
        '1044': [ 30],
        '1056': [ 24 ]
    }
    return (!packs[drug_id] ? [ 30 ] : packs[drug_id]);

}

var continue_to_dispensed = false;

function dispMeds(order_id){
    let amounts = document.getElementsByClassName('amount-dispensed-tabs');
    let prescribed_pills = parseFloat(document.getElementById('prescribed-pills').innerHTML.replace("tab(s)",""));
    let cover = document.getElementById('dispensation-cover');
    let error_msg = document.getElementById('dispensation-error-msg');
    let total_amount = 0;

    for(let i = 0; i < amounts.length; i++){
        total_amount += parseInt(amounts[i].innerHTML);
    }

    let dispensation_per = ((total_amount / prescribed_pills)*100)
    if(total_amount == 0){
        cover.style = 'display: inline;';
        let message = `<p class="message-text">You can <b>NOT</b> dispensed 0 tab(s)</p>`;
        message += `<p class="message-ctrls"><button id="close-btn" class="button red navButton dispensation-btns" 
        onmousedown="closeMsgPopUp()"><span>OK</span></button></p>`;
        error_msg.style = 'display: inline;';
        error_msg.innerHTML = message;
        return;
    }else if(dispensation_per > 110 && !continue_to_dispensed){
        cover.style = 'display: inline;';
        let message = `<p class="message-text">Are you sure you want to dispense over 110% of the prescribed pill count?</p>`;
        message += `<p class="message-ctrls"><button id="close-btn" class="button red navButton dispensation-btns" 
        onmousedown="closeMsgPopUp()"><span>No</span></button>&nbsp;`;
        message += `<button id="close-btn" class="button green navButton dispensation-btns" 
        onmousedown="continueDispense(${order_id})"><span>Yes</span></button></p>`;
        error_msg.style = 'display: inline;';
        error_msg.innerHTML = message;
        return
    }else if(dispensation_per < 100 && !continue_to_dispensed){
        cover.style = 'display: inline;';
        let message = `<p class="message-text">Are you sure you want to dispense less than 100% of the prescribe amount?</p>`;
        message += `<p class="message-ctrls"><button id="close-btn" class="button red navButton dispensation-btns" 
        onmousedown="closeMsgPopUp()"><span>No</span></button>&nbsp;`;
        message += `<button id="close-btn" class="button green navButton dispensation-btns" 
        onmousedown="continueDispense(${order_id})"><span>Yes</span></button></p>`;
        error_msg.style = 'display: inline;';
        error_msg.innerHTML = message;
        return
    }

    let packs_dispened = document.getElementsByClassName('amount-dispensed-packs');



    let drug_order = {dispensations: []};

    for(let i = 0; i < packs_dispened.length; i++){
        let bottle_num = parseInt(packs_dispened[i].innerHTML);
        if(bottle_num < 1)
            continue;
        
        let num_pack_size = parseInt(packs_dispened[i].innerHTML);
        let psize = packs_dispened[i].id.replace("amount-dispensed-packs-","");
        let tabs = document.getElementById(`amount-dispensed-tabs-${psize}`).innerHTML;
        let s = 1;

        //console.log(tabs);
        //console.log(num_pack_size);

        while(s <= num_pack_size){
            drug_order.dispensations.push({
                date: sessionStorage.sessionDate, 
                drug_order_id: order_id, 
                quantity: (tabs / num_pack_size)
            });
            s++;
        }
    }
    
    if(providerID != null) {
        drug_order.provider_id = providerID;
    }
    
    //console.log(drug_order)
    closeDisPopUp();
    submitParameters(drug_order, "/dispensations", "doneDispensing");


}

function closeMsgPopUp(){
    let error_msg = document.getElementById('dispensation-error-msg');
    let cover = document.getElementById('dispensation-cover');
    error_msg.style = 'display: none;';
    cover.style = 'display: none;';
}

function continueDispense(order_id){
    closeMsgPopUp();
    continue_to_dispensed = true;
    dispMeds(order_id);
}

var drug_management_activated = false;

function getGProperties() {
    let url = apiProtocol + "://" + apiURL + ":" + apiPort;
    url += "/api/v1/global_properties?property=activate.drug.management";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            drug_management_activated = (obj["activate.drug.management"] == "true" ? true : false);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

getGProperties();