import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import Web3 from "web3";
import {  toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import info from "../../images/info.svg";
import axios from "axios";
import Chart from "../Facuet/Chart";
import { faucetTokenAddress, faucetTokenAbi } from "../utils/Faucet";
import {
  fountainContractAddress,
  fountainContractAbi,
} from "../utils/Fountain";
// import { useState } from "react";
import "./Swap.css";
import bigInt from "big-integer";
import { useMoralis } from 'react-moralis';

const provider = new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/polygon/mainnet');
const webSupply = new Web3(provider);
let intervalTimeout=null;
const Swap = ({setOneTokenPrice}) => {

  const { account, Moralis } = useMoralis();

  let [tripType, setTripType] = useState(1);
  let [tripType1, setTripType1] = useState(1);
  let [enteredVal, setEnteredval] = useState(0);
  let [estimate, setEstimate] = useState();
  let [estimateDrip, setEstimateDrip] = useState();
  let [minRecievedDrip, setMinRecievedDrip] = useState();
  let [minRecieved, setMinrecieved] = useState();
  let [tenPerVal, setTenperVal] = useState(0);
  let [userDripBalance, setuserDripBalance] = useState(0);
  let [usersBalance, setUsersBalance] = useState(0);
  let [bnbPrice, setBnbPrice] = useState(0);
  let [dripUsdtprice, setdripUsdtPrice] = useState(0);
  let [usdtPrice, setUsdPrice] = useState(0);
  let [isToogle, setisToogle] = useState(false);
  //New States for BnB Contract balanace and Drip C-bal
  let [cBnbBalance, setCbnbBalance] = useState(0);
  let [cDripBalance, setCdripBalance] = useState(0);

  // states for B by D
  let [division, setDivision] = useState(0);
  let [oneDripPrice, setOnedripPrice] = useState(0);
  // state for sell without
  let [withouttofixed, setWithoutToFixed] = useState(0);
  // states for belowfooter swap
  let [tSupllyDrip, setTsupplyDrip] = useState(0);
  let [tSupllyFountain, setTsupplyFountain] = useState(0);
  let [tTransactionsFountain, setTtransactionFountain] = useState(0);
  let [croValue, setCroValue] = useState(0);
  const { t, i18n } = useTranslation();
  const inputEl = useRef();
  let inputE2 = useRef();
  // for radio inputs Buy SOLS
  let mYentered = useRef();
  // for radio inputs Sell SOLS
  let mYEnter1 = useRef();



  const addMaxBalance = async () => {
    try{
    let acc = account

    if (!account) {
      toast.error("No Wallet Connected")
    } else {

      let tokenContractOf = new webSupply.eth.Contract(
        faucetTokenAbi,
        faucetTokenAddress
      );
      let dripBalance = await tokenContractOf.methods.balanceOf(acc).call();
      dripBalance = webSupply.utils.fromWei(dripBalance);
      inputE2.current.value = dripBalance;
      dripBalance = parseFloat(dripBalance).toFixed(7);
      setuserDripBalance(dripBalance);
      await enterBuyAmount2();
    }
  }catch(e){
    console.log("error while get max balance",e);
  }
  };

  const enterBuyAmount1 = async () => {
    try{
    let myvalue = inputEl.current.value;


    if (myvalue > 0) {
      myvalue = Moralis.Units.ETH(myvalue);
      setEnteredval(myvalue);

      const intervalOptions = {
        contractAddress: fountainContractAddress,
        functionName: "getmaticToTokenInputPrice",
        abi: fountainContractAbi,
        params: {
          matic_sold : myvalue
        }
        }

        let tokensInputPrice = await Moralis.executeFunction(intervalOptions);


        tokensInputPrice = Moralis.Units.FromWei(tokensInputPrice);
        tokensInputPrice = parseFloat(tokensInputPrice).toFixed(7);

        let miniumrcvd = (tripType * tokensInputPrice) / 100;
        let percentValue = tokensInputPrice - miniumrcvd;
        percentValue = parseFloat(percentValue).toFixed(7);

        setEstimate(tokensInputPrice);
        setMinrecieved(percentValue);
      } else {
        setEstimate();
        setMinrecieved();
    }
  }catch(e){
    console.log("error while getting data against entered amount",e);
  }
  };

  const enterRadioAmount3 = async () => {
    try{


    let myMultiplyValue = 3;

    let myvalue = inputEl.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );

    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);
      setEnteredval(myvalue);

      let tokensInputPrice = await contractOf.methods
        .getBnbToTokenInputPrice(myvalue)
        .call();
      tokensInputPrice = webSupply.utils.fromWei(tokensInputPrice);
      tokensInputPrice = parseFloat(tokensInputPrice).toFixed(7);

      let miniumrcvd = (myMultiplyValue * tokensInputPrice) / 100;
      let percentValue = tokensInputPrice - miniumrcvd;
      percentValue = parseFloat(percentValue).toFixed(7);

      setEstimate(tokensInputPrice);
      setMinrecieved(percentValue);
    } else {
      setEstimate();
      setMinrecieved();
    }
  }catch(e){
    console.log("Error while getting amount against selected radio button",e);
  }
  };
  const enterRadioAmount5 = async () => {
    try{
    let myMultiplyValue = 5;


    let myvalue = inputEl.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );
    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);
      setEnteredval(myvalue);

      let tokensInputPrice = await contractOf.methods
        .getBnbToTokenInputPrice(myvalue)
        .call();
      tokensInputPrice = webSupply.utils.fromWei(tokensInputPrice);
      tokensInputPrice = parseFloat(tokensInputPrice).toFixed(7);

      let miniumrcvd = (myMultiplyValue * tokensInputPrice) / 100;
      let percentValue = tokensInputPrice - miniumrcvd;
      percentValue = parseFloat(percentValue).toFixed(7);

      setEstimate(tokensInputPrice);
      setMinrecieved(percentValue);
    } else {
      setEstimate();
      setMinrecieved();
    }
  }catch(e){
    console.log("Error while getting amount against selected radio button",e);
  }
  };
  const myOnchangeInputBuySwap = async () => {
    try
    {


    let myCurrentVal = mYentered.current.value;
    if (myCurrentVal < 100) {
      if (myCurrentVal >= 1) {
        setTripType(myCurrentVal);


        let myvalue = inputEl.current.value;
        let contractOf = new webSupply.eth.Contract(
          fountainContractAbi,
          fountainContractAddress
        );

        if (myvalue > 0) {
          myvalue = webSupply.utils.toWei(myvalue);
          setEnteredval(myvalue);

          let tokensInputPrice = await contractOf.methods
            .getBnbToTokenInputPrice(myvalue)
            .call();
          tokensInputPrice = webSupply.utils.fromWei(tokensInputPrice);
          tokensInputPrice = parseFloat(tokensInputPrice).toFixed(7);

          let miniumrcvd = (myCurrentVal * tokensInputPrice) / 100;
          let percentValue = tokensInputPrice - miniumrcvd;
          percentValue = parseFloat(percentValue).toFixed(7);

          setEstimate(tokensInputPrice);
          setMinrecieved(percentValue);
          setTripType(myCurrentVal);
        } else {
          setEstimate();
          setMinrecieved();
        }
      } else {
        toast.error("Slippage cannot be less than 1");
      }
    } else {
      toast.error("Slippage Cannot be over 100");
    }
  }catch(e){
    console.log("Error while getting values against entered amount" );
  }
  };
  const myRadioSellSplash1 = async () => {
    try{
    let myValFormul = 1;


    let myvalue = inputE2.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );

    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);

      setEnteredval(myvalue);
      let tokensOutputPrice = await contractOf.methods
        .getTokenTomaticInputPrice(myvalue)
        .call();
      tokensOutputPrice = webSupply.utils.fromWei(tokensOutputPrice);

      let tenPercentVal = (tokensOutputPrice * 10) / 100;
      tenPercentVal = tokensOutputPrice - tenPercentVal;
      // tenPercentVal = web3.utils.fromWei(tenPercentVal);
      let miniumrcvdDrip = (myValFormul * tenPercentVal) / 100;
      let percentValue = tenPercentVal - miniumrcvdDrip;
      percentValue = parseFloat(percentValue).toFixed(7);
      tenPercentVal = parseFloat(tenPercentVal).toFixed(7);

      // tokensOutputPrice = web3.utils.fromWei(tokensOutputPrice)
      tokensOutputPrice = parseFloat(tokensOutputPrice).toFixed(7);

      percentValue = parseFloat(percentValue).toFixed(7);
      setMinRecievedDrip(percentValue);
      setEstimateDrip(tokensOutputPrice);
      setTenperVal(tenPercentVal);
    } else {
      setEstimateDrip(0);
      setMinRecievedDrip(0);
      setTenperVal(0);
    }
  }catch(e){
    console.log("Error while getting amount against selected radio button",e);
  }
  };
  const myRadioSellSplash3 = async () => {
   try{
    let myValFormul = 3;

    let myvalue = inputE2.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );

    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);

      setEnteredval(myvalue);
      let tokensOutputPrice = await contractOf.methods
        .getTokenTomaticInputPrice(myvalue)
        .call();
      tokensOutputPrice = webSupply.utils.fromWei(tokensOutputPrice);

      let tenPercentVal = (tokensOutputPrice * 10) / 100;
      tenPercentVal = tokensOutputPrice - tenPercentVal;
      // tenPercentVal = web3.utils.fromWei(tenPercentVal);
      let miniumrcvdDrip = (myValFormul * tenPercentVal) / 100;
      let percentValue = tenPercentVal - miniumrcvdDrip;
      percentValue = parseFloat(percentValue).toFixed(7);
      tenPercentVal = parseFloat(tenPercentVal).toFixed(7);

      // tokensOutputPrice = web3.utils.fromWei(tokensOutputPrice)
      tokensOutputPrice = parseFloat(tokensOutputPrice).toFixed(7);

      percentValue = parseFloat(percentValue).toFixed(7);
      setMinRecievedDrip(percentValue);
      setEstimateDrip(tokensOutputPrice);
      setTenperVal(tenPercentVal);
    } else {
      setEstimateDrip(0);
      setMinRecievedDrip(0);
      setTenperVal(0);
    }
  }catch(e){
    console.log("Error while getting amount against selected radio button",e);
  }
  };
  const enterBuyAmount2 = async () => {
    try{


    let myvalue = inputE2.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );

    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);

      setEnteredval(myvalue);
      let tokensOutputPrice = await contractOf.methods
        .getTokenTomaticInputPrice(myvalue)
        .call();
      tokensOutputPrice = webSupply.utils.fromWei(tokensOutputPrice);

      let tenPercentVal = (tokensOutputPrice * 10) / 100;
      tenPercentVal = tokensOutputPrice - tenPercentVal;
      setWithoutToFixed(tokensOutputPrice);
      // tenPercentVal = web3.utils.fromWei(tenPercentVal);
      let miniumrcvdDrip = (tripType1 * tenPercentVal) / 100;
      let percentValue = tenPercentVal - miniumrcvdDrip;
      percentValue = parseFloat(percentValue).toFixed(7);
      tenPercentVal = parseFloat(tenPercentVal).toFixed(7);

      // tokensOutputPrice = web3.utils.fromWei(tokensOutputPrice)
      tokensOutputPrice = parseFloat(tokensOutputPrice).toFixed(7);

      percentValue = parseFloat(percentValue).toFixed(7);
      setMinRecievedDrip(percentValue);
      setEstimateDrip(tokensOutputPrice);
      setTenperVal(tenPercentVal);
    } else {
      setEstimateDrip(0);
      setMinRecievedDrip(0);
      setTenperVal(0);
    }
  }catch(e){
    console.log("Error while getting values against entered amoount",e);
  }
  };
  const myOnchangeInputSellSplash = async () => {
   try{
    let iEntered = mYEnter1.current.value;
    if (iEntered < 100) {
      if (iEntered >= 1) {
        setTripType1(iEntered);


        let myvalue = inputE2.current.value;
        let contractOf = new webSupply.eth.Contract(
          fountainContractAbi,
          fountainContractAddress
        );

        if (myvalue > 0) {
          myvalue = webSupply.utils.toWei(myvalue);

          setEnteredval(myvalue);
          let tokensOutputPrice = await contractOf.methods
            .getTokenTomaticInputPrice(myvalue)
            .call();
          tokensOutputPrice = webSupply.utils.fromWei(tokensOutputPrice);

          let tenPercentVal = (tokensOutputPrice * 10) / 100;
          tenPercentVal = tokensOutputPrice - tenPercentVal;
          // tenPercentVal = web3.utils.fromWei(tenPercentVal);
          let miniumrcvdDrip = (iEntered * tenPercentVal) / 100;
          let percentValue = tenPercentVal - miniumrcvdDrip;
          percentValue = parseFloat(percentValue).toFixed(7);
          tenPercentVal = parseFloat(tenPercentVal).toFixed(7);

          // tokensOutputPrice = web3.utils.fromWei(tokensOutputPrice)
          tokensOutputPrice = parseFloat(tokensOutputPrice).toFixed(7);

          percentValue = parseFloat(percentValue).toFixed(7);
          setMinRecievedDrip(percentValue);
          setEstimateDrip(tokensOutputPrice);
          setTenperVal(tenPercentVal);
        } else {
          setEstimateDrip(0);
          setMinRecievedDrip(0);
          setTenperVal(0);
        }
      } else {
        toast.error("Slippage Cannot be less than 1");
      }
    } else {
      toast.error("Slippage cannot be Over 100");
    }
  }catch(e){
    console.log("Error while getting values against entered amount",e);
  }
  };
  const myRadioSellSplash5 = async () => {

    try{
    let myValFormul = 5;


    let myvalue = inputE2.current.value;
    let contractOf = new webSupply.eth.Contract(
      fountainContractAbi,
      fountainContractAddress
    );

    if (myvalue > 0) {
      myvalue = webSupply.utils.toWei(myvalue);

      setEnteredval(myvalue);
      let tokensOutputPrice = await contractOf.methods
        .getTokenTomaticInputPrice(myvalue)
        .call();
      tokensOutputPrice = Moralis.Units.ETH(tokensOutputPrice);

      let tenPercentVal = (tokensOutputPrice * 10) / 100;
      tenPercentVal = tokensOutputPrice - tenPercentVal;

      let miniumrcvdDrip = (myValFormul * tenPercentVal) / 100;
      let percentValue = tenPercentVal - miniumrcvdDrip;
      percentValue = parseFloat(percentValue).toFixed(7);
      tenPercentVal = parseFloat(tenPercentVal);
      tokensOutputPrice = parseFloat(tokensOutputPrice).toFixed(7);

      percentValue = parseFloat(percentValue).toFixed(7);
      setMinRecievedDrip(percentValue);
      setEstimateDrip(tokensOutputPrice);
      setTenperVal(tenPercentVal);
    } else {
      setEstimateDrip(0);
      setMinRecievedDrip(0);
      setTenperVal(0);
    }
  }catch(e){
      console.log("Error while getting amount against selected radio button",e);
    }
  };
  const swapBnbtoToken = async () => {

    await enterBuyAmount1();

    try {

      if(!account){
        toast.error("No Wallet Connected")
      }else {let myvalue = inputEl.current.value;
      if (parseFloat(myvalue) > 0) {
        if (parseFloat(usersBalance) > parseFloat(myvalue)) {

          myvalue = Moralis.Units.ETH(myvalue);
          console.log('myval: ' + myvalue)
          const sendOptions = {
            contractAddress: fountainContractAddress,
            functionName: "getmaticToTokenInputPrice",
            abi: fountainContractAbi,
            params: {
              matic_sold: myvalue
            }

            }
            const maticInput = await Moralis.executeFunction(sendOptions);
            console.log('mymatic: ' + maticInput)
          let miniumrcvd = (tripType * maticInput) / 100;
          let percentValue = maticInput - miniumrcvd;
          percentValue = percentValue.toString();
          let b = bigInt(percentValue);
          let convertValue = b.value.toString();
          console.log('convertval: ' + convertValue)
          if (percentValue > 0) {

            const sendOptions = {
              contractAddress: fountainContractAddress,
              functionName: "maticToTokenSwapInput",
              abi: fountainContractAbi,
              params: {
                min_tokens : convertValue
              },
              msgValue: myvalue.toString()
              }
              const transaction = await Moralis.executeFunction(sendOptions);
              console.log(transaction.hash)
              await transaction.wait()
              .on("transactionHash",async(hash)=>{
                let data = {
                  hash:hash,
                  toAddress :fountainContractAddress,
                  fromAddress : account,
                  id:account,
                  amount:inputEl.current.value.toString()
                }
               await axios.post("",data);
              })

            toast.success("Transaction confirmed");
          } else {
            toast.error("Please Select Slippage Tolerance");
          }
        } else {
          toast.error(
            "Entered Amount is greater than Your balance. Please Recharge."
          );
        }
      } else {
        toast.error("Seems Like You Forgot to Enter Amount");
      }}
    } catch (e) {
      console.log("Error ; ", e);
      toast.error("Transaction Failed");
    }
  };

  const bnbSwapSell = async () => {

    await enterBuyAmount2();
    try {

      let myvalue = inputE2.current.value;
      myvalue = parseFloat(myvalue);


      if (myvalue >= 1) {

        const referralReadOptions = {
          contractAddress: faucetTokenAddress,
          functionName: "allowance",
          abi: faucetTokenAbi,
          params: {
            _owner: account,
            _spender: fountainContractAddress }
     };
      const allowance = await Moralis.executeFunction(referralReadOptions);

      console.log('allownace: ' + allowance);
        if (parseFloat(userDripBalance) >= myvalue) {
          myvalue = myvalue.toString();

          if (allowance > 0) {
            let myvalue1 = Moralis.Units.ETH(myvalue);

            if (parseFloat(allowance) >= parseFloat(myvalue1)) {

              let minmatic = Moralis.Units.ETH(withouttofixed*0.85);
              console.log('minmatic: ' + minmatic)
              if (minmatic > 0) {
                let c = bigInt(myvalue1);
                c = c.value.toString();

                console.log('myval: ' + myvalue1)
              const sendOptions = {
                contractAddress: fountainContractAddress,
                functionName: "tokenTomaticSwapInput",
                abi: fountainContractAbi,
                params: {
                  tokens_sold: myvalue1,
                  min_matic: minmatic
                }

                }
                const transaction = await Moralis.executeFunction(sendOptions);
                console.log(transaction.hash)
                await transaction.wait().
                on("transactionHash",async(hash)=>{
                    let data = {
                      hash:hash,
                      toAddress :fountainContractAddress,
                      fromAddress : account,
                      id:account,
                      amount:inputE2.current.value.toString()
                    }
                    await axios.post("",data);
                  })



                toast.success("Transaction Confirmed");
              } else {
                toast.error("Please Select Slippage Tolerance");
              }
            } else {
              toast.error(
                "Oops You Entered Value Greater than your approval amount"
              );
            }
          } else {
            toast.error("It Seems Like you Dont Have ApprovedToken");
          }
        } else {
          toast.error("In Sufficient balance please recharge");
        }

      } else {
        toast.error("Amount cannot be less than 1");
      }
    } catch (e) {
      console.log("Failed With :", e);
      toast.error(" Transaction Failed");
    }
  };



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [data, setdata] = React.useState(null);

  const handleClickon = (event) => {
    setdata(event.currentTarget);
  };

  const handleCloseon = () => {
    setdata(null);
  };

  const opento = Boolean(data);
  const idto = opento ? "simple-popover" : undefined;

  const getToogle = async (e) => {
    try {

      let myvalue = inputE2.current.value;
      if (myvalue > 0) {
        let myvalue1 = Moralis.Units.ETH(myvalue);

        const sendOptions = {
          contractAddress: faucetTokenAddress,
          functionName: "approve",
          abi: faucetTokenAbi,
          params: {
            _spender:fountainContractAddress,
            _value: myvalue1
          }

          }
          const transaction = await Moralis.executeFunction(sendOptions);
          console.log(transaction.hash)
          await transaction.wait()

          toast.success("Transaction Confirmed");
          setisToogle(false);

      } else {
        toast.error("Looks Like You Forgot to Enter Amount");
      }
    } catch (e) {
      console.log("Error While approving ", e);
      toast.error("Oops you cancelled transaction");
      setisToogle(false);
    }
  };



  async function getDataWitoutMetamask() {
    try {
      // let usdValue = await price.getBasePrice("MATIC", "USDT");
      let usdValue = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT")
      let currentBnB = usdValue.data.price;
      let contractOf = new webSupply.eth.Contract(
        fountainContractAbi,
        fountainContractAddress
      );

      let tokenContractOf = new webSupply.eth.Contract(
        faucetTokenAbi,
        faucetTokenAddress
      );

      let contractFBalance = await webSupply.eth.getBalance(
        fountainContractAddress
      );
      contractFBalance = webSupply.utils.fromWei(contractFBalance);
      contractFBalance = parseFloat(contractFBalance).toFixed(3);

      let contractFdripBalance = await tokenContractOf.methods
        .balanceOf(fountainContractAddress)
        .call();
      contractFdripBalance = webSupply.utils.fromWei(contractFdripBalance);
      contractFdripBalance = parseFloat(contractFdripBalance).toFixed(3);

      let supplyDrip = await tokenContractOf.methods.totalSupply().call();
      supplyDrip = webSupply.utils.fromWei(supplyDrip);
      supplyDrip = parseFloat(supplyDrip).toFixed(0);

      let fonutainDrip = await contractOf.methods.totalSupply().call();
      fonutainDrip = webSupply.utils.fromWei(fonutainDrip);
      fonutainDrip = parseFloat(fonutainDrip).toFixed(3);

      let transactionFountain = await contractOf.methods.totalTxs().call();

      let converted = currentBnB * contractFBalance;
      converted = parseFloat(converted).toFixed(3);

      let covertedDrip = contractFBalance / contractFdripBalance;
      let BdividedByD = covertedDrip;
      BdividedByD = parseFloat(BdividedByD).toFixed(3);
      let priceOfoneDrip = covertedDrip * currentBnB;
      priceOfoneDrip = parseFloat(priceOfoneDrip).toFixed(3);

      covertedDrip = covertedDrip * currentBnB;
      covertedDrip = parseFloat(covertedDrip).toFixed(3);
      covertedDrip = contractFdripBalance * covertedDrip;
      covertedDrip = parseFloat(covertedDrip).toFixed(3);

      setUsdPrice(currentBnB);
      setdripUsdtPrice(covertedDrip);
      setBnbPrice(converted);

      setCbnbBalance(contractFBalance);
      setCdripBalance(contractFdripBalance);
      setDivision(BdividedByD);
      setOnedripPrice(priceOfoneDrip);
      setOneTokenPrice(priceOfoneDrip)
      setTsupplyDrip(supplyDrip);
      setTsupplyFountain(fonutainDrip);
      setTtransactionFountain(transactionFountain);
    } catch (e) {
      console.log("error while get data without metamask",e);
    }
  }

  useEffect(() => {
           getDataWitoutMetamask();
           intervalTimeout=  setInterval(() => {
            async function getData() {
              try {
                if (!account) {
                  console.log("No wallet Connected");
                } else {

                  let balance = await Moralis.Web3API.account.getNativeBalance({chain: "matic"});

                  balance = balance['balance']
                  balance = Moralis.Units.FromWei(balance);
                  balance = parseFloat(balance).toFixed(3);
                  setUsersBalance(balance);

                  const balanceOptions = {
                    contractAddress: faucetTokenAddress,
                    functionName: "balanceOf",
                    abi: faucetTokenAbi,
                    params: {
                      _owner : account
                    }
                    }
                    let dripBalance = await Moralis.executeFunction(balanceOptions);

                    dripBalance = parseFloat(dripBalance).toFixed(3);
                   setuserDripBalance(dripBalance);
              }
              } catch (e) {
                console.log("Error while fetching Api", e);
              }
            };

            getData();
          }, 5000);
          return ()=>{
           clearInterval(intervalTimeout);
          }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="images fbg">
      <div id="fountain">

        <div className="container">
          <div className="landing-page">  

          <div style={{padding: "60px", backgroundColor: "#a63c3c", minHeight: "20px", color: "#ffffff"}} className="row mb-4 mt-2">
            IMPORTANT! : We have made modifications to the gas estimations to display a correct gas fee but for a more secure and fast way to confirm your transactions we recommend that you change your gas fee to Agressive. Polygon Mainnet is known for issues with congestions of their nodes so this should cover every transaction and bypass the errors that occur or latency in transactions.
          </div>

            <div style={{paddingTop: "60px"}} className="row mb-4 mt-2">


              <div className="container col-12 col-xl-6 col-xl-6new col-lg-6 col-md-6 mb-4">
                <div className="card  text-white" style={{ backgroundColor: "#4e2e4b" }}>
                  <div className="card-body">
                    <div className="swaptitle1">SOLS / MATIC</div>

                    <div className="row mb-4 mt-2">
                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-4 col-lg-4 col-md-4">
                          <label style={{fontSize: "12px", color: "rgb(169, 167, 167)"}}><a className="contraddr1" href="https://polygonscan.com/token/0x3be7fbe56bc94839fb0024237a054e7cb00de053">(0x3bE7fbE56Bc94839FB0024237a054e7cB00DE053)</a></label><br/>
                      </div>
                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-4 col-lg-4 col-md-4">

                      </div>
                    </div>

                    <div className="row mb-4 mt-2">
                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-2 col-lg-4 col-md-4">
                          <label className="labelstats">Price MATIC/SOLS</label><br/>
                          <span className="notranslate  containertextbig1">{division} / {oneDripPrice} {t("USDT.1")}</span>
                      </div>
                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-2 col-lg-4 col-md-4">
                          <label className="labelstats">MATIC Balance</label><br/>
                          <span className="notranslate  containertextbig1">{cBnbBalance} / {bnbPrice}</span>
                      </div>

                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-2 col-lg-4 col-md-4">
                          <label className="labelstats">SOLS Balance</label><br/>
                          <span className="notranslate  containertextbig1">{cDripBalance} / {dripUsdtprice}</span>
                      </div>
                      <div style={{maxWidth: "50%"}} className="container col-12 col-xl-2 col-lg-4 col-md-4">
                          <label className="labelstats">Supply</label><br/>
                          <span className="notranslate  containertextbig1">{tSupllyDrip} {t("SOLS.1")}</span>
                      </div>
                    </div>
                    <Chart/>
                  </div>
                </div>
              </div>
              <div className="container col-12 col-xl-3 col-lg-6 col-md-6 mb-4">
                <div
                  className="card  text-white"
                  style={{ backgroundColor: "#4e2e4b" }}
                >
                <Tabs>
    <TabList>
      <Tab><div className="tab_btn">Buy</div></Tab>
      <Tab><div style={{marginLeft:""}} className="tab_btn">Sell</div></Tab>
      <Tab><div style={{marginLeft:""}} className="tab_btn"><img style={{width: "14px", marginTop: "-5px", marginLeft: "-10px"}} src={info}/></div></Tab>
    </TabList>
<TabPanel>
      <div className="card-body">
                    {/* <p className="card-text"></p> */}
                    <div className="landing-page">

                      <form>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-12 text-left fst-italic">
                              <label>
                                <p>
                                {t("MATICBalance.1")}: {usersBalance}
                                </p>
                              </label>
                            </div>

                          </div>
                          <div role="group" className="input-group">
                            <input
                              ref={inputEl}
                              onChange={() => enterBuyAmount1()}
                              type="number"
                              placeholder="MATIC"
                              className="form-control"
                              id="__BVID__90"
                            />
                            <div className="input-group-append">
                              <div
                                className="dropdown b-dropdown btn-group"
                                id="__BVID__91"
                              >
                                <Button
                                  aria-describedby={id}
                                  variant="info"
                                  onClick={handleClickon}
                                  style={{
                                    backgroundColor: "#86ad74",
                                    border: "1px solid #86ad74",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 16 16"
                                    width="1em"
                                    height="1em"
                                    focusable="false"
                                    role="img"
                                    aria-label="gear fill"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi-gear-fill b-icon bi"
                                    style={{ width: "16px", height: "16px" }}
                                  >
                                    <g>
                                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"></path>
                                    </g>
                                  </svg>
                                </Button>
                                <Popover
                                  className="popoverhere"
                                  id={idto}
                                  open={opento}
                                  anchorEl={data}
                                  onClose={handleCloseon}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 2 }}>
                                    {" "}
                                    <ul
                                      role="menu"
                                      tabIndex={1}
                                      className="Ullist"
                                    >
                                      <li role="presentation">
                                        <div
                                          role="group"
                                          className="form-group"
                                          id="__BVID__101"
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          <h2 style={{fontSize: "16px",lineHeight: "60px"}}>Settings</h2>
                                          <label
                                            style={{fontSize: "14px",color: "#a9a7a7"}}
                                            htmlFor="dropdown-sell-slippage-config"
                                            className="d-block"
                                            id="__BVID__101__BV_label_"
                                          >
                                             {t("Slippagetolerance.1")}


                                          </label>
                                          <div>
                                            <div
                                              role="radiogroup"
                                              tabIndex={-1}
                                              className="pt-2 bv-no-focus-ring"
                                              id="__BVID__102"
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-evenly",
                                              }}
                                            >
                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  await myRadioSellSplash1();
                                                  setTripType1("1");
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType}
                                                  name="tripType"
                                                  checked={tripType === "1"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">1%</div>
                                              </div>

                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  setTripType("3");
                                                  await enterRadioAmount3();
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType}
                                                  name="tripType"
                                                  checked={tripType === "3"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">3%</div>
                                              </div>

                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  setTripType("5");
                                                  await enterRadioAmount5();
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType}
                                                  name="tripType"
                                                  checked={tripType === "5"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">5%</div>
                                              </div>
                                            </div>
                                            <label
                                            style={{fontSize: "14px",color: "#a9a7a7"}}
                                            htmlFor="dropdown-sell-slippage-config"
                                            className="d-block"
                                            id="__BVID__101__BV_label_"
                                          >
                                            Custom slippage


                                          </label>
                                            <div
                                              role="group"
                                              className="input-group"
                                            >
                                              <input
                                                // id="dropdown-sell-slippage-config"
                                                type="number"
                                                // value={tripType}

                                                ref={mYentered}
                                                className="form-control form21"
                                                onChange={async () =>
                                                  await myOnchangeInputBuySwap()
                                                }

                                              />
                                              <div className="input-group-append form22">
                                                <button
                                                  type="button"
                                                  className="form23"
                                                >
                                                  %
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </Typography>
                                </Popover>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 text-left fst-italic">
                              <small className="form-text">
                                <p>
                                  {t("Estimatereceived.1")}: {estimate}
                                </p>
                              </small>


                            </div>

                          </div>
                        </div>
                      </form>
                      <div className="row d-flex justify-content-center mt-5">
                        <div className="d-grid gap-2">
                          <button
                            onClick={() => swapBnbtoToken()}
                            type="button"
                            className="btn btn-outline-lightx"
                          >
                            {t("Buy.1")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p />
                  </div>
    </TabPanel>
    <TabPanel>
      <div className="card-body">
                    {/* <p className="card-text"></p> */}
                    <div className="landing-page">

                      <form>
                        <div className="form-group">
                          <div className="row">

                            <div className="col-12 text-left fst-italic">
                              {" "}
                              <p>
                                {t("SolisiumBalance.1")}: {userDripBalance}

                              </p>
                            </div>
                          </div>
                          <div role="group" className="input-group">
                            <input
                              ref={inputE2}
                              type="number"
                              placeholder="SOLS"
                              className="form-control"
                              id="__BVID__99"
                              onChange={() => enterBuyAmount2()}
                            />
                            <div className="input-group-append">
                              <button
                                onClick={() => addMaxBalance()}
                                type="button"
                                className="btn btn-info"
                                style={{
                                  backgroundColor: "#86ad74",
                                  border: "1px solid #86ad74",
                                }}
                              >
                                {t("Max.1")}
                              </button>
                              <div
                                className="dropdown b-dropdown btn-group"
                                id="__BVID__100"
                              >
                                <Button
                                  aria-describedby={id}
                                  variant="info"
                                  onClick={handleClick}
                                  style={{
                                    backgroundColor: "#86ad74",
                                    border: "1px solid #86ad74",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 16 16"
                                    width="1em"
                                    height="1em"
                                    focusable="false"
                                    role="img"
                                    aria-label="gear fill"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi-gear-fill b-icon bi"
                                    style={{ width: "16px", height: "16px" }}
                                  >
                                    <g>
                                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"></path>
                                    </g>
                                  </svg>
                                </Button>
                                <Popover
                                  className="popoverhere2"
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 2 }}>
                                    <ul
                                      role="menu"
                                      tabIndex={1}
                                      className="Ullist"
                                    >
                                      <li role="presentation">
                                        <div
                                          role="group"
                                          className="form-group"
                                          id="__BVID__101"
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          <h2 style={{fontSize: "16px",lineHeight: "60px"}}>Settings</h2>
                                          <label
                                            style={{fontSize: "14px",color: "#a9a7a7"}}
                                            htmlFor="dropdown-sell-slippage-config"
                                            className="d-block"
                                            id="__BVID__101__BV_label_"
                                          >
                                            {t("Slippagetolerance.1")}


                                          </label>
                                          <div>
                                            <div
                                              role="radiogroup"
                                              tabIndex={-1}
                                              className="pt-2 bv-no-focus-ring"
                                              id="__BVID__102"
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-evenly",
                                                marginLeft: "-30px"
                                              }}
                                            >
                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  await myRadioSellSplash1();
                                                  setTripType1("1");
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType1}
                                                  name="tripType1"
                                                  checked={tripType1 === "1"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">1%</div>
                                              </div>

                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  await myRadioSellSplash3();
                                                  setTripType1("3");
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType1}
                                                  name="tripType"
                                                  checked={tripType1 === "3"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">3%</div>
                                              </div>

                                              <div
                                                className="radio-btn"
                                                onClick={async () => {
                                                  await myRadioSellSplash5();
                                                  setTripType1("5");
                                                }}
                                              >
                                                <input
                                                  type="radio"
                                                  value={tripType1}
                                                  name="tripType"
                                                  checked={tripType1 === "5"}
                                                  style={{display: "none"}}
                                                />
                                                <div className="slipnewbtn">5%</div>
                                              </div>
                                            </div>
                                            <label
                                            style={{fontSize: "14px",color: "#a9a7a7"}}
                                            htmlFor="dropdown-sell-slippage-config"
                                            className="d-block"
                                            id="__BVID__101__BV_label_"
                                          >
                                            Custom slippage


                                          </label>
                                            <div
                                              role="group"
                                              className="input-group"
                                            >

                                              <input
                                                // id="dropdown-sell-slippage-config"
                                                type="number"
                                                ref={mYEnter1}
                                                // value={tripType1}
                                                max={50}
                                                className="form-control form21"
                                                onChange={async () =>
                                                  await myOnchangeInputSellSplash()
                                                }

                                              />
                                              <div className="input-group-append form22">
                                                <button
                                                  type="button"
                                                  className="form23"
                                                >
                                                  %
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </Typography>
                                </Popover>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 text-left fst-italic">
                              <small className="form-text">
                                <p style={{ lineHeight: "120%" }}>
                                  {t("Estimatereceived.1")}:{tenPerVal}
                                </p>
                              </small>


                            </div>

                          </div>
                        </div>
                      </form>
                      <div className="row justify-content-end">
                        <div className="col-12 text-left">
                          <button
                            onClick={() => bnbSwapSell()}
                            type="button"
                            className="btn btn-outline-lightx"
                          >
                            {t("Sell.1")}
                          </button>
                          <div
                            className="allowanceSelect"
                            style={{ float: "right", marginTop:"16px" }}
                          >
                            <div className="custom-control custom-switch b-custom-control-lg">
                              {/* <button
                          onClick={() => myApproval()}
                          type="button" className="btn btn-outline-light">
                          {t("Approve.1")}
                        </button> */}
                              <input
                                type="checkbox"
                                name="check-button"
                                className="custom-control-input"
                                // value={isToogle}
                                id="__BVID__107"
                                checked={isToogle}
                                onChange={getToogle}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="__BVID__107"
                              >
                                {" "}
                                <p>{t("ApproveSolisium.1")}</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p />
                  </div>
    </TabPanel>
    <TabPanel>
        <p style={{fontWeight: "normal", fontSize: "12px", padding: "20px"}}>Swap is the only exchange that offers the possibility to buy SOLS without the 10% tax. You can buy SOLS with MATIC in the Buy section of this page. Simply input the amount of MATIC you want to invest and you will get the received amount in SOLS. <br/>Similar to the Buy section, the Sell section lets you sell your SOLS for MATIC with a 10% tax that will go back into the rewards pool.</p>
    </TabPanel>
  </Tabs>

                </div>
              </div>


            </div>


          </div>
        </div>
        <div>
          <div>
            <div className="header">
              <div>
                <svg
                  data-v-ab5e3c86
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 150 28"
                  preserveAspectRatio="none"
                  shapeRendering="auto"
                  className="waves"
                >
                  <defs data-v-ab5e3c86>
                    <path
                      data-v-ab5e3c86
                      id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                  </defs>
                  <g data-v-ab5e3c86 className="parallax">
                    <use
                      data-v-ab5e3c86
                      xlinkHref="#gentle-wave"
                      x={48}
                      y={0}
                      fill="rgba(255,255,255,0.7"
                    />
                    <use
                      data-v-ab5e3c86
                      xlinkHref="#gentle-wave"
                      x={48}
                      y={3}
                      fill="rgba(255,255,255,0.5)"
                    />
                    <use
                      data-v-ab5e3c86
                      xlinkHref="#gentle-wave"
                      x={48}
                      y={5}
                      fill="rgba(255,255,255,0.3)"
                    />
                    <use
                      data-v-ab5e3c86
                      xlinkHref="#gentle-wave"
                      x={48}
                      y={7}
                      fill="#fff"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
