import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL, FRONTEND_DOMAIN } from '../../constants';

const WalletConnectDialog = ({ user, setDialogOpen }) => {
    const handleCheck = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/airdrop/connect-wallet`, {
            });
            const { data } = response;
            if (data?.status == "success") {
                toast.success('Wallet successfully connected!')
            } else {
                toast.error(data?.message)
            }
        }
        catch (e) {
            console.log('apop@connectWallet', e.message);
        }
        finally {
            setDialogOpen(false);
        }
        return false;
    }

    return (
        <div className="bottom-sheet-scroll flex flex-col gap-4 text-center">
            <div className="flex w-full text-center justify-center">
                <img
                    src="/images/account/solana-wallet.png"
                    alt="solana wallet logo"
                    width={128}
                />
            </div>
            <div className="text-2xl">Connect your Solana wallet</div>
            <Link className="button button-default button-primary flex gap-2" to={`https://phantom.app/ul/browse/https%3A%2F%2F${FRONTEND_DOMAIN}%2Fwallet-connect%2F${user?.tg_id}?ref=https%3A%2F%2F${FRONTEND_DOMAIN}`} target='_blank'>
                <div className="icon">
                    <img src="/images/account/solana-wallet.png" alt='solana wallet logo' width={40} />
                </div>
                <span>Connect Wallet</span>
            </Link>
            <button
                className="button button-primary button-default"
                onClick={handleCheck}
            >
                <span>Check</span>
            </button>
        </div>
    )
}

export default WalletConnectDialog;