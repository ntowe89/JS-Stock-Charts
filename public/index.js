async function main(){

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    //apikey  749104c1a68c47c09e5fa8e56c967e67

    //const response = await fetch("https://api.twelvedata.com/time_series?apikey=749104c1a68c47c09e5fa8e56c967e67&interval=1month&symbol=GME,MSFT,DIS,BNTX&outputsize=1")
    //const myData = await response.json()    
        
        
    //let GME = myData.GME
    //let MSFT = myData.MSFT
    //let DIS = myData.DIS
    //let BNTX = myData.BNTX

    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];
    

    //time chart
    stocks.forEach( stock => stock.values.reverse())
    
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => (
                    //console.log(stock.values)
                    getHighest(stock.values)
                )),
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                ))
            }]
        }
    });

    function getHighest(values){
        let highest = 0;
        //console.log(values)
        values.forEach(value => {
            if(parseFloat(value.high) > highest){
                highest = value.high
            }
        })
        return highest
    }

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }       
}


main()