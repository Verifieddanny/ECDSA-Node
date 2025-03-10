import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const hashMessage = (message) => {
    const messageBytes = new TextEncoder().encode(JSON.stringify(message));
    return keccak256(messageBytes);
  };
  const signatureMessage = (message) => {
    secp.secp256k1.sign(hashMessage(message), privateKey);
  };

  async function transfer(evt) {
    evt.preventDefault();

    const msg = { amount: Number(sendAmount), recipient };
    const sig = signatureMessage(msg);

    const stringifyBigInts = (obj) => {
      for (let prop in obj) {
        let value = obj[prop];
        if (typeof value === "bigint") {
          obj[prop] = value.toString();
        } else if (typeof value === "object" && value !== null) {
          obj[prop] = stringifyBigInts(value);
        }
      }
      return obj;
    };
    const sigStringed = stringifyBigInts(sig);

    const tx = {
      sig: sigStringed,
      msg,
      sender: address,
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
