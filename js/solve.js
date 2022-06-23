const Web3Modal = window.Web3Modal.default;
const Web3 = window.Web3;
const WalletConnectProvider = window.WalletConnectProvider;
const CoinbaseWalletProvider = window.CoinbaseWalletProvider;
const evmChains = window.evmChains;

let web3Modal;
let provider;
let selectedAccount;

const MATIC_PROVIDER = "https://polygon-rpc.com";
// https://polygon-rpc.com

let loadingTask = true;

function init() {
    // Check that the web page is run in a secure context,
    // as otherwise MetaMask won't be available
    // if(location.protocol !== 'https:') {
    //
    //     return;
    // }

    // let menuaddr = document.getElementById("menu-address");
    // menuaddr.classList.add("remove");

    const providerOptions = {
        metamask: {
            id: "injected",
            name: "MetaMask",
            type: "injected",
            check: "isMetaMask",
        },
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                qrcodeModalOptions: {
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar"
                    ]
                },
                // rpc: {
                //     137: "https://polygon-rpc.com",
                // },
            }
        },
        coinbasewallet: {
            package: CoinbaseWalletProvider,
            options: {
                appName: "Otherscience",
            }
        }
    };

    web3Modal = new Web3Modal({
        theme: "light",
        network: "maticMumbai",
        cacheProvider: true,
        providerOptions
    });
}

async function fetchAccountData() {
    // const web3 = new Web3(provider);
    // new Web3.providers.HttpProvider("https://polygon-mainnet.infura.io/v3/0811f9ee41e9494db21e5fa7225613dd")
    // provider = new Web3.providers.HttpProvider("https://polygon-mainnet.infura.io/v3/0811f9ee41e9494db21e5fa7225613dd")

    if (provider.chainId === "0x89") {
        const web3 = new Web3(provider)
        // console.log(provider)

        let accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];

        // console.log(selectedAccount)

        let address_text = "CONNECTED ..." + selectedAccount.substr(37, 4).toUpperCase();
        let addressText = document.getElementById("address-header-text");
        addressText.textContent = address_text;

        // let text_balance = await web3.eth.getBalance(selectedAccount);
        // let ethBalance = web3.utils.fromWei(text_balance, "ether");
        // let humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
        // let balance_header = document.getElementById("balance-header")
        // balance_header.innerText = humanFriendlyBalance + " MATIC";

        // console.log(selectedAccount);
        $(".connect-wallet").addClass("connected-wallet");
    } else {
        // document.getElementById("connect-wallet-text").style.display = "none";
        // document.getElementById("warn-network").style.display = "flex";
        let addressText = document.getElementById("address-header-text");
        addressText.textContent = "CHOOSE POLYGON NETWORK";
    }
}
// ../js/MathJax.js
function loadMathJax() {
    $("#mathjax_1").remove();
    $('<script>').attr("src", "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML").attr("type", "text/javascript").attr("id", "mathjax_1").appendTo('head');
    $("#mathjax_2").remove();
    $('<script>').attr("type", "text/x-mathjax-config").attr("id", "mathjax_2").append(
        `MathJax.Hub.Config({
            tex2jax: {
              inlineMath: [ ['$','$'], ["\\\\(","\\\\)"] ],
              processEscapes: true
            }
        });`
    ).appendTo('head');
}

function checkTasks() {
    $.get(`../samples/task1.md`, function (data) {
        let converter = new showdown.Converter({metadata: true, literalMidWordUnderscores: true});
        let html_code = converter.makeHtml(data);
        let metadata = converter.getMetadata(false);

        console.log(html_code);
        console.log(metadata);
        $(".block-task-in").append(html_code);
    });
}

async function refreshAccountData() {
    await fetchAccountData(provider);
}

function checkPublicOn() {
    return true;
}

async function onConnect() {
    try {
        provider = await web3Modal.connect();
    } catch(e) {
        console.log("Could not get a wallet connection", e);

        let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('CriOS') == -1 &&
            navigator.userAgent.indexOf('FxiOS') == -1;

        if (isSafari) {
            location.href = "https://tokenary.io"
        } else {
            location.href = "https://metamask.io"
        }
    }

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
    });

    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });

    if (checkPublicOn() === true && loadingTask === true && provider.chainId === "0x89") {
        $(".not-active-public-div").css("display", "none");
        $(".main-block").css("display", "grid").addClass("anim-on");
        setTimeout(function () {
            $(".fixed-blur-bg").css("backdrop-filter", "blur(10px)").css("-webkit-backdrop-filter", "blur(10px)");
        }, 800);
        $(".connect-wallet-div").addClass("anim-off");

        checkTasks();

        loadMathJax();

        loadingTask = false;
    }

    await refreshAccountData();
}

async function onDisconnect() {

    console.log("Killing the wallet connection", provider);
    // TODO: Which providers have close method?
    if(provider.close) {
        await provider.close();
        await web3Modal.clearCachedProvider();
        provider = null;
    }

    $(".connect-wallet").removeClass("connected-wallet");

    // let menuaddr = document.getElementById("initialized-wallet");
    // menuaddr.style.display = "none";
    //
    // let buttonConnect = document.getElementById("button-wallet-connect");
    // buttonConnect.style.display = "inline-flex";

    selectedAccount = null;
}

function openMenu() {
    $(".menu-open-button").css("display", "none");
    $(".menu-close-button").css("display", "block");
    $(".mobile-menu").addClass("menu-open");
    // $(".logo-header-block-mobile").addClass("down");
    $("body").addClass("body-clip");
}

function closeMenu() {
    $(".menu-close-button").css("display", "none");
    $(".menu-open-button").css("display", "block");
    $(".mobile-menu").removeClass("menu-open");
    // $(".logo-header-block-mobile").removeClass("down");
    $("body").removeClass("body-clip");

}

$(document).ready(async function() {
    let buttonConnect = document.getElementById("ConnectWalletButton")
    buttonConnect.addEventListener("click", onConnect)
    let buttonConnect_2 = document.getElementById("ConnectWalletButton_2")
    buttonConnect_2.addEventListener("click", onConnect)
    // let walletButton = document.getElementById("initialized-wallet")
    // walletButton.addEventListener("click", onOpenWallet)

    init();

    let buttonMenuOpen = document.getElementById("menu-open-button");
    buttonMenuOpen.addEventListener("click", openMenu)

    let buttonMenuClose = document.getElementById("menu-close-button");
    buttonMenuClose.addEventListener("click", closeMenu)

    setTimeout( function () {
        $(".header").css("top", "0").css("animation", "--");
    }, 4000)

    setTimeout( function () {
        if (checkPublicOn() === false) {
            $(".loader1-main").addClass("remove");
            $(".not-active-public").css("display", "block").addClass("anim-on");
        } else {
            $(".loader1-main").addClass("remove");
            $(".connect-wallet-div").css("display", "grid").addClass("anim-on");
        }
    }, 1000);

});