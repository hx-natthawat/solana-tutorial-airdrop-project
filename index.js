const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// Connect the wallet with keypair
const wallet = new Keypair();

// Retrieve wallet credential
const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;
console.log(publicKey);
console.log(secretKey);

// Get wallet balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Wallet balance is: ${walletBalance}`);
    return walletBalance;
  } catch (error) {
    console.log(error);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
