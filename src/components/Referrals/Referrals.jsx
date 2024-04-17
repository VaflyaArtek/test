import React, { useEffect, useState } from 'react';
import './Referrals.css';
import { getReferralList } from "../../hooks/api";
import { useTelegram } from "../../hooks/useTelegram";

const Referrals = ({ setError }) => {
    const { tg } = useTelegram();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tgId = tg?.initDataUnsafe?.user?.id || 544362566;
                const referralList = await getReferralList({ tgId });
                setUserList(referralList.data);
            } catch (error) {
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [tg, setError]);

    const copyReferralLinkToClipboard = (referralLink) => {
        return navigator.clipboard.writeText(referralLink)
    };

    return (
        <div className={'referral'}>
            <div className={'referral-list__container'}>
                <h3 className={'referral-list__title'}>List of your friends</h3>
                <div className={'referral-list'}>
                    {userList.length > 0 ? (
                        userList.map(user => (
                            <div key={user.id} className={'referral-list__item'}>
                                <ul>
                                    <li>{user.username ? user.username : user.id}</li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div className={'referral-list__item'}>
                            You haven't invited anyone yet
                        </div>
                    )}
                </div>
            </div>
            <div className={'referral-info'}>
                <p className={'referral-info__p'}>
                    Invite a friend and get <span>+25,000</span>
                    <img className={'referral-img'} src={'./media/coins-solid.svg'} alt={'coin'}/>
                </p>
                <p className={'referral-adress'}>
                    Click <span onClick={() => copyReferralLinkToClipboard(userList[0]?.referralLink)}>here</span> to copy your referral address
                </p>
            </div>
        </div>
    );
};

export default Referrals;
