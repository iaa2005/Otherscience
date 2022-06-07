const Web3Modal = window.Web3Modal.default;
const Web3 = window.Web3;
const WalletConnectProvider = window.WalletConnectProvider;
const evmChains = window.evmChains;

let web3Modal;
let provider;
let selectedAccount;

const MATIC_PROVIDER = "https://polygon-rpc.com";
// https://polygon-rpc.com

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
                infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
                qrcodeModalOptions: {
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar"
                    ]
                }
            }
        }
    };

    web3Modal = new Web3Modal({
        theme: "dark",
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

async function refreshAccountData() {
    await fetchAccountData(provider);
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

function updateScroll() {
    $("#scroll-wrapper-inner").css("opacity", (1 - Math.sqrt(window.scrollY / window.screen.height) * 1.5).toString() );
}

function logoHeaderAnimAndBlock() {
    if (window.scrollY / window.screen.height <= 0.75 && window.scrollY / window.screen.height >= 0) {
        $(".logo-header").css("height", ((1 - window.scrollY / window.screen.height / 0.75) * 100 + 50).toString() + "px")
        $(".logo-header-block").css("top", "calc((50vh - 75px)*" + (1 - window.scrollY / window.screen.height / 0.75) + " + 15px)").css("margin-left", "calc(50% - 97.5*" + ((1 - window.scrollY / window.screen.height / 0.75) * 2 + 1) + "px)")
    } else if (window.scrollY / window.screen.height >= 0.75) {
        $(".logo-header").css("height", "50px")
        $(".logo-header-block").css("top", "15px").css("margin-left", "calc(50% - 97.5px)")
    }

    if (window.scrollY / ($("#block-main").height() - $("#block-main-up").height()) >= 1) {
        $(".block-main-up").css("position", "relative")
    } else {
        $(".block-main-up").css("position", "fixed")
    }

    if (window.scrollY / window.screen.height >= 0.75) {
        $(".logo-header-block a").css("pointer-events", "auto")
    } else {
        $(".logo-header-block a").css("pointer-events", "none")
    }

    $(".light-speed-img").css("opacity", 1 - window.scrollY / window.screen.height * 2)
    $(".block-main-up").css("opacity", window.scrollY / window.screen.height * 2 - 1.1);
    $(".pre-main-block-text-after").css("opacity", (1 - window.scrollY / window.screen.height * 30))
}


$(document).ready(async function() {

    logoHeaderAnimAndBlock();

    window.addEventListener('scroll', function () {

        logoHeaderAnimAndBlock();

        if (window.scrollY / window.screen.height >= 1.5) {
            $("#preambula-tag-1").addClass("anim-on");
            $(".title-block-1").addClass("anim-on");
            $(".block-text-1").addClass("anim-on");
        }
        if (window.scrollY / window.screen.height >= 2.5) {
            $(".block-2").addClass("anim-on");

            $("#preambula-tag-2").addClass("anim-on");
            $(".title-block-2").addClass("anim-on");
            $(".block-text-2").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 3.8) {
            $(".block-3").addClass("anim-on");

            $("#preambula-tag-3").addClass("anim-on");
            $(".title-block-3").addClass("anim-on");
            $(".block-text-3").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 4.9) {
            $(".block-4").addClass("anim-on");

            $(".block-4-cards").addClass("anim-on");
            $("#preambula-tag-4").addClass("anim-on");
            $(".title-block-4").addClass("anim-on");
            $(".block-text-4").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 6.0) {
            $(".block-5").addClass("anim-on");

            $("#preambula-tag-5").addClass("anim-on");
            $(".title-block-5").addClass("anim-on");
            $(".block-text-5").addClass("anim-on");
            $(".block-5-sign-up").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 7.2) {
            $(".block-6").addClass("anim-on");

            $(".block-6-coin").addClass("anim-on");
            $("#preambula-tag-6").addClass("anim-on");
            $(".title-block-6").addClass("anim-on");
            $(".block-text-6").addClass("anim-on");
            $(".block-6-about").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 8.3) {
            $(".block-7").addClass("anim-on");

            $("#preambula-tag-7").addClass("anim-on");
            $(".title-block-7").addClass("anim-on");
            $(".block-text-7").addClass("anim-on");
            $(".block-7-table").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 10.6) {
            $(".block-go-to").addClass("anim-on");
            $(".block-go-text").addClass("anim-on");
            $(".block-go-button").addClass("anim-on");
        }

        console.log(window.scrollY / window.screen.height)
    })

    setTimeout( function () {
        window.addEventListener('scroll', updateScroll)
    }, 4000)

    let buttonConnect = document.getElementById("ConnectWalletButton")
    buttonConnect.addEventListener("click", onConnect)
    // let walletButton = document.getElementById("initialized-wallet")
    // walletButton.addEventListener("click", onOpenWallet)

    init();
});