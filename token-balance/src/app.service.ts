import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getBalance(wallet: string, token: string): Promise<string> {
        const fs = require('fs');
        const Web3 = require("web3");
        const fileSync = fs.readFileSync('abi.json', 'utf-8');
        const abi = JSON.parse(fileSync);
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_URL));
        const tokenInst = new web3.eth.Contract(abi, token);
        let result =  await tokenInst.methods.balanceOf(wallet).call()
            .then(function (balance) {
                return balance;
            }).catch(function (e) {
                console.log(e);
            });
        return result;
    }
}
