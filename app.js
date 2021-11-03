const totalCases = document.getElementById('total_cases')
const totalDeaths = document.getElementById('total_deaths')
const totalRecovered = document.getElementById('total_recovered')
const newCases = document.getElementById('new_cases')
const newDeaths = document.getElementById('new_deaths')
const time = document.getElementById('time')

const master_list = document.getElementById('master_list')
const top_cases = document.getElementById('top_cases')
const today_cases = document.getElementById('today_cases')
const top_deaths = document.getElementById('top_deaths')
const top_actived = document.getElementById('top_actived')
const top_recovered = document.getElementById('top_recovered')


let dataTable = document.getElementById('dataTable')


const BASE_URL = 'https://disease.sh/v2/'

window.onload = function() {
    axios.get(`${BASE_URL}all`)
        .then(res => {
            let {cases, deaths, recovered, todayDeaths, todayCases, updated} = res.data
            totalCases.innerText = cases.toLocaleString()
            totalDeaths.innerText = deaths.toLocaleString()
            totalRecovered.innerText = recovered.toLocaleString()
            newCases.innerText = todayCases.toLocaleString()
            newDeaths.innerText = todayDeaths.toLocaleString()
            let fullDateAndTime = new Date().toISOString(updated)
            let date = fullDateAndTime.substr(0, 10)    
            let times = fullDateAndTime.substr(11, 8)    
            time.innerText = date.concat(' ' + times)

            let data = [cases, recovered, deaths]
            chart(data)

        })
        .catch(err => {
            console.log(err)
            alert('Something error occured!')
        })

    // Load Top Countrie
    axios.get(`${BASE_URL}countries`)
        .then(res => {
            let allCountries = Array.from(res.data)
            let temp = allCountries
            // top cases
            temp.sort((a, b) => {
                if(a.cases < b.cases) {
                    return 1
                } else if(a.cases > b.cases) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].cases
                flag.src = temp[i].countryInfo.flag

                top_cases.appendChild(list)
            }
            // today cases
            temp.sort((a, b) => {
                if(a.todayCases < b.todayCases) {
                    return 1
                } else if(a.todayCases > b.todayCases) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].todayCases
                flag.src = temp[i].countryInfo.flag

                today_cases.appendChild(list)
            }
            // Top Death 
            temp.sort((a, b) => {
                if(a.deaths < b.deaths) {
                    return 1
                } else if(a.deaths > b.deaths) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].deaths
                flag.src = temp[i].countryInfo.flag

                top_deaths.appendChild(list)
            }
            // Top today_deaths
            temp.sort((a, b) => {
                if(a.todayDeaths < b.todayDeaths) {
                    return 1
                } else if(a.todayDeaths > b.todayDeaths) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].todayDeaths
                flag.src = temp[i].countryInfo.flag

                today_deaths.appendChild(list)
            }
            // top_actived
            temp.sort((a, b) => {
                if(a.active < b.active) {
                    return 1
                } else if(a.active > b.active) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].active
                flag.src = temp[i].countryInfo.flag

                top_actived.appendChild(list)
            }
            // top_recovered
            temp.sort((a, b) => {
                if(a.recovered < b.recovered) {
                    return 1
                } else if(a.recovered > b.recovered) {
                    return -1
                } else {
                    return 0;
                }
            })
            
            for(let i = 0; i <= 9; i++) {
                let list = master_list.cloneNode(true)
                let flag = list.getElementsByClassName('flag')[0]
                let country = list.getElementsByClassName('country')[0]
                let count = list.getElementsByClassName('count')[0]
                list.className = ''; list.id = ''
                country.innerText = temp[i].country
                count.innerText = temp[i].recovered
                flag.src = temp[i].countryInfo.flag

                top_recovered.appendChild(list)
            }

            // load data table
            let dataSet = []
            for(var i = 0; i < res.data.length; i++) {
                let data = []

                let serial = i + 1
                let flag = `<img src='${res.data[i].countryInfo.flag}' alt='flag' width='30px'/>`
                let country = `<p id="tbl_country">${res.data[i].country}</p>`
                let cases = `<p id="tbl_cases">${res.data[i].cases}</p>`
                let todayCases = `<p id="tbl_cases">${res.data[i].todayCases}</p>`
                let deaths = `<p id="tbl_deaths">${res.data[i].deaths}</p>`
                let todayDeaths = `<p id="tbl_deaths">${res.data[i].todayDeaths}</p>`
                let recovered = `<p id="tbl_recovered">${res.data[i].recovered}</p>`
                let active = `<p id="active_critical">${res.data[i].active}</p>`
                let critical = `<p id="active_critical">${res.data[i].critical}</p>`
                
                data.push(serial, flag, country, cases, todayCases, deaths, todayDeaths, recovered, active, critical)
                
                dataSet.push(data)
            }
            renderDataTable(dataSet)
            function renderDataTable(dataSet) {
                $(document).ready(function() {
                    $('#dataTable').DataTable( {
                        data: dataSet,
                        columns: [
                            { title: "SERIAL" },
                            { title: "FLAG" },
                            { title: "COUNTRY" },
                            { title: "CASES." },
                            { title: "TODAY CASES" },
                            { title: "DEATHS" },
                            { title: "TODAY DEATHS" },
                            { title: "RECOVERED" },
                            { title: "ACTIVE" },
                            { title: "CRITICAL" }
                        ]
                    } );
                } );
            }

            // end
        })
}

function chart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cases', 'Recover', 'Death'],
            datasets: [{
                label: '# of Votes',
                data,
                backgroundColor: [
                    '#7B6FFF',
                    '#2DCE99',
                    '#F5385A'
                ]
            }]
        }
    });
}