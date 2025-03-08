const { Client, Hbar, TransferTransaction, AccountBalanceQuery } = require("@hashgraph/sdk");
const Transaction = require("../models/Transaction");

// Initialize Hedera client
const client = Client.forTestnet();
client.setOperator(
  process.env.OPERATOR_ID, // Your Hedera account ID (0.0.5639479)
  process.env.OPERATOR_PRIVATE_KEY // Your DER-encoded private key
);

exports.createTransaction = async (req, res) => {
    let newTransaction;
    try {
        const { productId, buyerId, amount } = req.body;

        // Validate required fields
        if (!productId || !buyerId || !amount) {
            throw new Error('Missing required fields: productId, buyerId, amount');
        }

        // Define sender and receiver account IDs
        const senderAccountId = '0.0.5639479'; // Replace with the buyer's account ID
        const receiverAccountId = '0.0.5620886'; // Replace with the seller's account ID

        // Ensure amount is a whole number (integer)
        const amountInTinybars = Math.round(amount * 100000000); // Convert HBAR to tinybars

        // Check sender's balance
        const senderBalance = await new AccountBalanceQuery()
            .setAccountId(senderAccountId)
            .execute(client);

        console.log(`Sender balance: ${senderBalance.hbars.toString()}`);

        if (senderBalance.hbars.toTinybars() < amountInTinybars) {
            throw new Error('Insufficient balance in sender account');
        }

        // Save the transaction to the database with status 'pending'
        newTransaction = new Transaction({
            productId,
            buyerId,
            status: 'pending',
        });
        await newTransaction.save();

        // Create and execute the transaction
        const transaction = new TransferTransaction()
            .addHbarTransfer(senderAccountId, Hbar.fromTinybars(-amountInTinybars)) // Negative for sender
            .addHbarTransfer(receiverAccountId, Hbar.fromTinybars(amountInTinybars)) // Positive for receiver
            .freezeWith(client); // Freeze the transaction for signing

        const transactionResponse = await transaction.execute(client);
        console.log('Transaction ID:', transactionResponse.transactionId.toString());

        // Update the transaction status to 'completed'
        newTransaction.status = 'completed';
        await newTransaction.save();

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);

        // If the Hedera transaction fails, update the status to 'failed'
        if (newTransaction) {
            newTransaction.status = 'failed';
            await newTransaction.save();
        }

        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
};