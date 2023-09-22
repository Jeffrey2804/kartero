import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../Components/Navbar'
import TabPanel from './Tabpanel';

import { SmsProxy } from './Services/SmsProxy.service';
import { PaymentProxy } from './Services/PaymentProxy.service';
import { SmtpProxy } from './Services/SmtpProxy.service';
function TestService(props) {

    const [CurSmsList, setSmsList] = useState();
    const [CurPaymentList, setPaymentList] = useState();
    const [CurSmtpList, setSmtpList] = useState();
    const [StatusList, setStatusList] = useState();
    const [SmtpStatusList, setSmtpStatusList] = useState();
    const viewSms = () => {

        console.log("View Sms");
        SmsProxy
            .getSmsList()
            .then((response) => {
                console.log(response);
                setSmsList(response);
            })
            .catch((error) => {


            });

    }

    const viewPayment = () => {

        console.log("View Payment");
        PaymentProxy
            .getPaymentList()
            .then((response) => {
                console.log(response);
                setPaymentList(response);
            })
            .catch((error) => {


            });

    }
    const viewSmtp = () => {

        console.log("View Smtp");
        SmtpProxy
            .getSmtpList()
            .then((response) => {
                console.log(response);
                setSmtpList(response);
            })
            .catch((error) => {


            });

    }


    const getStatusList = () => {

        console.log("View Status List");
        SmsProxy
            .getStatusList()
            .then((response) => {
                console.log(response);
                setStatusList(response);
            })
            .catch((error) => {


            });

    }

    const getSmtpStatusList = () => {

        console.log("View Status List");
        SmtpProxy
            .getStatusList()
            .then((response) => {
                console.log(response);
                setSmtpStatusList(response);
            })
            .catch((error) => {


            });

    }


    useEffect(() => {
        viewSms();
        viewPayment();
        viewSmtp();
        getStatusList();
        getSmtpStatusList();
    }, []);

    
    return (
        <div className='testService'>
            <Navbar />
            {CurSmtpList !== undefined || CurSmtpList !== null ?
                <TabPanel
                    smsList={CurSmsList}
                    paymentList={CurPaymentList}
                    smtpList={CurSmtpList}
                    statusList={StatusList}
                    smtpStatusList={SmtpStatusList}
                />
                : null}
        </div>
    )
}

export default TestService