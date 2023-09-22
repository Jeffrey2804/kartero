import React from 'react';
import Login from './login/Login';
import { Route, Routes } from "react-router-dom";
import Home from "./home/HomePage";
import MainBillMenu from "./Bill/MainBillMenu";
import Report from './Report/Report';
import Subscription from './Subscription/Subscription';
import SessionTimeout from './Helper/SessionTimeout';
import LandingPage from './PaymentPage/LandingPage';
import PaymentPage from './PaymentPage/DummyPaymentPage_v2'
import SuccessPaymentPage from './PaymentPage/SuccessPayment';
import FailedPayment from './PaymentPage/FailedPayment';
import OTPPayment from './PaymentPage/OTPPayment';
import Account from './Admin/pages/Account/Account';
import Dashboard from './Admin/pages/Dashboard/Dashboard';
import DummyPaymentPage from './PaymentPage/DummyPaymentPage';
import Onboarding from './Admin/pages/Onboarding/Onboarding';
import MappingMainMenu from './Admin/pages/OnboardMap/MappingMainMenu';
import ExpiredLink from './PaymentPage/ExpireLinkPage';
import AdminPage from './Admin/AdminPage';
import CreateUser from './Admin/pages/Account/Components/CreateUser'
import SomethingWentWrong from './ErrorPage/SomethingWentWrong';
import PatternManagementPage from './Admin/pages/PatternManagement/PatternManagementPage';
import TemplateManagement from './TemplateManagementComponents/TemplateManagement';
import TestService from './TestServices/TestService';
import Send from './Bill/Send/Send';
import SubscriptionManagementPage from './Admin/pages/SubscriptionManagement/SubscriptionManagementPage';
import GlobalVariable from './Admin/pages/GlobalVariableManagement/GlobalVariable';

function App() {


  return (
    <div>
      <Routes>

        <Route exact path={process.env.REACT_APP_PATH + "/"} element={<Login />} />
        <Route exact path={process.env.REACT_APP_PATH + "/login"} element={<Login />} />
        <Route exact path={process.env.REACT_APP_PATH + "/home"} element={<Home />} />
        <Route exact path={process.env.REACT_APP_PATH + "/bill"} element={<MainBillMenu />} />
        <Route exact path={process.env.REACT_APP_PATH + "/report"} element={<Report />} />
        <Route exact path={process.env.REACT_APP_PATH + "/subscription"} element={<Subscription />} />
        {/* <Route exact path={process.env.REACT_APP_PATH + "/landingPage"} element={<LandingPage />} /> */}
        {/* <Route exact path={process.env.REACT_APP_PATH + "/paymentPage/:requestId"} element={<PaymentPage />} /> */}
        <Route exact path={process.env.REACT_APP_PATH + "/successPaymentPage"} element={<SuccessPaymentPage />} />
        <Route exact path={process.env.REACT_APP_PATH + "/failedPaymentPage"} element={<FailedPayment />} />
        <Route exact path={process.env.REACT_APP_PATH + "/expiredLink"} element={<ExpiredLink />} />
        <Route exact path={process.env.REACT_APP_PATH + "/otpPayment"} element={<OTPPayment />} />
        {/* <Route exact path={process.env.REACT_APP_PATH + "/admin"} element={<AdminPage />} /> */}
        <Route exact path={process.env.REACT_APP_PATH + "/landingPage"} element={<PaymentPage />} />
        <Route exact path={process.env.REACT_APP_PATH + "/dashboard"} element={<Dashboard />} />
        <Route exact path={process.env.REACT_APP_PATH + "/test"} element={<TemplateManagement />} />
        <Route exact path={process.env.REACT_APP_PATH + "/accountsManagement"} element={<Onboarding />} />
        <Route exact path={process.env.REACT_APP_PATH + "/patternManagement"} element={<PatternManagementPage />} />
        <Route exact path={process.env.REACT_APP_PATH + "/onboardMap"} element={<MappingMainMenu />} />
        <Route exact path={process.env.REACT_APP_PATH + "/testService"} element={<TestService />} />
        <Route exact path={process.env.REACT_APP_PATH + "/subscription"} element={<Send />} />
        <Route exact path={process.env.REACT_APP_PATH + "/subscriptionManagement"} element={<SubscriptionManagementPage />} />
        <Route exact path={process.env.REACT_APP_PATH + "/globalVariable"} element={<GlobalVariable />} />
        {/* <Route exact path="*" element={<SomethingWentWrong />} /> */}
      </Routes>
      <SessionTimeout />
    </div >

  );
}

export default App;
