// use 'esversion: 6';

class ttTabsPlugin {
    load(target, records, newClient) {
        let left_content = `<div class="inner-duplicate-table">`;
        
        records.forEach((item) => {
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
        left_content += "</div>";

        let innerContent = `<div class="duplicate-table">
            <div class="duplicate-table-row">
                <div class="duplicate-table-cell" id="duplicate-table-cell-left">${left_content}</div>
                <div class="duplicate-table-cell" id="duplicate-table-cell-right">&nbsp;</div>
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
                    <table>
                        <tr>
                            <td>&nbsp;</td><td>New clinet</td><td>Existing client</td>
                        </tr>
                        <tr><td colspan="3"><hr /></td></tr>
                        <tr>
                            <td>First name:</td><th>${newClient.given_name}</th><th>${person.given_name}</th>
                        </tr>
                        <tr>
                            <td>Last name:</td><th>${person.family_name}</th><th>${person.family_name}</th>
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

}
