// use 'esversion: 6';

class ttTabsPlugin {
    load(target, records, newClient) {
        let left_content = `<div class="inner-duplicate-table">`;
        let unsorted_score = [];
        records.forEach((item) => {
            let score = item.score * 100;
            unsorted_score.push(score);
        });

        unsorted_score = unsorted_score.sort().reverse();
        let clients = [];

        for(const sc of unsorted_score){
            records.forEach((item) => {
                if(sc != (item.score * 100))
                    return;

                if(clients.indexOf(item.person) >= 0)
                    return;

                clients.push(item.person);
                let person = item.person;
                let birthdate = (person.birthdate ? moment(person.birthdate).format("DD/MMM/YYYY") : 'N/A');
                left_content += `<div class="inner-duplicate-table-row">
                    <div id="client-${person.id}" class="inner-duplicate-table-cell client-cards">
                        <table>
                            <tr>
                                <th colspan="2" style="border-style: solid; border-width: 0px 0px 1px 0px;font-size: 20px; 
                                    text-align: right; padding-bottom: 10px;">
                                        ${item.score * 100}%
                                </td>
                            </tr>
                            <tr>
                                <td>Name:</td><th>${person.given_name}&nbsp;${person.family_name}</th>
                            </tr>
                            <tr>
                                <td>DOB:</td><th>${birthdate}&nbsp;${person.gender ? '(' + person.gender + ')' : null}&nbsp;</th>
                            </tr>
                        </table>
                    </div>
                </div>`;
            });
         }

        clients = [];
        left_content += "</div>";

        let innerContent = `<div class="duplicate-table">
            <div class="duplicate-table-row">
                <div class="duplicate-table-cell" id="duplicate-table-cell-left">
                    <div style="overflow: auto; height: 70vh;">${left_content}</div>
                </div>
                <div class="duplicate-table-cell" id="duplicate-table-cell-right">${this.rightDiv(newClient)}</div>
            </div>
        </div>`;

        target.innerHTML = innerContent;
        records.forEach((item) => {
            let person = item.person;
            let div = document.getElementById(`client-${person.id}`);
            div.addEventListener("click", () => {
                setDOCID(`'${person.id}'`);
                this.calculateScore(item, newClient);
            });
        });
    }

    calculateScore(el, newClient){
        const score = el.score * 100;
        const person = el.person;
        let birthdate = (person.birthdate ? moment(person.birthdate).format("DD/MMM/YYYY") : 'N/A');
        let gender = person.gender ? person.gender.toUpperCase() : '';
        let innerContent = `<div class="score-table">
            <div class="score-table-row">
                <div class="score-table-cell">
                  <h1>Match Score&nbsp;<span id="percentage-score">${score}%</span></h1>
                </div>
            </div>
            <div class="score-table-row">
                <div class="score-table-cell">
                    <table style="width: 100%;">
                        <tr>
                            <td style="width:20%;">&nbsp;</td>
                            <td style="width:40%;">New client</td>
                            <td  style="width:80%;">Existing client</td>
                        </tr>
                        <tr><td colspan="3"><hr /></td></tr>
                        <tr>
                            <td>First name:</td><th>${newClient.given_name}</th><th>${person.given_name}</th>
                        </tr>
                        <tr>
                            <td>Last name:</td><th>${newClient.family_name}</th><th>${person.family_name}</th>
                        </tr>
                        <tr>
                            <td>Birthdate:</td><th>${newClient.birthdate}</th><th>${birthdate}</th>
                        </tr>
                        <tr>
                            <td>Gender:</td><th>${newClient.gender}</th>
                            <th>${gender.match(/F/i) ? 'Female' : (gender == '' ? 'N/A' : 'Male')}</th>
                        </tr>
                        <tr>
                            <td>Home district:</td><th>${newClient.home_district}</th><th>${person.home_district}</th>
                        </tr>
                        <tr>
                            <td>Home TA:</td><th>${newClient.home_ta}</th><th>${person.home_traditional_authority}</th>
                        </tr>
                        <tr>
                            <td>Home village:</td><th>${newClient.home_village}</th><th>${person.home_village}</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>`;
        
        let selectedCard = document.getElementById(`client-${person.id}`);
        let cards = document.getElementsByClassName('client-cards');
        for(const card of cards) {
         card.style = "background: hsl(0 0% 100%);";
        }
        
        selectedCard.style = "background: lightblue;"
        document.getElementById("duplicate-table-cell-right").innerHTML = innerContent;
    }

    rightDiv(newClient){
        return `<div class="score-table">
            <div class="score-table-row">
                <div class="score-table-cell">
                  <h1>Match Score&nbsp;<span id="percentage-score">&nbsp;-&nbsp;</span></h1>
                </div>
            </div>
            <div class="score-table-row">
                <div class="score-table-cell">
                    <table>
                        <tr>
                            <td style="width:20%;">&nbsp;</td>
                            <td style="width:40%;">New client</td>
                            <td style="width:40%;">Existing client</td>
                        </tr>
                        <tr><td colspan="3"><hr /></td></tr>
                        <tr>
                            <td>First name:</td><th>${newClient.given_name}</th><th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Last name:</td><th>${newClient.family_name}</th><th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Birthdate:</td><th>${newClient.birthdate}</th><th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Gender:</td><th>${newClient.gender}</th>
                            <th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Home district:</td><th>${newClient.home_district}</th><th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Home TA:</td><th>${newClient.home_ta}</th><th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>Home village:</td><th>${newClient.home_village}</th><th>&nbsp;</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>`;
    }

}
