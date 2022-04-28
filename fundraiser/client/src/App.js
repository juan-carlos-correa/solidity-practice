import React, { useState, useEffect } from "react";
import FundraiserFactory from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";

export const App = () => {
  const [web3State, setWeb3State] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactory.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactory.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
        setWeb3State({
          web3,
          accounts,
          contract: instance,
        });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    load().catch((e) => alert(e.message));
  }, []);

  if (!web3State.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return <h1>Good to Go!</h1>;
};

export default App;
