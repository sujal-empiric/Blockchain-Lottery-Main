require("chai").should();
const BlockchainLottery = artifacts.require("BlockchainLottery");
const USDT = artifacts.require("USDT");
const accountNum = 8
contract("BlockchainLottery", (accounts) => {
    beforeEach(async () => {
        this.usdt = await USDT.new();
        this.blockchainlottery = await BlockchainLottery.new();
        await this.blockchainlottery.updateUSDTAddress(this.usdt.address);
        await this.blockchainlottery.setFeeAccount(accounts[0]);
        for (var i = 1; i <= accountNum; i++) {
            await this.usdt.mint(10, { from: accounts[i] });
        }
        for (var i = 1; i <= accountNum; i++) {
            await this.usdt.approve(this.blockchainlottery.address, 1000000000, {
                from: accounts[i],
            });
        }
    });
    
    it("Assign a Ticket numbers", async ()=>{
        for (var i = 1; i <= accountNum; i++) {
            await this.blockchainlottery.depositeUSDT(10000000, {
                from: accounts[i],
            });
        }
        let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
        let tickets = await this.blockchainlottery.getAllTickets({from:accounts[0]})
        tickets.map((ticket)=>{
            console.log(ticket.toNumber())
        })
    })  
    it("Open Lottery", async ()=>{
        for (var i = 1; i <= accountNum; i++) {
            await this.blockchainlottery.depositeUSDT(10000000, {
                from: accounts[i],
            });
        }
        let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
        await this.blockchainlottery.getLottery({from:accounts[0]})
        let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
        console.log(balance.toNumber())
        let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
        console.log(lastWinner)
        balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
        console.log(balance.toNumber()/1000000)
        balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
        console.log(balance.toNumber()/1000000)
    })


    it("Open Single Lottery", async ()=>{
        await this.blockchainlottery.depositeUSDT(10000000, {from: accounts[1]});
        
        let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
        
        await this.blockchainlottery.getLottery({from:accounts[0]})
        
        let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
        console.log(balance.toNumber())

        let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
        console.log(lastWinner)
        
        balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
        console.log(balance.toNumber()/1000000)
        
        balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
        console.log(balance.toNumber()/1000000)
    })
    
    it("Randomness Test", async ()=>{
        for(var j=0;j<10;j++){
            for (var i = 1; i <= accountNum; i++) {
                await this.usdt.mint(10, { from: accounts[i] });
            }
            for (var i = 1; i <= accountNum; i++) {
                await this.usdt.approve(this.blockchainlottery.address, 1000000000, {
                    from: accounts[i],
                });
            }
            for (var i = 1; i <= accountNum; i++) {
                await this.blockchainlottery.depositeUSDT(10000000, {
                    from: accounts[i],
                });
            }
            let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
            await this.blockchainlottery.getLottery({from:accounts[0]})
            let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
            console.log(balance.toNumber())
            let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
            console.log(lastWinner)
            balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
            console.log(balance.toNumber()/1000000)
            balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
            console.log(balance.toNumber()/1000000)
        }
    })
    
});
